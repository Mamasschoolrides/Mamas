from fastapi import FastAPI, APIRouter, HTTPException, Header, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
import uuid
import ipaddress
import jwt
import httpx
import stripe
import asyncio
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_SECRET = os.environ["JWT_SECRET"]
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]
JWT_ALGORITHM = "HS256"

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Mama's School Rides")
OWNER_NOTIFY_EMAIL = os.environ.get("OWNER_NOTIFY_EMAIL")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    _assert_safe_email(subject, html)
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY not set; skipping email")
        return None
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if OWNER_NOTIFY_EMAIL:
        payload["contact_email"] = OWNER_NOTIFY_EMAIL
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def _rows_html(rows: List[tuple]) -> str:
    cells = "".join(
        f'<tr><td style="padding:6px 16px 6px 0;font-size:12px;color:#8a7f76;text-transform:uppercase;'
        f'letter-spacing:0.08em;vertical-align:top">{escape(k)}</td>'
        f'<td style="padding:6px 0;font-size:14px;color:#2B2523">{escape(str(v))}</td></tr>'
        for k, v in rows if v
    )
    return f'<table role="presentation" style="border-collapse:collapse">{cells}</table>'


async def notify_owner(subject: str, rows: List[tuple]) -> None:
    if not OWNER_NOTIFY_EMAIL:
        return
    try:
        html = (
            '<table role="presentation" width="100%" style="background:#FDFBF7;padding:24px 0"><tr><td align="center">'
            '<table role="presentation" width="560" style="background:#ffffff;border:1px solid #E6D7CE;'
            'border-radius:16px;padding:28px;font-family:Arial,sans-serif">'
            f'<tr><td><p style="margin:0 0 4px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#E87A5D">'
            f'{escape(EMAIL_FROM_NAME)}</p>'
            f'<h1 style="margin:0 0 16px;font-size:20px;color:#2B2523">{escape(subject)}</h1>'
            f'{_rows_html(rows)}'
            '<p style="margin:20px 0 0;font-size:13px;color:#8a7f76">Sign in to your owner dashboard to review this submission.</p>'
            f'<p style="margin:12px 0 0;font-size:11px;color:#b6aaa0">Sent by {escape(EMAIL_FROM_NAME)} — automated submission notification.</p>'
            '</td></tr></table></td></tr></table>'
        )
        await send_email(to=OWNER_NOTIFY_EMAIL, subject=f"{EMAIL_FROM_NAME}: {subject}", html=html)
    except Exception as e:
        logger.error(f"Owner notification email failed: {e}")


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def reference_code():
    return f"MSR-{uuid.uuid4().hex[:6].upper()}"


