# Project Overview: E-Commerce Sales, Customer Retention & Delivery Performance Analytics

## Problem Statement
E-commerce marketplaces face significant customer churn and logistics friction. For Olist, operating across 27 Brazilian states, single-order customer rates exceed 85%, and delivery lead times directly drive down review ratings.

## Business Objectives
1. Measure commercial performance (GMV, AOV, Order Volumes).
2. Segment customers via RFM (Recency, Frequency, Monetary).
3. Evaluate delivery lead times, delay rates, and review score correlations.
4. Predict 180-day customer inactivity using machine learning.
5. Provide actionable, data-driven prescriptive recommendations.

## Analytics Methodology
- **Descriptive**: Monthly GMV, order volume, category matrix.
- **Diagnostic**: Statistical relationship between delivery delays and review scores.
- **Predictive**: Logistic Regression & Random Forest customer inactivity prediction.
- **Prescriptive**: Dynamic recommendation engine based on calculated metrics.

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons.
- **Backend**: FastAPI, SQLAlchemy, Pydantic, Scikit-learn, joblib.
- **Database**: SQLite (Local Dev), PostgreSQL (Production).
