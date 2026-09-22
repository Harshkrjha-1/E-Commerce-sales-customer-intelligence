# E-Commerce Sales, Customer Retention & Delivery Performance Analytics Platform

> **IBM SkillsBuild / BharatCares Data Analytics with AI Internship Capstone Project**  
> An End-to-End Production-Ready Data Analytics & Predictive Machine Learning Web Application using the official **Brazilian E-Commerce Public Dataset by Olist**.

---

## ⚡ Single Vercel-Only Deployment Architecture

This entire application is configured to deploy as a **Single Vercel Project** serving both the **React + Vite Frontend** and the **FastAPI Serverless Python Backend** under one unified domain.

- **Vercel Project:** Single Monorepo Deployment
- **Frontend Domain:** `https://e-commerce-sales-customer-intellige.vercel.app/`
- **Backend API Domain:** `https://e-commerce-sales-customer-intellige.vercel.app/api`
- **Health Check:** `https://e-commerce-sales-customer-intellige.vercel.app/api/health`
- **Zero External Backend / Zero Render Dependency:** FastAPI backend and React frontend are deployed under the same Vercel domain using same-origin REST API calls.

---

## 📥 Dataset Download & Git Storage Policy

> [!NOTE]
> To keep the GitHub repository lightweight, clean, and manageable, **large raw CSV files are ignored by Git** (`data/raw/*` in `.gitignore`).  
> The project remains 100% reproducible locally and in production using the processed datasets (`data/processed/*.csv`) included in the repository.

### How to Download & Setup Dataset Locally:
1. Download the official dataset directly from Kaggle:  
   👉 **[Brazilian E-Commerce Public Dataset by Olist on Kaggle](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce)**
2. Unzip the downloaded archive.
3. Place all 9 raw CSV files into `data/raw/`:
   - `olist_customers_dataset.csv`
   - `olist_geolocation_dataset.csv`
   - `olist_order_items_dataset.csv`
   - `olist_order_payments_dataset.csv`
   - `olist_order_reviews_dataset.csv`
   - `olist_orders_dataset.csv`
   - `olist_products_dataset.csv`
   - `olist_sellers_dataset.csv`
   - `product_category_name_translation.csv`
4. Run `python scripts/clean_data.py` to populate `data/processed/` and seed your local database.

---

## 📌 Project Overview & Problem Statement

E-commerce marketplaces face critical profitability challenges driven by high customer acquisition costs (CAC), single-purchase customer churn, and fulfillment delays. Operating across 27 Brazilian states, **Olist** connects small merchants to online buyers.

This platform addresses key business questions:
1. What is our revenue (GMV), order volume, and Average Order Value (AOV) growth trajectory?
2. Which product categories and geographic regions generate the highest sales volume?
3. How do delivery delays affect customer review scores and brand sentiment?
4. How can we segment customers into actionable RFM (Recency, Frequency, Monetary) buckets?
5. Which customers are at high risk of 180-day inactivity/churn?
6. What specific data-driven actions should management take to maximize retention and logistics efficiency?

---

## 📊 The Four Analytics Levels

1. **DESCRIPTIVE ("What happened?")**: Total GMV of R$ 16,008,872.12 across 99,441 orders. Monthly revenue trajectories, category revenue matrices, and regional state distributions.
2. **DIAGNOSTIC ("Why did it happen?")**: Statistical investigation revealing customer review scores drop precipitously from 4.3 / 5.0 on on-time orders to 2.1 / 5.0 on delayed shipments.
3. **PREDICTIVE ("What is likely to happen?")**: Historical snapshot Logistic Regression model predicting customer 180-day inactivity churn risk (Precision: 99.05%, Recall: 62.96%, F1: 76.99%).
4. **PRESCRIPTIVE ("What should the business do?")**: Dynamic recommendation engine generating prioritized action plans with dataset evidence, business objectives, and risk scores.

---

## 🏗️ System Architecture & Vercel Flow

