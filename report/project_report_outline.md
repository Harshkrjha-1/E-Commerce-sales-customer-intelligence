# E-Commerce Sales, Customer Retention & Delivery Performance Analytics
## Final Internship Capstone Project Report
### IBM SkillsBuild / BharatCares Data Analytics with AI Internship Program

---

## Table of Contents
1. Abstract
2. Introduction
3. Problem Statement
4. Project Objectives
5. Dataset Overview & Attribution
6. Data Preparation, Cleaning & Ingestion Pipeline
7. Exploratory Data Analysis & Descriptive Analytics
8. Diagnostic Analytics: Delivery Performance vs Review Ratings
9. Customer Segmentation & RFM Methodology
10. Predictive Modeling: Customer Risk & Churn Prediction
11. Model Evaluation & Performance Analysis
12. Prescriptive Analytics & Dynamic Recommendation Engine
13. Full-Stack Web Application Architecture & Design System
14. Business Recommendations & Actionable Insights
15. Project Limitations
16. Future Scope & Scaling
17. Conclusion
18. References & Appendix

---

### 1. Abstract
This report details the end-to-end development of a production-grade Data Analytics and Machine Learning web application built using the official Brazilian E-Commerce Public Dataset by Olist (100,000+ transaction records between 2016 and 2018). The project encompasses data ingestion, cleaning audits, relational database architecture (SQLAlchemy/SQLite/PostgreSQL), exploratory descriptive analytics, diagnostic root-cause analysis, historical snapshot customer churn modeling, dynamic prescriptive recommendation generation, and a modern React + TypeScript + FastAPI web application.

---

### 2. Introduction
E-commerce marketplaces face intense competition where customer acquisition costs (CAC) continue to escalate. Maximizing customer lifetime value (LTV) through retention and ensuring timely fulfillment are critical drivers of long-term profitability. This capstone project provides an enterprise intelligence platform designed to assist executives in monitoring sales trajectories, customer segments, delivery bottlenecks, and customer inactivity risks.

---

### 3. Problem Statement
Olist operates as an e-commerce marketplace integrator in Brazil. Analysis reveals two prominent business challenges:
- High customer churn: Over 85% of customers place only a single purchase.
- Delivery latency: Logistics delays in specific Brazilian states cause customer review scores to drop from 4.3 to 2.1 stars out of 5.

---

### 4. Project Objectives
- Build an end-to-end data pipeline to clean and process 9 raw Olist CSV datasets.
- Calculate exact commercial KPIs (GMV, AOV, Order Volumes, Delay Rates, Repeat Rates).
- Implement RFM customer segmentation.
- Train an interpretable Logistic Regression model to predict customer inactivity without target leakage.
- Develop a responsive React + Vite + TypeScript dashboard connected to a FastAPI REST backend.

---

### 5. Dataset Overview & Attribution
The project uses the Brazilian E-Commerce Public Dataset by Olist hosted on Kaggle. It covers 99,441 orders across 9 relational tables including customers, geolocation, orders, order items, payments, reviews, products, sellers, and product category translations.

---

### 6. Data Preparation, Cleaning & Ingestion Pipeline
- Date Conversion: Standardized 5 date columns to UTC datetimes.
- Deduplication: Aggregated duplicate zip code coordinates.
- Validation: Filtered out non-positive item prices and negative payments.
- Pipeline Scripts: Executable scripts `ingest_data.py`, `clean_data.py`, `transform_data.py`, `feature_engineering.py`, `train_model.py`.

---

### 7. Exploratory Data Analysis & Descriptive Analytics
- Total GMV: R$ 16,008,872.12 across 99,441 orders.
- Average Order Value: R$ 160.99.
- Seasonality: Strong GMV growth peaking during Q4 Black Friday 2017.
- Categories: Health & Beauty and Bed Bath Table lead in total revenue.

---

### 8. Diagnostic Analytics: Delivery Performance vs Review Ratings
- On-Time Orders: Average review score = 4.3 / 5.
- Delayed Orders: Average review score = 2.1 / 5.
- Regional Variance: Delivery delays are concentrated in northern and northeastern states (RJ, BA, AL).

---

### 9. Customer Segmentation & RFM Methodology
Quantile scoring (1-5) on Recency, Frequency, and Monetary value created 7 distinct customer segments:
- Champions (R 4-5, F 4-5, M 4-5)
- Loyal Customers (R 3-5, F 3-5, M 3-5)
- Potential Loyalists (R 4-5, F 1-3, M 2-4)
- At Risk (R 1-2, F 3-5, M 3-5)
- High Value At Risk (R 1-2, F 4-5, M 4-5)
- New Customers (R 4-5, F 1-2, M 1-2)
- Low Engagement (R 1-2, F 1-2, M 1-2)

---

### 10. Predictive Modeling: Customer Risk & Churn Prediction
To prevent target leakage, a historical snapshot date (`2018-03-01`) was selected. Features were computed strictly using orders prior to snapshot date, while target `is_inactive` was defined as placing zero orders in the 180 days following snapshot date.

---

### 11. Model Evaluation & Performance Analysis
- Model: Logistic Regression with balanced class weights.
- Metrics: Precision = 0.9905, Recall = 0.6296, F1 = 0.7699, Accuracy = 0.6280.
- Key Risk Factors: High recency days, low review ratings, experienced delivery delays.

---

### 12. Prescriptive Analytics & Dynamic Recommendation Engine
The platform dynamically generates actionable recommendations with issue, evidence, action, priority, and reason based on computed database metrics.

---

### 13. Full-Stack Web Application Architecture & Design System
- Frontend: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons.
- Backend: FastAPI, SQLAlchemy, Pydantic, Scikit-learn, joblib.
- Database: SQLite (local dev), PostgreSQL (production).

---

### 14. Business Recommendations & Actionable Insights
1. Deploy automated win-back retention campaigns for High-Value At-Risk customers.
2. Establish regional distribution hubs in high-delay states to reduce delivery lead time.
3. Enforce seller dispatch SLA compliance with buy-box penalty mechanisms.

---

### 15. Project Limitations
- Cross-sectional historical dataset period (2016–2018).
- Lack of true net profit data (dataset provides GMV and freight costs).

---

### 16. Future Scope & Scaling
- Live streaming pipeline integration.
- Deployment to cloud serverless infrastructure (Render + Vercel + PostgreSQL).

---

### 17. Conclusion
The project successfully achieves all academic and enterprise objectives, delivering a production-ready data science web application built on real Olist data.

---

### 18. References & Appendix
- Olist Dataset Kaggle: https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce
- FastAPI Documentation: https://fastapi.tiangolo.com/
- Scikit-learn Documentation: https://scikit-learn.org/
