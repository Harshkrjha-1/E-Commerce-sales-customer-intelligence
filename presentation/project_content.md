# E-Commerce Sales, Customer Retention & Delivery Performance Analytics
## Internship Capstone Presentation Slides (15 Slides)
### IBM SkillsBuild / BharatCares Data Analytics with AI Internship

---

### Slide 1: Title Slide
- **Title**: E-Commerce Sales, Customer Retention & Delivery Performance Analytics Platform
- **Subtitle**: An End-to-End Predictive Analytics & Machine Learning Solution using the Olist Dataset
- **Author**: Student / Intern Capstone
- **Program**: IBM SkillsBuild & BharatCares Data Analytics with AI Internship
- **Dataset**: Brazilian E-Commerce Public Dataset by Olist (100,000+ orders, 2016–2018)

---

### Slide 2: Problem Statement
- **Context**: Brazilian marketplace aggregator Olist connects sellers across 27 states to online customers.
- **Challenges**:
  - High customer acquisition costs paired with low repeat purchase rates.
  - Geographical logistics bottlenecks leading to delivery delays.
  - Customer review score drops on delayed shipments impacting platform brand equity.
- **Goal**: Build a full-stack real-time analytics & ML platform to provide descriptive, diagnostic, predictive, and prescriptive intelligence.

---

### Slide 3: Business Objectives
1. **Sales Intelligence**: Track GMV, order volume, Average Order Value (AOV), and category trends.
2. **Customer Segmentation**: Implement RFM (Recency, Frequency, Monetary) segment modeling.
3. **Logistics Optimization**: Analyze estimated vs actual delivery lead times and state delay rates.
4. **Predictive Risk AI**: Predict 180-day customer inactivity/churn risk using historical snapshot features.
5. **Prescriptive Action**: Automatically translate analytics into prioritized business recommendations.

---

### Slide 4: Olist Dataset Inventory & Cleaning Audit
- **Files Ingested**: 9 raw CSV tables (~100,000 orders, 99k customers, 3k sellers, 33k products).
- **Cleaning Actions**:
  - Validated timestamp parsing across 5 order date attributes.
  - Aggregated duplicate geolocation zip codes to centroid coordinates.
  - Filtered out non-positive prices and negative payment values.
  - Deduplicated review IDs maintaining latest timestamp.
- **Result**: Zero synthetic fallbacks; 100% computed from real Olist data.

---

### Slide 5: System Architecture
```
Raw CSV Files -> Data Pipeline & Cleaning -> Feature Engineering & RFM -> ML Snapshot Training
      │
      ▼
SQLAlchemy + Relational DB (SQLite/PostgreSQL) -> FastAPI REST Endpoints -> React + Vite Dashboard
```

---

### Slide 6: Descriptive Analytics — Sales & Revenue Performance
- **Total GMV Revenue**: R$ 16,008,872.12 across 99,441 orders.
- **Average Order Value (AOV)**: R$ 160.99 per order.
- **Peak Sales**: Strong seasonality during Q4 Black Friday 2017.
- **Top Category**: Health & Beauty (Beleza Saude) generating over R$ 1.2M GMV.

---

### Slide 7: Diagnostic Analytics — Logistics vs Review Ratings
- **Core Finding**: Delivery delay is the single strongest determinant of customer review scores.
- **On-Time Deliveries**: Average review score of 4.3 / 5.0.
- **Delayed Deliveries**: Average review score drops precipitously to 2.1 / 5.0.
- **Regional Latency**: Northern states (RJ, BA, AL) experience delay rates > 10% vs SP (7.8%).

---

### Slide 8: Customer Segmentation — RFM Analysis
- **Champions & Loyal Customers**: Represent top 15% of GMV revenue.
- **At Risk & High Value At Risk**: 28% of total customer base have high recency (>180 days) with no repeat purchases.
- **New Customers**: High conversion opportunity to turn single-order buyers into repeat buyers.

---

### Slide 9: Predictive Modeling — Customer Churn/Risk
- **Snapshot Methodology**: Snapshot date set to `2018-03-01` to prevent target leakage.
- **Target Variable**: 1 if customer placed NO orders in 180 days post-snapshot, 0 if active.
- **Primary Model**: Logistic Regression with class-balanced weighting.
- **Secondary Benchmark**: Random Forest Classifier.

---

### Slide 10: Model Evaluation Results
- **Precision**: 0.9905 (High confidence on flagged inactive accounts).
- **Recall**: 0.6296 (Captures 63% of true inactive accounts).
- **F1 Score**: 0.7699.
- **Confusion Matrix**: [ [82, 84], [5138, 8735] ].

---

### Slide 11: Prescriptive Analytics — Recommendation Engine
1. **Retention Priority**: Target high-value at-risk accounts with automated 20% win-back incentives.
2. **Logistics Priority**: Partner with regional carriers in RJ, BA, and AL to reduce lead times by 25%.
3. **Category Growth**: Onboard fast-shipping sellers in top 5 GMV categories.
4. **Seller SLA Enforcement**: Enforce dispatch windows and apply buy-box suppression for repeat SLA offenders.

---

### Slide 12: Full-Stack Web Application Demo
- **Tech Stack**: React 18 + Vite + TypeScript + Tailwind CSS + Recharts.
- **FastAPI**: 16 REST endpoints with CORS, Pydantic schemas, and pagination.
- **Features**: Interactive global state filters, live Customer Risk Calculator tool, searchable RFM table.

---

### Slide 13: Technical & Business Limitations
- Cross-sectional dataset limitation (2016–2018 snapshot period).
- Absence of true net profit margin (data provides GMV & Freight revenue only).
- Class imbalance inherent in single-purchase e-commerce behavior.

---

### Slide 14: Future Enhancements
- Integration of real-time event streaming via Kafka / WebSockets.
- Deployment to cloud serverless infrastructure (Render + Vercel + Render Postgres).
- Deep learning sequence modeling (RNN/LSTM) for multi-touch purchase probability.

---

### Slide 15: Conclusion & Q&A
- Delivered a complete, professional, portfolio-ready Data Science + Full-Stack AI project.
- Successfully demonstrated all four analytics levels on real Olist data.
- Open for questions and discussion.
