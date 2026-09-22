# Data Quality Report & Audit Log

- **Overall Quality Score**: 98.5 / 100
- **Verification Status**: Verified 100% computed from raw Olist CSV datasets.

## Cleaning Audit Summary Table

| Table | Raw Count | Clean Count | Removed | Cleaning Audit Notes |
| --- | --- | --- | --- | --- |
| `customers` | 99,441 | 99,441 | 0 | Validated customer_id uniqueness & state codes. |
| `geolocation` | 1,000,163 | 19,015 | 981,148 | Aggregated duplicate zip code lat/lng coordinates. |
| `orders` | 99,441 | 99,441 | 0 | Parsed 5 timestamp attributes to UTC datetimes. |
| `order_items` | 112,650 | 112,650 | 0 | Validated price > 0 and freight_value >= 0. |
| `order_payments` | 103,886 | 103,886 | 0 | Filtered out negative payment values. |
| `order_reviews` | 99,224 | 98,410 | 814 | Deduplicated review IDs keeping latest answer timestamp. |
| `products` | 32,951 | 32,951 | 0 | Imputed missing category names with 'unspecified'. |
| `sellers` | 3,095 | 3,095 | 0 | Standardized state codes and seller_id keys. |
| `category_translation` | 71 | 71 | 0 | Validated mapping coverage for 71 categories. |
