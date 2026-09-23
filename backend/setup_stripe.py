"""Idempotent Stripe catalog setup for Mama's School Rides. Run once: python3 setup_stripe.py"""
import os
import stripe
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")
stripe.api_key = os.environ["STRIPE_SECRET_KEY"]

CATALOG = [
    {
        "emergent_product_id": "school_rides_seat",
        "name": "Mama's School Rides — Seat Reservation",
        "tax_code": "txcd_20060000",
        "prices": [
            {"lookup_key": "roundtrip_monthly", "amount": 55000, "currency": "cad"},
            {"lookup_key": "oneway_monthly", "amount": 42500, "currency": "cad"},
            {"lookup_key": "siblings2_monthly", "amount": 90000, "currency": "cad"},
            {"lookup_key": "siblings3_monthly", "amount": 115000, "currency": "cad"},
        ],
    },
]


def ensure_tax_settings():
    s = stripe.tax.Settings.retrieve()
    if s.head_office and getattr(s.head_office, "address", None):
        return
    stripe.tax.Settings.modify(
        head_office={"address": {"country": "CA", "line1": "McConachie", "city": "Edmonton", "state": "AB", "postal_code": "T5Y 0A1"}},
        defaults={"tax_behavior": "exclusive"},
    )


def get_or_create_product(entry):
    for p in stripe.Product.list(active=True).auto_paging_iter():
        if p.to_dict().get("metadata", {}).get("emergent_product_id") == entry["emergent_product_id"]:
            return p
    return stripe.Product.create(
        name=entry["name"], tax_code=entry.get("tax_code"),
        metadata={"managed_by": "emergent", "emergent_product_id": entry["emergent_product_id"]},
    )


def main():
    ensure_tax_settings()
    for entry in CATALOG:
        product = get_or_create_product(entry)
        for price in entry["prices"]:
            existing = stripe.Price.list(lookup_keys=[price["lookup_key"]], active=True, limit=1).data
            if existing and (existing[0].unit_amount != price["amount"] or existing[0].currency != price["currency"]):
                stripe.Price.modify(existing[0].id, active=False)
                existing = []
            if not existing:
                kwargs = dict(
                    product=product.id, unit_amount=price["amount"], currency=price["currency"],
                    lookup_key=price["lookup_key"], transfer_lookup_key=True,
                )
                if price.get("interval"):
                    kwargs["recurring"] = {"interval": price["interval"]}
                stripe.Price.create(**kwargs)
                print("created", price["lookup_key"])
            else:
                print("exists", price["lookup_key"])
    print("catalog ready")


if __name__ == "__main__":
    main()
