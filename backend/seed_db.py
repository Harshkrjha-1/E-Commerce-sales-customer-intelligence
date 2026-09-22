"""
seed_db.py
Database Seeding Script to populate SQLite / PostgreSQL from processed analytical CSVs
"""

import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import pandas as pd
from sqlalchemy.orm import Session
from backend.database import Base, engine, SessionLocal
from backend.models import (
    Order,
    CustomerRFM,
    MonthlySales,
    CategoryPerformance,
    StatePerformance,
    SellerPerformance
)

PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")

def filter_model_kwargs(model_cls, records):
    valid_cols = {c.name for c in model_cls.__table__.columns}
    clean_records = []
    for r in records:
        clean_r = {}
        for k, v in r.items():
            if k in valid_cols:
                if isinstance(v, pd.Timestamp):
                    clean_r[k] = v.to_pydatetime()
                elif pd.isna(v):
                    clean_r[k] = None
                else:
                    clean_r[k] = v
        clean_records.append(clean_r)
    return clean_records

def seed_database():
    print("=== Seeding Relational Database ===")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db: Session = SessionLocal()

    try:
        # 1. Monthly Sales
        df_monthly = pd.read_csv(os.path.join(PROCESSED_DIR, "sales_monthly.csv"))
        monthly_records = [MonthlySales(**r) for r in filter_model_kwargs(MonthlySales, df_monthly.to_dict(orient="records"))]
        db.bulk_save_objects(monthly_records)
        print(f"Seeded {len(monthly_records)} monthly sales records.")

        # 2. Category Performance
        df_cat = pd.read_csv(os.path.join(PROCESSED_DIR, "category_performance.csv"))
        cat_records = [CategoryPerformance(**r) for r in filter_model_kwargs(CategoryPerformance, df_cat.to_dict(orient="records"))]
        db.bulk_save_objects(cat_records)
        print(f"Seeded {len(cat_records)} category performance records.")

        # 3. State Performance
        df_state = pd.read_csv(os.path.join(PROCESSED_DIR, "state_performance.csv"))
        state_records = [StatePerformance(**r) for r in filter_model_kwargs(StatePerformance, df_state.to_dict(orient="records"))]
        db.bulk_save_objects(state_records)
        print(f"Seeded {len(state_records)} state performance records.")

        # 4. Seller Performance
        df_seller = pd.read_csv(os.path.join(PROCESSED_DIR, "seller_performance.csv"))
        seller_records = [SellerPerformance(**r) for r in filter_model_kwargs(SellerPerformance, df_seller.to_dict(orient="records"))]
        db.bulk_save_objects(seller_records)
        print(f"Seeded {len(seller_records)} seller performance records.")

        # 5. Customer RFM
        df_rfm = pd.read_csv(os.path.join(PROCESSED_DIR, "customer_rfm.csv"))
        rfm_records = [CustomerRFM(**r) for r in filter_model_kwargs(CustomerRFM, df_rfm.to_dict(orient="records"))]
        db.bulk_save_objects(rfm_records)
        print(f"Seeded {len(rfm_records)} customer RFM records.")

        # 6. Orders Master
        df_orders = pd.read_csv(os.path.join(PROCESSED_DIR, "analytical_orders.csv"))
        date_cols = [
            "order_purchase_timestamp", "order_approved_at",
            "order_delivered_carrier_date", "order_delivered_customer_date",
            "order_estimated_delivery_date"
        ]
        for col in date_cols:
            df_orders[col] = pd.to_datetime(df_orders[col], errors="coerce")
        
        batch_size = 5000
        clean_records = filter_model_kwargs(Order, df_orders.to_dict(orient="records"))
        for i in range(0, len(clean_records), batch_size):
            batch = [Order(**r) for r in clean_records[i:i + batch_size]]
            db.bulk_save_objects(batch)
            db.commit()
            print(f"Seeded orders batch {i // batch_size + 1}/{(len(clean_records) + batch_size - 1) // batch_size}")

        db.commit()
        print("Database seeding completed successfully!\n")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
