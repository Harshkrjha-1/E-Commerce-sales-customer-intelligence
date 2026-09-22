"""
schemas.py
Pydantic Request and Response Schemas for FastAPI
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class KPISummaryResponse(BaseModel):
    total_gmv: float
    total_orders: int
    unique_customers: int
    avg_order_value: float
    total_items_sold: int
    avg_review_score: float
    avg_delivery_days: float
    delivery_delay_rate: float
    repeat_customer_rate: float
    cancelled_order_rate: float
    mom_growth_rate: float

class MonthlySalesResponse(BaseModel):
    year_month: str
    total_orders: int
    unique_customers: int
    gmv: float
    items_revenue: float
    freight_revenue: float
    total_items: int
    review_score: Optional[float]
    delivery_days: Optional[float]
    delay_rate: Optional[float]
    aov: float
    mom_growth: Optional[float]

class CategoryPerformanceResponse(BaseModel):
    category: str
    total_orders: int
    gmv: float
    items_revenue: float
    total_items: int
    review_score: Optional[float]
    delivery_days: Optional[float]
    delay_rate: Optional[float]

class StatePerformanceResponse(BaseModel):
    customer_state: str
    total_orders: int
    unique_customers: int
    gmv: float
    freight_revenue: float
    delivery_days: Optional[float]
    review_score: Optional[float]
    delay_rate: Optional[float]

class SellerPerformanceResponse(BaseModel):
    seller_id: str
    total_orders: int
    gmv: float
    review_score: Optional[float]
    delivery_days: Optional[float]
    delay_rate: Optional[float]
    seller_city: Optional[str]
    seller_state: Optional[str]

class CustomerRFMResponse(BaseModel):
    customer_unique_id: str
    recency_days: int
    frequency: int
    monetary_value: float
    avg_order_value: float
    total_items: int
    review_score: float
    delivery_days: float
    delayed_orders_count: int
    preferred_payment_method: str
    customer_state: str
    r_score: int
    f_score: int
    m_score: int
    rfm_segment: str
    churn_risk_level: str

class CustomerPredictRequest(BaseModel):
    recency_days: int = Field(..., ge=0, example=45)
    frequency: int = Field(..., ge=1, example=2)
    monetary_value: float = Field(..., ge=0.0, example=250.0)
    avg_order_value: float = Field(..., ge=0.0, example=125.0)
    total_items: int = Field(..., ge=1, example=2)
    review_score: float = Field(..., ge=1.0, le=5.0, example=4.5)
    delivery_days: float = Field(..., ge=0.0, example=8.0)
    delayed_orders_count: int = Field(..., ge=0, example=0)
    preferred_payment_method: str = Field("credit_card", example="credit_card")

class CustomerPredictResponse(BaseModel):
    predicted_risk_level: str
    inactivity_probability: float
    churn_risk_score: float
    top_risk_factors: List[Dict[str, Any]]
    recommended_action: str

class ModelMetadataResponse(BaseModel):
    model_name: str
    training_period: str
    target_definition: str
    primary_model_metrics: Dict[str, Any]
    comparison_model_metrics: Dict[str, Any]
    feature_list: List[str]
    feature_coefficients: List[Dict[str, Any]]
    limitations: List[str]

class RecommendationResponse(BaseModel):
    id: str
    title: str
    category: str
    priority: str
    issue: str
    evidence: str
    target_segment: str
    suggested_action: str
    expected_business_objective: str
    reason: str
