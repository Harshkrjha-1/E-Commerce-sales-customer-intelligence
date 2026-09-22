# Deployment Guide

## Production Architecture
- **Frontend**: Deploy to Vercel as a Static SPA.
- **Backend API**: Deploy to Render Web Service using Docker or Python.
- **Database**: Deploy to Render PostgreSQL.

## Environment Variables Configuration

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@render-db-host:5432/olist_db
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=https://your-frontend-app.vercel.app
```

### Frontend (.env)
```env
VITE_API_BASE_URL=https://olist-analytics-backend.onrender.com/api
```

## Dataset & Git Storage Policy
Large raw CSV files are excluded from Git repository commits via `.gitignore` (`data/raw/*`).
To reproduce the data pipeline on any machine:
1. Download the raw CSVs from [Kaggle Olist Dataset](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce).
2. Save raw files into `data/raw/`.
3. Run `python scripts/clean_data.py && python scripts/transform_data.py && python scripts/feature_engineering.py && python scripts/train_model.py && python backend/seed_db.py`.

## Local Development Execution
1. **Backend**: `uvicorn backend.main:app --port 8000`
2. **Frontend**: `npm run dev` (in `frontend/`)
