# Data Quality Report - Olist Brazilian E-Commerce Dataset

## Table: olist_customers_dataset
- **Rows**: 99,441
- **Columns**: 5
- **Duplicate Rows**: 0

| Column Name | Data Type | Non-Null Count | Null Count | Null % | Unique Values | Sample Value |
| --- | --- | --- | --- | --- | --- | --- |
| customer_id | object | 99,441 | 0 | 0.0% | 99,441 | 06b8999e2fba1a1fbc88172c00ba8bc7 |
| customer_unique_id | object | 99,441 | 0 | 0.0% | 96,096 | 861eff4711a542e4b93843c6dd7febb0 |
| customer_zip_code_prefix | int64 | 99,441 | 0 | 0.0% | 14,994 | 14409 |
| customer_city | object | 99,441 | 0 | 0.0% | 4,119 | franca |
| customer_state | object | 99,441 | 0 | 0.0% | 27 | SP |

---

## Table: olist_geolocation_dataset
- **Rows**: 1,000,163
- **Columns**: 5
- **Duplicate Rows**: 261,831

| Column Name | Data Type | Non-Null Count | Null Count | Null % | Unique Values | Sample Value |
| --- | --- | --- | --- | --- | --- | --- |
| geolocation_zip_code_prefix | int64 | 1,000,163 | 0 | 0.0% | 19,015 | 1037 |
| geolocation_lat | float64 | 1,000,163 | 0 | 0.0% | 717,360 | -23.54562128115268 |
| geolocation_lng | float64 | 1,000,163 | 0 | 0.0% | 717,613 | -46.63929204800168 |
| geolocation_city | object | 1,000,163 | 0 | 0.0% | 8,011 | sao paulo |
| geolocation_state | object | 1,000,163 | 0 | 0.0% | 27 | SP |

---

## Table: olist_order_items_dataset
- **Rows**: 112,650
- **Columns**: 7
- **Duplicate Rows**: 0

| Column Name | Data Type | Non-Null Count | Null Count | Null % | Unique Values | Sample Value |
| --- | --- | --- | --- | --- | --- | --- |
| order_id | object | 112,650 | 0 | 0.0% | 98,666 | 00010242fe8c5a6d1ba2dd792cb16214 |
| order_item_id | int64 | 112,650 | 0 | 0.0% | 21 | 1 |
| product_id | object | 112,650 | 0 | 0.0% | 32,951 | 4244733e06e7ecb4970a6e2683c13e61 |
| seller_id | object | 112,650 | 0 | 0.0% | 3,095 | 48436dade18ac8b2bce089ec2a041202 |
| shipping_limit_date | object | 112,650 | 0 | 0.0% | 93,318 | 2017-09-19 09:45:35 |
| price | float64 | 112,650 | 0 | 0.0% | 5,968 | 58.9 |
| freight_value | float64 | 112,650 | 0 | 0.0% | 6,999 | 13.29 |

---

## Table: olist_order_payments_dataset
- **Rows**: 103,886
- **Columns**: 5
- **Duplicate Rows**: 0

| Column Name | Data Type | Non-Null Count | Null Count | Null % | Unique Values | Sample Value |
| --- | --- | --- | --- | --- | --- | --- |
| order_id | object | 103,886 | 0 | 0.0% | 99,440 | b81ef226f3fe1789b1e8b2acac839d17 |
| payment_sequential | int64 | 103,886 | 0 | 0.0% | 29 | 1 |
| payment_type | object | 103,886 | 0 | 0.0% | 5 | credit_card |
| payment_installments | int64 | 103,886 | 0 | 0.0% | 24 | 8 |
| payment_value | float64 | 103,886 | 0 | 0.0% | 29,077 | 99.33 |

---

## Table: olist_order_reviews_dataset
- **Rows**: 99,224
- **Columns**: 7
- **Duplicate Rows**: 0

