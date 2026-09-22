# API Documentation

The FastAPI backend exposes 16 endpoints for real-time analytics and predictive inference.

## Endpoints Summary

### System & Metadata
- `GET /api/health`: Health status check
- `GET /api/metadata`: Model metadata, metrics, feature coefficients
- `GET /api/data-quality`: Data cleaning summary audit report

### Analytics
- `GET /api/kpis?state={st}&category={cat}`: Calculated KPI summary card metrics
- `GET /api/sales/monthly`: Monthly revenue, orders, AOV, MoM growth
- `GET /api/sales/categories?limit=15`: Category revenue matrix
- `GET /api/sales/regions`: Regional state performance
- `GET /api/sellers/top?limit=20`: Seller revenue, orders, delay rate, review score
- `GET /api/customers/segments`: RFM segment breakdown summary
- `GET /api/customers/rfm?segment={seg}&risk_level={risk}&limit=50&offset=0`: Searchable customer RFM table
- `GET /api/delivery/performance`: Delivery days, SLA estimates, state delay rates

### Predictions & Prescriptive Analytics
- `POST /api/predict/customer-risk`: Real-time risk probability & recommended action
- `GET /api/risk/summary`: Churn risk level breakdown counts
- `GET /api/recommendations`: Dynamic prescriptive recommendations engine
