# Vercel Deployment Guide

## Production Monorepo Architecture
- **Single Vercel Project**: The entire application (React + Vite Frontend + FastAPI Serverless Python Backend) deploys to a single Vercel project under one public domain.
- **Frontend URL**: `https://YOUR-PROJECT.vercel.app/`
- **Backend API URL**: `https://YOUR-PROJECT.vercel.app/api/...`

## Vercel Configuration (`vercel.json`)
The root `vercel.json` configures the Vercel builders and routes:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.py",
      "use": "@vercel/python"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "api/index.py"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/index.html"
    }
  ]
}
```

## Vercel Serverless Function Entrypoint (`api/index.py`)
```python
import os
import sys

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from backend.main import app
```

## Database Handling in Serverless Environment
- No external database service (Render/Postgres) is required.
- If no external `DATABASE_URL` is set, `backend/database.py` automatically initializes and seeds a high-performance SQLite database in `/tmp/ecommerce.db` using the preprocessed CSV datasets (`data/processed/*.csv`) on serverless cold-start.

## Local Testing Commands
```bash
# 1. Run pytest suite
pytest tests/test_api.py

# 2. Test FastAPI server
uvicorn backend.main:app --port 8000

# 3. Test React build
cd frontend
npm run build
```
