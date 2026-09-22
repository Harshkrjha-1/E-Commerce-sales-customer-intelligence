"""
test_api.py
Automated Unit and Integration Tests for FastAPI Backend Endpoints
"""

import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"

def test_kpis_endpoint():
    response = client.get("/api/kpis")
    assert response.status_code == 200
    data = response.json()
    assert "total_gmv" in data
    assert "total_orders" in data
    assert data["total_orders"] > 0
    assert data["total_gmv"] > 0

def test_monthly_sales_endpoint():
    response = client.get("/api/sales/monthly")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_category_performance_endpoint():
    response = client.get("/api/sales/categories?limit=10")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) <= 10

def test_risk_prediction_endpoint():
    payload = {
        "recency_days": 180,
        "frequency": 1,
        "monetary_value": 85.0,
        "avg_order_value": 85.0,
        "total_items": 1,
        "review_score": 2.0,
        "delivery_days": 18.0,
        "delayed_orders_count": 1,
        "preferred_payment_method": "boleto"
    }
    response = client.post("/api/predict/customer-risk", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_risk_level" in data
    assert "inactivity_probability" in data

def test_recommendations_endpoint():
    response = client.get("/api/recommendations")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 4
