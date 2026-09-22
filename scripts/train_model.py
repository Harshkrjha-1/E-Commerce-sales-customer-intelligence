"""
train_model.py
Customer Risk / Churn Machine Learning Model Training Script
"""

import os
import sys
import json
import joblib
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")
MODELS_DIR = os.path.join(BASE_DIR, "models")
os.makedirs(MODELS_DIR, exist_ok=True)

def train_customer_risk_model():
    print("=== Phase 5: Training Customer Risk / Inactivity Machine Learning Model ===")
    
    ml_path = os.path.join(PROCESSED_DIR, "customer_ml_dataset.csv")
    if not os.path.exists(ml_path):
        raise FileNotFoundError(f"Missing ML dataset at {ml_path}")
        
    df = pd.read_csv(ml_path)
    
    numeric_features = [
        "recency_days",
        "frequency",
        "monetary_value",
        "avg_order_value",
        "total_items",
        "review_score",
        "delivery_days",
        "delayed_orders_count"
    ]
    categorical_features = ["preferred_payment_method"]
    
    X = df[numeric_features + categorical_features]
    y = df["is_inactive"]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=42, stratify=y
    )
    
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numeric_features),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features)
        ]
    )
    
    # 1. Primary Model: Logistic Regression (balanced class weight)
    log_reg_pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", LogisticRegression(class_weight="balanced", random_state=42, max_iter=1000))
    ])
    
    log_reg_pipeline.fit(X_train, y_train)
    y_pred_lr = log_reg_pipeline.predict(X_test)
    y_prob_lr = log_reg_pipeline.predict_proba(X_test)[:, 1]
    
    lr_metrics = {
        "accuracy": round(float(accuracy_score(y_test, y_pred_lr)), 4),
        "precision": round(float(precision_score(y_test, y_pred_lr, zero_division=0)), 4),
        "recall": round(float(recall_score(y_test, y_pred_lr)), 4),
        "f1": round(float(f1_score(y_test, y_pred_lr)), 4),
        "roc_auc": round(float(roc_auc_score(y_test, y_prob_lr)), 4),
        "confusion_matrix": confusion_matrix(y_test, y_pred_lr).tolist()
    }
    
    # Extract coefficients
    cat_encoder = log_reg_pipeline.named_steps["preprocessor"].named_transformers_["cat"]
    encoded_cat_names = list(cat_encoder.get_feature_names_out(categorical_features))
    feature_names = numeric_features + encoded_cat_names
    coefficients = log_reg_pipeline.named_steps["classifier"].coef_[0]
    
    feat_importance_lr = [
        {"feature": name, "coefficient": round(float(coef), 4)}
        for name, coef in zip(feature_names, coefficients)
    ]
    feat_importance_lr.sort(key=lambda x: abs(x["coefficient"]), reverse=True)
    
    # 2. Secondary Comparison Model: Random Forest
    rf_pipeline = Pipeline(steps=[
        ("preprocessor", preprocessor),
        ("classifier", RandomForestClassifier(n_estimators=100, class_weight="balanced", random_state=42, max_depth=8))
    ])
    rf_pipeline.fit(X_train, y_train)
    y_pred_rf = rf_pipeline.predict(X_test)
    y_prob_rf = rf_pipeline.predict_proba(X_test)[:, 1]
    
    rf_metrics = {
        "accuracy": round(float(accuracy_score(y_test, y_pred_rf)), 4),
        "precision": round(float(precision_score(y_test, y_pred_rf, zero_division=0)), 4),
        "recall": round(float(recall_score(y_test, y_pred_rf)), 4),
        "f1": round(float(f1_score(y_test, y_pred_rf)), 4),
        "roc_auc": round(float(roc_auc_score(y_test, y_prob_rf)), 4),
        "confusion_matrix": confusion_matrix(y_test, y_pred_rf).tolist()
    }
    
    # Save primary model
    model_filename = os.path.join(MODELS_DIR, "customer_risk_model.pkl")
    joblib.dump(log_reg_pipeline, model_filename)
    print(f"Saved primary Logistic Regression model to {model_filename}")
    
    # Save model metadata
    metadata = {
        "model_name": "LogisticRegression (Customer Inactivity & Churn Risk Predictor)",
        "training_period": "Historical snapshot up to 2018-03-01",
        "target_definition": "1 if customer placed NO orders in the 180 days post-snapshot, 0 if customer purchased again",
        "primary_model_metrics": lr_metrics,
        "comparison_model_metrics": rf_metrics,
        "feature_list": feature_names,
        "feature_coefficients": feat_importance_lr,
        "limitations": [
            "Dataset represents cross-sectional historical ecommerce snapshot (2016-2018).",
            "High proportion of single-purchase customers in initial Olist data.",
            "Model optimized for recall of high-risk customers under class-balanced threshold."
        ]
    }
    
    metadata_filename = os.path.join(MODELS_DIR, "model_metadata.json")
    with open(metadata_filename, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Saved model metadata to {metadata_filename}")
    print("\nLogistic Regression Evaluation Results:")
    print(json.dumps(lr_metrics, indent=2))
    print("\nModel training completed successfully!\n")

if __name__ == "__main__":
    train_customer_risk_model()
