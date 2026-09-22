"""
database.py
SQLAlchemy Database Connection & Session Setup
Supports SQLite (local dev & Vercel serverless /tmp auto-seed) and PostgreSQL
"""

import os
import sys
import sqlite3
import tempfile
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    root_db = os.path.join(BASE_DIR, "ecommerce.db")
    tmp_dir = tempfile.gettempdir()
    tmp_db = os.path.join(tmp_dir, "ecommerce.db")
    
    if os.path.exists(root_db) and os.path.getsize(root_db) > 0:
        db_path = root_db
    else:
        db_path = tmp_db
        if not os.path.exists(tmp_db) or os.path.getsize(tmp_db) == 0:
            os.makedirs(tmp_dir, exist_ok=True)
            conn = sqlite3.connect(tmp_db)
            table_map = {
                "sales_monthly.csv": "sales_monthly",
                "category_performance.csv": "category_performance",
                "state_performance.csv": "state_performance",
                "seller_performance.csv": "seller_performance",
                "customer_rfm.csv": "customer_rfm",
                "analytical_orders.csv": "orders"
            }
            for csv_name, table_name in table_map.items():
                csv_path = os.path.join(PROCESSED_DIR, csv_name)
                if os.path.exists(csv_path):
                    df = pd.read_csv(csv_path)
                    if table_name == "orders":
                        date_cols = [
                            "order_purchase_timestamp", "order_approved_at",
                            "order_delivered_carrier_date", "order_delivered_customer_date",
                            "order_estimated_delivery_date"
                        ]
                        for col in date_cols:
                            if col in df.columns:
                                df[col] = pd.to_datetime(df[col], errors="coerce").astype(str)
                    df.to_sql(table_name, conn, if_exists="replace", index=False)
            conn.close()

    DATABASE_URL = f"sqlite:///{db_path}"

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
