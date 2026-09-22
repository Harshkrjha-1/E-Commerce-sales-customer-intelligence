"""
ingest_data.py
Raw Data Ingestion and Validation Script for Brazilian E-Commerce Dataset (Olist)
"""

import os
import sys
import pandas as pd

RAW_DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "raw")

EXPECTED_FILES = [
    "olist_customers_dataset.csv",
    "olist_geolocation_dataset.csv",
    "olist_order_items_dataset.csv",
    "olist_order_payments_dataset.csv",
    "olist_order_reviews_dataset.csv",
    "olist_orders_dataset.csv",
    "olist_products_dataset.csv",
    "olist_sellers_dataset.csv",
    "product_category_name_translation.csv",
]

def ingest_raw_data(data_dir=RAW_DATA_DIR):
    print("=== Phase 1: Ingesting Raw Data ===")
    data = {}
    for filename in EXPECTED_FILES:
        filepath = os.path.join(data_dir, filename)
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"Missing expected raw dataset file: {filepath}")
        df = pd.read_csv(filepath)
        data[filename] = df
        print(f"Loaded {filename}: {df.shape[0]:,} rows, {df.shape[1]} columns")
    print("All raw files ingested successfully!\n")
    return data

if __name__ == "__main__":
    ingest_raw_data()
