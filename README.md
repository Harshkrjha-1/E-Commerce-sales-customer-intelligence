# E-Commerce Sales, Customer Retention & Delivery Performance Analytics Platform

> **IBM SkillsBuild / BharatCares Data Analytics with AI Internship Capstone Project**  
> An End-to-End Production-Ready Data Analytics & Predictive Machine Learning Web Application using the official **Brazilian E-Commerce Public Dataset by Olist**.

---

## 🚀 Live Demo & Access Links

- **Frontend Dashboard**: [http://localhost:5173/](http://localhost:5173/)
- **Backend FastAPI Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **API Health Endpoint**: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

---

## 📥 Dataset Download & Git Storage Policy

> [!NOTE]
> To keep the GitHub repository lightweight, clean, and manageable, **large raw CSV files are ignored by Git** (`data/raw/*` in `.gitignore`).  
> The project remains 100% reproducible by placing the downloaded Kaggle CSV files into `data/raw/`.

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

## 🏗️ System Architecture

```
Raw Olist CSVs (Downloaded locally to data/raw/)
       │
       ▼
Data Ingestion & Cleaning (scripts/clean_data.py)
       │
       ▼
Transformation & Aggregation (scripts/transform_data.py)
       │
       ▼
Feature Engineering & RFM (scripts/feature_engineering.py)
       │
       ▼
ML Model Training & Artifact (scripts/train_model.py -> models/customer_risk_model.pkl)
       │
       ▼
Relational DB (backend/models.py -> SQLite / PostgreSQL)
       │
       ▼
FastAPI REST API Layer (backend/main.py -> 16 Endpoints)
       │
       ▼
React + Vite + TypeScript + Recharts Dashboard (frontend/src)
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons, React Router DOM.
- **Backend API**: Python 3.10, FastAPI, Pydantic V2, Uvicorn, Pytest.
- **Database Layer**: SQLAlchemy ORM, SQLite (local), PostgreSQL (production).
- **Machine Learning & Data**: Scikit-Learn, Pandas, NumPy, Joblib.
- **Deployment**: Render (Backend & PostgreSQL), Vercel (Frontend), Docker.

---

## 📁 Repository Directory Structure

```
ecommerce-sales-customer-intelligence/
│
├── frontend/                  # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/        # Navbar, Sidebar, KPICard, SkeletonLoader
│   │   ├── pages/             # 9 Dashboard Navigation Pages
│   │   ├── services/          # API Fetch Client
│   │   └── types/             # TypeScript interfaces
│   ├── package.json
│   ├── vite.config.ts
│   └── vercel.json
│
├── backend/                   # FastAPI Server Layer
│   ├── main.py                # REST endpoints
│   ├── database.py            # SQLAlchemy config
│   ├── models.py              # Database ORM models
│   ├── schemas.py             # Pydantic request/response schemas
│   ├── seed_db.py             # Database seed script
│   └── recommendation_engine.py # Prescriptive engine
│
├── data/
│   ├── raw/                   # Ignored by Git (.gitkeep retained)
│   ├── processed/             # Clean analytical CSV tables
│   └── data_dictionary.csv    # Schema dictionary (Committed to Git)
│
├── notebooks/                 # 7 Analytical Jupyter Notebooks
│   ├── 01_data_understanding.ipynb
│   ├── 02_data_cleaning.ipynb
│   ├── 03_descriptive_analysis.ipynb
│   ├── 04_diagnostic_analysis.ipynb
│   ├── 05_customer_rfm.ipynb
│   ├── 06_customer_risk_model.ipynb
│   └── 07_prescriptive_analysis.ipynb
│
├── models/
│   ├── customer_risk_model.pkl # Trained Scikit-Learn pipeline
│   └── model_metadata.json    # Metrics & feature weights
│
├── scripts/
│   ├── ingest_data.py
│   ├── clean_data.py
│   ├── transform_data.py
│   ├── feature_engineering.py
│   ├── train_model.py
│   └── generate_notebooks.py
│
├── docs/                      # Technical Documentation & Reports
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
│   └── test_api.py            # Automated Pytest Suite
│
├── presentation/
│   └── project_content.md     # 15 Slide Capstone Presentation
│
├── report/
│   └── project_report_outline.md # 18 Section Capstone Report
│
├── Dockerfile                 # Backend Container configuration
├── render.yaml                # Render Deployment Blueprint
├── requirements.txt           # Python dependencies
├── .env.example
└── README.md
```

---

## ⚡ Quick Start & Local Execution

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm

### 1. Run Data Pipeline & Seed Database
```bash
# Ingest raw CSVs, clean, transform, engineer RFM features, train ML model, seed DB
python scripts/clean_data.py
python scripts/transform_data.py
python scripts/feature_engineering.py
python scripts/train_model.py
python backend/seed_db.py
```

### 2. Launch FastAPI Backend API
```bash
uvicorn backend.main:app --host 127.0.0.1 --port 8000
```
Swagger UI will be live at `http://127.0.0.1:8000/docs`.

### 3. Launch React Dashboard Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 🧪 Testing

Run backend unit and integration test suite:
```bash
pytest tests/test_api.py
```

Run frontend build verification:
```bash
cd frontend
npm run build
```

---

## 📜 Author & License

- **Author**: Academic Internship Capstone Project (IBM SkillsBuild / BharatCares)
- **License**: MIT License
