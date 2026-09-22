"""
transform_data.py
Data Transformation & Analytical Table Builder Script for Olist Dataset
"""

import os
import sys
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")

def transform_data():
    print("=== Phase 3: Transforming & Building Analytical Tables ===")
    
    # Load clean data
    df_customers = pd.read_csv(os.path.join(PROCESSED_DIR, "clean_customers.csv"))
    df_orders = pd.read_csv(os.path.join(PROCESSED_DIR, "clean_orders.csv"))
    df_items = pd.read_csv(os.path.join(PROCESSED_DIR, "clean_order_items.csv"))
    df_payments = pd.read_csv(os.path.join(PROCESSED_DIR, "clean_order_payments.csv"))
    df_reviews = pd.read_csv(os.path.join(PROCESSED_DIR, "clean_order_reviews.csv"))
    df_products = pd.read_csv(os.path.join(PROCESSED_DIR, "clean_products.csv"))
    df_sellers = pd.read_csv(os.path.join(PROCESSED_DIR, "clean_sellers.csv"))
    df_trans = pd.read_csv(os.path.join(PROCESSED_DIR, "clean_category_translation.csv"))

    # Map product category translation
    df_products = df_products.merge(df_trans, on="product_category_name", how="left")
    df_products["category_english"] = df_products["product_category_name_english"].fillna(df_products["product_category_name"])

    # Aggregate item metrics per order
    item_agg = df_items.groupby("order_id").agg({
        "order_item_id": "count",
        "price": "sum",
        "freight_value": "sum",
        "product_id": "first",
        "seller_id": "first"
    }).reset_index().rename(columns={
        "order_item_id": "total_items",
        "price": "items_revenue",
        "freight_value": "freight_revenue"
    })
    item_agg["order_revenue"] = item_agg["items_revenue"] + item_agg["freight_revenue"]

    # Aggregate payment value per order
    pay_agg = df_payments.groupby("order_id").agg({
        "payment_value": "sum",
        "payment_type": lambda x: x.iloc[0] if len(x) > 0 else "unknown",
        "payment_installments": "max"
    }).reset_index()

    # Aggregate review score per order
    rev_agg = df_reviews.groupby("order_id").agg({
        "review_score": "mean"
    }).reset_index()

    # Convert order dates to datetime
    for col in ["order_purchase_timestamp", "order_approved_at", "order_delivered_carrier_date", "order_delivered_customer_date", "order_estimated_delivery_date"]:
        df_orders[col] = pd.to_datetime(df_orders[col], errors="coerce")

    # Merge into master analytical_orders
    orders_master = df_orders.merge(df_customers, on="customer_id", how="left")
    orders_master = orders_master.merge(item_agg, on="order_id", how="left")
    orders_master = orders_master.merge(pay_agg, on="order_id", how="left")
    orders_master = orders_master.merge(rev_agg, on="order_id", how="left")
    orders_master = orders_master.merge(df_products[["product_id", "category_english"]], on="product_id", how="left")

    # Calculate delivery metrics
    orders_master["delivery_days"] = (orders_master["order_delivered_customer_date"] - orders_master["order_purchase_timestamp"]).dt.total_seconds() / (24 * 3600)
    orders_master["estimated_days"] = (orders_master["order_estimated_delivery_date"] - orders_master["order_purchase_timestamp"]).dt.total_seconds() / (24 * 3600)
    orders_master["is_delayed"] = (orders_master["order_delivered_customer_date"] > orders_master["order_estimated_delivery_date"]).astype(int)
    orders_master["delay_days"] = np.maximum(0, (orders_master["order_delivered_customer_date"] - orders_master["order_estimated_delivery_date"]).dt.total_seconds() / (24 * 3600))
    orders_master["year_month"] = orders_master["order_purchase_timestamp"].dt.to_period("M").astype(str)

    # Save analytical_orders
    orders_master.to_csv(os.path.join(PROCESSED_DIR, "analytical_orders.csv"), index=False)
    print(f"Created analytical_orders.csv ({len(orders_master):,} rows)")

    # 1. Monthly Sales Aggregation
    valid_delivered = orders_master[orders_master["order_status"] == "delivered"]
    monthly_sales = valid_delivered.groupby("year_month").agg({
        "order_id": "nunique",
        "customer_unique_id": "nunique",
        "order_revenue": "sum",
        "items_revenue": "sum",
        "freight_revenue": "sum",
        "total_items": "sum",
        "review_score": "mean",
        "delivery_days": "mean",
        "is_delayed": "mean"
    }).reset_index().rename(columns={
        "order_id": "total_orders",
        "customer_unique_id": "unique_customers",
        "order_revenue": "gmv",
        "is_delayed": "delay_rate"
    })
    monthly_sales["aov"] = monthly_sales["gmv"] / np.maximum(1, monthly_sales["total_orders"])
    monthly_sales["mom_growth"] = monthly_sales["gmv"].pct_change() * 100
    monthly_sales = monthly_sales.sort_values("year_month")
    monthly_sales.to_csv(os.path.join(PROCESSED_DIR, "sales_monthly.csv"), index=False)
    print(f"Created sales_monthly.csv ({len(monthly_sales):,} months)")

    # 2. Category Performance
    cat_perf = valid_delivered.groupby("category_english").agg({
        "order_id": "nunique",
        "order_revenue": "sum",
        "items_revenue": "sum",
        "total_items": "sum",
        "review_score": "mean",
        "delivery_days": "mean",
        "is_delayed": "mean"
    }).reset_index().rename(columns={
        "order_id": "total_orders",
        "order_revenue": "gmv",
        "category_english": "category",
        "is_delayed": "delay_rate"
    }).sort_values("gmv", ascending=False)
    cat_perf.to_csv(os.path.join(PROCESSED_DIR, "category_performance.csv"), index=False)
    print(f"Created category_performance.csv ({len(cat_perf):,} categories)")

    # 3. State Performance
    state_perf = valid_delivered.groupby("customer_state").agg({
        "order_id": "nunique",
        "customer_unique_id": "nunique",
        "order_revenue": "sum",
        "freight_revenue": "sum",
        "delivery_days": "mean",
        "review_score": "mean",
        "is_delayed": "mean"
    }).reset_index().rename(columns={
        "order_id": "total_orders",
        "customer_unique_id": "unique_customers",
        "order_revenue": "gmv",
        "is_delayed": "delay_rate"
    }).sort_values("gmv", ascending=False)
    state_perf.to_csv(os.path.join(PROCESSED_DIR, "state_performance.csv"), index=False)
    print(f"Created state_performance.csv ({len(state_perf):,} states)")

    # 4. Seller Performance
    seller_orders = orders_master[orders_master["seller_id"].notnull()].copy()
    seller_perf = seller_orders.groupby("seller_id").agg({
        "order_id": "nunique",
        "order_revenue": "sum",
        "review_score": "mean",
        "delivery_days": "mean",
        "is_delayed": "mean"
    }).reset_index().rename(columns={
        "order_id": "total_orders",
        "order_revenue": "gmv",
        "is_delayed": "delay_rate"
    })
    seller_perf = seller_perf.merge(df_sellers, on="seller_id", how="left")
    seller_perf.to_csv(os.path.join(PROCESSED_DIR, "seller_performance.csv"), index=False)
    print(f"Created seller_performance.csv ({len(seller_perf):,} sellers)")

    print("Data transformation completed successfully!\n")

if __name__ == "__main__":
    transform_data()