```
Single Vercel Project Deployment (https://YOUR-PROJECT.vercel.app)
 ├── / (All UI Routes) ─────────► React + Vite SPA Frontend (frontend/src)
 └── /api/* (REST Endpoints) ──► Vercel Python Serverless Function (api/index.py -> backend/main.py)
                                       │
                                       ▼
                             SQLAlchemy / SQLite (/tmp/ecommerce.db auto-seeded)
                                       │
                                       ▼
                             Scikit-Learn ML Model (models/customer_risk_model.pkl)
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons, React Router DOM.
- **Backend API**: Python 3.10, FastAPI, Pydantic V2, Uvicorn, Pytest.
- **Database Layer**: SQLAlchemy ORM, SQLite (local dev & Vercel `/tmp` serverless auto-seed).
- **Machine Learning & Data**: Scikit-Learn, Pandas, NumPy, Joblib.
- **Deployment Platform**: Vercel (Single Unified Monorepo Project).

---

## 📁 Repository Directory Structure

```
ecommerce-sales-customer-intelligence/
│
├── vercel.json                        # Root Vercel Monorepo deployment config (Python + Vite)
├── requirements.txt                   # Root Python dependencies for Vercel build
├── Dockerfile                         # Container configuration (Optional alternative)
├── .env.example
├── LICENSE
├── README.md                          # Master documentation
│
├── api/
│   └── index.py                       # Vercel Python serverless entrypoint importing backend.main:app
│
├── frontend/                          # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/                # Navbar, Sidebar, KPICard, SkeletonLoader
│   │   ├── pages/                     # 9 Dashboard Navigation Pages
│   │   ├── services/                  # API Fetch Client (/api relative path)
│   │   └── types/                     # TypeScript interfaces
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                           # FastAPI Server Layer
│   ├── main.py                        # REST endpoints (app variable)
│   ├── database.py                    # SQLAlchemy config with Vercel /tmp auto-seed
│   ├── models.py                      # Database ORM models
│   ├── schemas.py                     # Pydantic request/response schemas
│   ├── seed_db.py                     # Database seed script
│   └── recommendation_engine.py       # Prescriptive engine
│
├── data/                              # Data Directory Layer
│   ├── raw/                           # Ignored by Git (.gitkeep retained)
│   ├── processed/                     # Clean analytical CSV tables (Committed for Vercel)
│   └── data_dictionary.csv            # Schema dictionary (Committed to Git)
│
├── notebooks/                         # 7 Analytical Jupyter Notebooks
│   ├── 01_data_understanding.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_descriptive_analysis.ipynb
│   ├── 04_diagnostic_analysis.ipynb
│   ├── 05_customer_rfm.ipynb
│   ├── 06_customer_risk_model.ipynb
│   └── 07_prescriptive_analysis.ipynb
│
├── models/
│   ├── customer_risk_model.pkl        # Trained Scikit-Learn pipeline
│   └── model_metadata.json            # Metrics & feature weights
│
├── scripts/
│   ├── ingest_data.py
│   ├── clean_data.py
│   ├── transform_data.py
│   ├── feature_engineering.py
│   ├── train_model.py
│   └── generate_notebooks.py
│
├── docs/                              # Technical Documentation & Reports
│   ├── PROJECT_OVERVIEW.md
│   ├── DATA_DICTIONARY.md
│   ├── DATA_QUALITY.md
│   ├── ANALYTICS_METHODOLOGY.md
│   ├── ML_METHODOLOGY.md
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT.md
│   ├── BUSINESS_RECOMMENDATIONS.md
│   └── FINAL_VERIFICATION.md
│
├── tests/
│   └── test_api.py                    # Automated Pytest Suite
│
├── presentation/
│   └── project_content.md             # 15 Slide Capstone Presentation
│
└── report/
    └── project_report_outline.md      # 18 Section Capstone Report
```

---

## 🚀 One-Click Vercel Deployment Guide

### Option 1: Deploy via Vercel Dashboard (Recommended)
1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** ➔ **Project**.
3. Import your GitHub repository: `Harshkrjha-1/E-Commerce-sales-customer-intelligence`.
4. Keep Root Directory as `./` (Root).
5. Vercel automatically detects `vercel.json` and configures the Python backend + Vite frontend.
6. Click **Deploy**.

### Option 2: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## ⚡ Deployed Application & API

### 1. Production Backend API

Production API available at `https://e-commerce-sales-customer-intellige.vercel.app/api`.

### 2. Production FastAPI Server

Backend health check available at `https://e-commerce-sales-customer-intellige.vercel.app/api/health`.

### 3. Production React Frontend

Dashboard available at `https://e-commerce-sales-customer-intellige.vercel.app/`.


---

## 📜 Author & License

- **Author**: Academic Internship Capstone Project (IBM SkillsBuild / BharatCares)
- **License**: MIT License
