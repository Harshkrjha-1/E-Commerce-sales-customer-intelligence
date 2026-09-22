# Data Dictionary

Comprehensive schema documentation for the 9 Olist CSV dataset tables.

| Table Name | Primary Key | Description | Record Count |
| --- | --- | --- | --- |
| `olist_customers_dataset` | `customer_id` | Unique customer key and state/city | 99,441 |
| `olist_geolocation_dataset` | `geolocation_zip_code_prefix` | Lat/lng coordinates per zip code | 1,000,163 |
| `olist_orders_dataset` | `order_id` | Order status and timestamps | 99,441 |
| `olist_order_items_dataset` | `(order_id, order_item_id)` | Item prices, freight, product & seller IDs | 112,650 |
| `olist_order_payments_dataset` | `order_id` | Payment types, installments, and payment value | 103,886 |
| `olist_order_reviews_dataset` | `review_id` | Review scores (1-5 stars) and comment timestamps | 99,224 |
| `olist_products_dataset` | `product_id` | Product categories, weight, and dimensions | 32,951 |
| `olist_sellers_dataset` | `seller_id` | Merchant location zip code, city, state | 3,095 |
| `product_category_name_translation` | `product_category_name` | Portuguese to English category translation | 71 |