def require_admin(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        jwt.decode(authorization[7:], JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired session")


class InquiryCreate(BaseModel):
    parent_name: str
    phone: str
    email: EmailStr
    child_name: str
    grade: str
    school: str
    home_address: str
    morning: bool = False
    afternoon: bool = False
    start_date: Optional[str] = ""
    days: List[str] = []
    additional_info: Optional[str] = ""


class RegistrationCreate(BaseModel):
    parent_name: str
    parent_phone: str
    parent_email: EmailStr
    home_address: str
    child_legal_name: str
    child_preferred_name: Optional[str] = ""
    child_dob: str
    child_school: str
    child_grade: str
    ec1_name: str
    ec1_relationship: str
    ec1_phone: str
    ec2_name: str
    ec2_relationship: str
    ec2_phone: str
    authorized_adults: Optional[str] = ""
    days: List[str] = []
    morning: bool = False
    afternoon: bool = False
    start_date: Optional[str] = ""
    safety_info: Optional[str] = ""
    absence_acknowledged: bool
    agree_transportation: bool
    agree_payment: bool
    agree_accuracy: bool


class WaitlistCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    note: Optional[str] = ""


class AdminLogin(BaseModel):
    password: str


class RouteStatusUpdate(BaseModel):
    routes_full: bool


class StatusUpdate(BaseModel):
    status: str


ALLOWED_STATUSES = ["new", "reviewing", "approved", "waitlisted", "registered"]

STATUS_LABELS = {
    "new": "Received — your request is in the queue for review.",
    "reviewing": "Being reviewed — I'm looking at your route right now.",
    "approved": "Approved! Check your phone and email for your private registration link.",
    "waitlisted": "This route is currently full — you're on the waitlist and I'll reach out when a seat opens.",
    "registered": "Registered — welcome aboard! We'll confirm your start date directly.",
}


@api_router.get("/")
async def root():
    return {"message": "Mama's School Rides API"}


@api_router.post("/inquiries")
async def create_inquiry(input: InquiryCreate):
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["reference"] = reference_code()
    doc["status"] = "new"
    doc["created_at"] = now_iso()
    await db.inquiries.insert_one(doc)
    await notify_owner(f"New route inquiry ({doc['reference']})", [
        ("Parent", doc["parent_name"]), ("Phone", doc["phone"]), ("Email", doc["email"]),
        ("Child", doc["child_name"]), ("Grade", doc["grade"]), ("School", doc["school"]),
        ("Address", doc["home_address"]),
        ("Times", ", ".join([t for t, on in [("Mornings", doc["morning"]), ("Afternoons", doc["afternoon"])] if on])),
        ("Days", ", ".join(doc["days"])), ("Start date", doc["start_date"]),
        ("Notes", doc["additional_info"]),
    ])
    return {"ok": True, "reference": doc["reference"]}


@api_router.post("/registrations")
async def create_registration(input: RegistrationCreate):
    if not (input.agree_transportation and input.agree_payment and input.agree_accuracy):
        raise HTTPException(status_code=422, detail="All agreements must be accepted.")
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["reference"] = reference_code()
    doc["status"] = "submitted"
    doc["created_at"] = now_iso()
    await db.registrations.insert_one(doc)
    await notify_owner(f"New registration ({doc['reference']})", [
        ("Parent", doc["parent_name"]), ("Phone", doc["parent_phone"]), ("Email", doc["parent_email"]),
        ("Child", doc["child_legal_name"]), ("School", doc["child_school"]), ("Grade", doc["child_grade"]),
        ("Address", doc["home_address"]), ("Days", ", ".join(doc["days"])),
        ("Start date", doc["start_date"]),
    ])
    return {"ok": True, "reference": doc["reference"]}


@api_router.post("/waitlist")
async def join_waitlist(input: WaitlistCreate):
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = now_iso()
    await db.waitlist.insert_one(doc)
    await notify_owner("New waitlist signup", [
        ("Name", doc["name"]), ("Email", doc["email"]), ("Phone", doc["phone"]), ("Note", doc["note"]),
    ])
    return {"ok": True}


@api_router.get("/status/{reference}")
async def lookup_status(reference: str):
    ref = reference.strip().upper()
    doc = await db.inquiries.find_one({"reference": ref}, {"_id": 0, "status": 1, "created_at": 1, "reference": 1})
    kind = "inquiry"
    if not doc:
        doc = await db.registrations.find_one({"reference": ref}, {"_id": 0, "status": 1, "created_at": 1, "reference": 1})
        kind = "registration"
    if not doc:
        raise HTTPException(status_code=404, detail="No submission found with that reference code.")
    status = doc.get("status", "new")
    return {
        "reference": doc["reference"],
        "type": kind,
        "status": status,
        "message": STATUS_LABELS.get(status, "Received and being processed."),
        "created_at": doc["created_at"],
    }


@api_router.get("/route-status")
async def get_route_status():
    doc = await db.settings.find_one({"key": "route_status"}, {"_id": 0})
    return {"routes_full": bool(doc and doc.get("routes_full"))}


@api_router.post("/admin/login")
async def admin_login(input: AdminLogin):
    if input.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Incorrect password")
    token = jwt.encode(
        {"role": "admin", "exp": datetime.now(timezone.utc) + timedelta(hours=12)},
        JWT_SECRET, algorithm=JWT_ALGORITHM,
    )
    return {"token": token}


@api_router.get("/admin/inquiries")
async def list_inquiries(authorization: str = Header(None)):
    require_admin(authorization)
    return await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.get("/admin/registrations")
async def list_registrations(authorization: str = Header(None)):
    require_admin(authorization)
    return await db.registrations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.get("/admin/waitlist")
async def list_waitlist(authorization: str = Header(None)):
    require_admin(authorization)
    return await db.waitlist.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.post("/admin/inquiries/{inquiry_id}/status")
async def set_inquiry_status(inquiry_id: str, update: StatusUpdate, authorization: str = Header(None)):
    require_admin(authorization)
    if update.status not in ALLOWED_STATUSES:
        raise HTTPException(status_code=422, detail="Invalid status")
    result = await db.inquiries.update_one({"id": inquiry_id}, {"$set": {"status": update.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"ok": True, "status": update.status}


@api_router.post("/admin/route-status")
async def set_route_status(update: RouteStatusUpdate, authorization: str = Header(None)):
    require_admin(authorization)
    await db.settings.update_one(
        {"key": "route_status"},
        {"$set": {"key": "route_status", "routes_full": update.routes_full}},
        upsert=True,
    )
    return {"ok": True, "routes_full": update.routes_full}


stripe.api_key = os.environ.get("STRIPE_SECRET_KEY") or "sk_test_emergent"
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")

PLAN_LABELS = {
    "roundtrip_monthly": "Round Trip — 1 child",
    "oneway_monthly": "One-Way — 1 child",
    "siblings2_monthly": "Round Trip — 2 children",
    "siblings3_monthly": "Round Trip — 3 children",
}


class CheckoutRequest(BaseModel):
    lookup_key: str
    origin_url: str
    registration_ref: Optional[str] = None


@api_router.post("/payments/checkout")
async def create_checkout(req: CheckoutRequest):
    if req.lookup_key not in PLAN_LABELS:
        raise HTTPException(status_code=422, detail="Unknown plan")
    prices = stripe.Price.list(lookup_keys=[req.lookup_key], active=True, limit=1).data
    if not prices:
        raise HTTPException(status_code=500, detail=f"Price not found: {req.lookup_key}")
    price = prices[0]
    session = stripe.checkout.Session.create(
        line_items=[{"price": price.id, "quantity": 1}],
        mode="subscription" if price.recurring else "payment",
        success_url=f"{req.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{req.origin_url}/payment/cancel",
        automatic_tax={"enabled": True},
        billing_address_collection="required",
        metadata={"registration_ref": req.registration_ref or "", "lookup_key": req.lookup_key},
    )
    await db.payment_transactions.insert_one({
        "session_id": session.id,
        "registration_ref": req.registration_ref or "",
        "lookup_key": req.lookup_key,
        "amount": float(price.unit_amount or 0) / 100,
        "currency": price.currency,
        "status": "initiated",
        "payment_status": "pending",
        "created_at": now_iso(),
        "updated_at": now_iso(),
    })
    return {"checkout_url": session.url, "session_id": session.id}


async def _mark_paid(session_id: str, metadata: dict):
    result = await db.payment_transactions.update_one(
        {"session_id": session_id, "payment_status": {"$ne": "paid"}},
        {"$set": {"status": "completed", "payment_status": "paid", "updated_at": now_iso()}},
    )
    if result.modified_count:
        ref = (metadata or {}).get("registration_ref", "")
        plan = (metadata or {}).get("lookup_key", "")
        if ref:
            await db.registrations.update_one({"reference": ref}, {"$set": {"payment_status": "paid"}})
        txn = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
        await notify_owner(f"Payment received — ${txn['amount']:.0f} {txn['currency'].upper()}", [
            ("Plan", PLAN_LABELS.get(plan, plan)),
            ("Registration", ref or "—"),
            ("Session", session_id),
        ])


@api_router.get("/payments/status/{session_id}")
async def get_payment_status(session_id: str):
    record = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="Transaction not found")
    if record.get("payment_status") != "paid":
        try:
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await _mark_paid(session_id, s.metadata)
                record = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
        except stripe.error.StripeError:
            pass
    return {
        "session_id": record["session_id"],
        "status": record["status"],
        "payment_status": record["payment_status"],
    }


@api_router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    obj, t = event["data"]["object"], event["type"]
    if t == "checkout.session.completed":
        await _mark_paid(obj["id"], obj.get("metadata") or {})
    elif t == "checkout.session.async_payment_failed":
        await db.payment_transactions.update_one(
            {"session_id": obj["id"]},
            {"$set": {"status": "failed", "payment_status": "failed", "updated_at": now_iso()}},
        )
    elif t == "checkout.session.expired":
        await db.payment_transactions.update_one(
            {"session_id": obj["id"]},
            {"$set": {"status": "expired", "payment_status": "expired", "updated_at": now_iso()}},
        )
    return {"status": "ok"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
