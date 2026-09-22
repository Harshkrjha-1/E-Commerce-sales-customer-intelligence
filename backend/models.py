"""
models.py
SQLAlchemy ORM Data Models with Indexes
"""

from sqlalchemy import Column, Integer, Float, String, DateTime, Index
from backend.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String, unique=True, index=True, nullable=False)
    customer_id = Column(String, index=True)
    customer_unique_id = Column(String, index=True)
    order_status = Column(String, index=True)
    order_purchase_timestamp = Column(DateTime, index=True)
    order_approved_at = Column(DateTime)
    order_delivered_carrier_date = Column(DateTime)
    order_delivered_customer_date = Column(DateTime)
    order_estimated_delivery_date = Column(DateTime)
    customer_city = Column(String)
    customer_state = Column(String, index=True)
    total_items = Column(Integer, default=1)
    items_revenue = Column(Float, default=0.0)
    freight_revenue = Column(Float, default=0.0)
    order_revenue = Column(Float, default=0.0)
    payment_type = Column(String)
    review_score = Column(Float)
    category_english = Column(String, index=True)
    delivery_days = Column(Float)
    estimated_days = Column(Float)
    is_delayed = Column(Integer, default=0)
    delay_days = Column(Float, default=0.0)
    year_month = Column(String, index=True)

class CustomerRFM(Base):
    __tablename__ = "customer_rfm"

    id = Column(Integer, primary_key=True, index=True)
    customer_unique_id = Column(String, unique=True, index=True, nullable=False)
    recency_days = Column(Integer, index=True)
    frequency = Column(Integer, index=True)
    monetary_value = Column(Float, index=True)
    total_items = Column(Integer)
    review_score = Column(Float)
    delivery_days = Column(Float)
    delayed_orders_count = Column(Integer)
    preferred_payment_method = Column(String)
    customer_state = Column(String, index=True)
    avg_order_value = Column(Float)
    r_score = Column(Integer)
    f_score = Column(Integer)
    m_score = Column(Integer)
    rfm_segment = Column(String, index=True)
    churn_risk_level = Column(String, index=True)

class MonthlySales(Base):
    __tablename__ = "sales_monthly"

    id = Column(Integer, primary_key=True, index=True)
    year_month = Column(String, unique=True, index=True)
    total_orders = Column(Integer)
    unique_customers = Column(Integer)
    gmv = Column(Float)
    items_revenue = Column(Float)
    freight_revenue = Column(Float)
    total_items = Column(Integer)
    review_score = Column(Float)
    delivery_days = Column(Float)
    delay_rate = Column(Float)
    aov = Column(Float)
    mom_growth = Column(Float)

class CategoryPerformance(Base):
    __tablename__ = "category_performance"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, unique=True, index=True)
    total_orders = Column(Integer)
    gmv = Column(Float)
    items_revenue = Column(Float)
    total_items = Column(Integer)
    review_score = Column(Float)
    delivery_days = Column(Float)
    delay_rate = Column(Float)

class StatePerformance(Base):
    __tablename__ = "state_performance"

    id = Column(Integer, primary_key=True, index=True)
    customer_state = Column(String, unique=True, index=True)
    total_orders = Column(Integer)
    unique_customers = Column(Integer)
    gmv = Column(Float)
    freight_revenue = Column(Float)
    delivery_days = Column(Float)
    review_score = Column(Float)
    delay_rate = Column(Float)

class SellerPerformance(Base):
    __tablename__ = "seller_performance"

    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(String, unique=True, index=True)
    total_orders = Column(Integer)
    gmv = Column(Float)
    review_score = Column(Float)
    delivery_days = Column(Float)
    delay_rate = Column(Float)
    seller_zip_code_prefix = Column(Float)
    seller_city = Column(String)
    seller_state = Column(String, index=True)