| Column Name | Data Type | Non-Null Count | Null Count | Null % | Unique Values | Sample Value |
| --- | --- | --- | --- | --- | --- | --- |
| review_id | object | 99,224 | 0 | 0.0% | 98,410 | 7bc2406110b926393aa56f80a40eba40 |
| order_id | object | 99,224 | 0 | 0.0% | 98,673 | 73fc7af87114b39712e6da79b0a377eb |
| review_score | int64 | 99,224 | 0 | 0.0% | 5 | 4 |
| review_comment_title | object | 11,568 | 87,656 | 88.34% | 4,527 | recomendo |
| review_comment_message | object | 40,977 | 58,247 | 58.7% | 36,159 | Recebi bem antes do prazo estipulado. |
| review_creation_date | object | 99,224 | 0 | 0.0% | 636 | 2018-01-18 00:00:00 |
| review_answer_timestamp | object | 99,224 | 0 | 0.0% | 98,248 | 2018-01-18 21:46:59 |

---

## Table: olist_orders_dataset
- **Rows**: 99,441
- **Columns**: 8
- **Duplicate Rows**: 0

| Column Name | Data Type | Non-Null Count | Null Count | Null % | Unique Values | Sample Value |
| --- | --- | --- | --- | --- | --- | --- |
| order_id | object | 99,441 | 0 | 0.0% | 99,441 | e481f51cbdc54678b7cc49136f2d6af7 |
| customer_id | object | 99,441 | 0 | 0.0% | 99,441 | 9ef432eb6251297304e76186b10a928d |
| order_status | object | 99,441 | 0 | 0.0% | 8 | delivered |
| order_purchase_timestamp | object | 99,441 | 0 | 0.0% | 98,875 | 2017-10-02 10:56:33 |
| order_approved_at | object | 99,281 | 160 | 0.16% | 90,733 | 2017-10-02 11:07:15 |
| order_delivered_carrier_date | object | 97,658 | 1,783 | 1.79% | 81,018 | 2017-10-04 19:55:00 |
| order_delivered_customer_date | object | 96,476 | 2,965 | 2.98% | 95,664 | 2017-10-10 21:25:13 |
| order_estimated_delivery_date | object | 99,441 | 0 | 0.0% | 459 | 2017-10-18 00:00:00 |

---

## Table: olist_products_dataset
- **Rows**: 32,951
- **Columns**: 9
- **Duplicate Rows**: 0

| Column Name | Data Type | Non-Null Count | Null Count | Null % | Unique Values | Sample Value |
| --- | --- | --- | --- | --- | --- | --- |
| product_id | object | 32,951 | 0 | 0.0% | 32,951 | 1e9e8ef04dbcff4541ed26657ea517e5 |
| product_category_name | object | 32,341 | 610 | 1.85% | 73 | perfumaria |
| product_name_lenght | float64 | 32,341 | 610 | 1.85% | 66 | 40.0 |
| product_description_lenght | float64 | 32,341 | 610 | 1.85% | 2,960 | 287.0 |
| product_photos_qty | float64 | 32,341 | 610 | 1.85% | 19 | 1.0 |
| product_weight_g | float64 | 32,949 | 2 | 0.01% | 2,204 | 225.0 |
| product_length_cm | float64 | 32,949 | 2 | 0.01% | 99 | 16.0 |
| product_height_cm | float64 | 32,949 | 2 | 0.01% | 102 | 10.0 |
| product_width_cm | float64 | 32,949 | 2 | 0.01% | 95 | 14.0 |

---

## Table: olist_sellers_dataset
- **Rows**: 3,095
- **Columns**: 4
- **Duplicate Rows**: 0

| Column Name | Data Type | Non-Null Count | Null Count | Null % | Unique Values | Sample Value |
| --- | --- | --- | --- | --- | --- | --- |
| seller_id | object | 3,095 | 0 | 0.0% | 3,095 | 3442f8959a84dea7ee197c632cb2df15 |
| seller_zip_code_prefix | int64 | 3,095 | 0 | 0.0% | 2,246 | 13023 |
| seller_city | object | 3,095 | 0 | 0.0% | 611 | campinas |
| seller_state | object | 3,095 | 0 | 0.0% | 23 | SP |

---

## Table: product_category_name_translation
- **Rows**: 71
- **Columns**: 2
- **Duplicate Rows**: 0

| Column Name | Data Type | Non-Null Count | Null Count | Null % | Unique Values | Sample Value |
| --- | --- | --- | --- | --- | --- | --- |
| product_category_name | object | 71 | 0 | 0.0% | 71 | beleza_saude |
| product_category_name_english | object | 71 | 0 | 0.0% | 71 | health_beauty |

---
