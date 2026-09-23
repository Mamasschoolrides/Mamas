from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import jwt
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
    return {"ok": True, "reference": doc["reference"]}


@api_router.post("/waitlist")
async def join_waitlist(input: WaitlistCreate):
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = now_iso()
    await db.waitlist.insert_one(doc)
    return {"ok": True}


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


@api_router.post("/admin/route-status")
async def set_route_status(update: RouteStatusUpdate, authorization: str = Header(None)):
    require_admin(authorization)
    await db.settings.update_one(
        {"key": "route_status"},
        {"$set": {"key": "route_status", "routes_full": update.routes_full}},
        upsert=True,
    )
    return {"ok": True, "routes_full": update.routes_full}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
