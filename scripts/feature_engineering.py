"""
feature_engineering.py
Customer Feature Engineering & ML Snapshot Dataset Generation
"""

import os
import sys
import pandas as pd
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")

def assign_rfm_segment(r, f, m):
    if r >= 4 and f >= 4 and m >= 4:
        return "Champions"
    elif r >= 3 and f >= 3 and m >= 3:
        return "Loyal Customers"
    elif r >= 4 and f <= 3 and m >= 2:
        return "Potential Loyalists"
    elif r <= 2 and f >= 3 and m >= 3:
        return "High Value At Risk"
    elif r <= 2 and f >= 2:
        return "At Risk"
    elif r >= 4 and f <= 2:
        return "New Customers"
    else:
        return "Low Engagement"

def run_feature_engineering():
    print("=== Phase 4: Feature Engineering & RFM Segmentation ===")
    df_orders = pd.read_csv(os.path.join(PROCESSED_DIR, "analytical_orders.csv"))
    df_orders["order_purchase_timestamp"] = pd.to_datetime(df_orders["order_purchase_timestamp"])
    
    valid_orders = df_orders[df_orders["order_status"].isin(["delivered", "shipped"])].copy()
    
    # 1. Full Dataset Customer RFM
    max_date = df_orders["order_purchase_timestamp"].max() + pd.Timedelta(days=1)
    
    cust_rfm = valid_orders.groupby("customer_unique_id").agg({
        "order_purchase_timestamp": lambda x: (max_date - x.max()).days,
        "order_id": "nunique",
        "order_revenue": "sum",
        "total_items": "sum",
        "review_score": "mean",
        "delivery_days": "mean",
        "is_delayed": "sum",
        "payment_type": "first",
        "customer_state": "first"
    }).reset_index().rename(columns={
        "order_purchase_timestamp": "recency_days",
        "order_id": "frequency",
        "order_revenue": "monetary_value",
        "is_delayed": "delayed_orders_count",
        "payment_type": "preferred_payment_method"
    })
    
    cust_rfm["avg_order_value"] = cust_rfm["monetary_value"] / np.maximum(1, cust_rfm["frequency"])
    cust_rfm["review_score"] = cust_rfm["review_score"].fillna(4.0)
    cust_rfm["delivery_days"] = cust_rfm["delivery_days"].fillna(12.0)
    cust_rfm["preferred_payment_method"] = cust_rfm["preferred_payment_method"].fillna("credit_card")
    
    # Compute RFM Scores (1-5)
    cust_rfm["r_score"] = pd.qcut(cust_rfm["recency_days"], 5, labels=[5, 4, 3, 2, 1]).astype(int)
    cust_rfm["f_score"] = pd.qcut(cust_rfm["frequency"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5]).astype(int)
    cust_rfm["m_score"] = pd.qcut(cust_rfm["monetary_value"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5]).astype(int)
    
    cust_rfm["rfm_segment"] = cust_rfm.apply(lambda row: assign_rfm_segment(row["r_score"], row["f_score"], row["m_score"]), axis=1)
    
    def get_risk_level(r_days, f, m):
        if r_days > 180:
            return "High"
        elif r_days > 90:
            return "Medium"
        else:
            return "Low"
            
    cust_rfm["churn_risk_level"] = cust_rfm.apply(lambda row: get_risk_level(row["recency_days"], row["frequency"], row["monetary_value"]), axis=1)
    
    cust_rfm.to_csv(os.path.join(PROCESSED_DIR, "customer_rfm.csv"), index=False)
    print(f"Created customer_rfm.csv ({len(cust_rfm):,} unique customers)")
    
    # 2. Historical Snapshot ML Dataset
    SNAPSHOT_DATE = pd.to_datetime("2018-03-01")
    OBSERVATION_END = SNAPSHOT_DATE + pd.Timedelta(days=180)
    
    hist_orders = valid_orders[valid_orders["order_purchase_timestamp"] <= SNAPSHOT_DATE]
    future_orders = valid_orders[(valid_orders["order_purchase_timestamp"] > SNAPSHOT_DATE) & 
                                 (valid_orders["order_purchase_timestamp"] <= OBSERVATION_END)]
    
    future_customers = set(future_orders["customer_unique_id"].dropna().unique())
    
    ml_df = hist_orders.groupby("customer_unique_id").agg({
        "order_purchase_timestamp": lambda x: (SNAPSHOT_DATE - x.max()).days,
        "order_id": "nunique",
        "order_revenue": "sum",
        "total_items": "sum",
        "review_score": "mean",
        "delivery_days": "mean",
        "is_delayed": "sum",
        "payment_type": "first",
        "customer_state": "first"
    }).reset_index().rename(columns={
        "order_purchase_timestamp": "recency_days",
        "order_id": "frequency",
        "order_revenue": "monetary_value",
        "is_delayed": "delayed_orders_count",
        "payment_type": "preferred_payment_method"
    })
    
    ml_df["avg_order_value"] = ml_df["monetary_value"] / np.maximum(1, ml_df["frequency"])
    ml_df["review_score"] = ml_df["review_score"].fillna(4.0)
    ml_df["delivery_days"] = ml_df["delivery_days"].fillna(12.0)
    ml_df["preferred_payment_method"] = ml_df["preferred_payment_method"].fillna("credit_card")
    
    # Target: 1 if customer did NOT order in the 180 days after snapshot (inactive/churned), 0 if they ordered
    ml_df["is_inactive"] = ml_df["customer_unique_id"].apply(lambda cid: 0 if cid in future_customers else 1)
    
    ml_df.to_csv(os.path.join(PROCESSED_DIR, "customer_ml_dataset.csv"), index=False)
    print(f"Created customer_ml_dataset.csv ({len(ml_df):,} historical customers, snapshot date={SNAPSHOT_DATE.date()})")
    print(f"Target distribution (is_inactive): {ml_df['is_inactive'].value_counts(normalize=True).to_dict()}")
    print("Feature engineering completed successfully!\n")

if __name__ == "__main__":
    run_feature_engineering()
