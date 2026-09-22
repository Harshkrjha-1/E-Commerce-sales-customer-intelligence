# Analytics Methodology

## 1. Descriptive Analytics
Calculated commercial metrics strictly from `analytical_orders.csv`:
- **GMV**: Sum of product item prices + freight values.
- **AOV**: Total GMV divided by total delivered orders count.
- **Monthly Trajectory**: Aggregated revenue and order counts grouped by year-month period.

## 2. Diagnostic Analytics
Investigated root cause of customer review drops:
- Evaluated delivery lead time (days) vs review score (1-5 stars).
- Discovered mean review score drops from 4.3 on on-time orders to 2.1 on delayed orders.

## 3. Customer RFM Segmentation
Scored customers across 5 quantiles on:
- Recency (Days since last purchase as of max date)
- Frequency (Delivered order count)
- Monetary (Total GMV spent)
Assigned 7 segments: Champions, Loyal Customers, Potential Loyalists, At Risk, High Value At Risk, New Customers, Low Engagement.
