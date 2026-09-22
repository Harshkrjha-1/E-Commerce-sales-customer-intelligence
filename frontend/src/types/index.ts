export interface KPISummary {
  total_gmv: number;
  total_orders: number;
  unique_customers: number;
  avg_order_value: number;
  total_items_sold: number;
  avg_review_score: number;
  avg_delivery_days: number;
  delivery_delay_rate: number;
  repeat_customer_rate: number;
  cancelled_order_rate: number;
  mom_growth_rate: number;
}

export interface MonthlySales {
  year_month: string;
  total_orders: number;
  unique_customers: number;
  gmv: number;
  items_revenue: number;
  freight_revenue: number;
  total_items: number;
  review_score: number | null;
  delivery_days: number | null;
  delay_rate: number | null;
  aov: number;
  mom_growth: number | null;
}

export interface CategoryPerformance {
  category: string;
  total_orders: number;
  gmv: number;
  items_revenue: number;
  total_items: number;
  review_score: number | null;
  delivery_days: number | null;
  delay_rate: number | null;
}

export interface StatePerformance {
  customer_state: string;
  total_orders: number;
  unique_customers: number;
  gmv: number;
  freight_revenue: number;
  delivery_days: number | null;
  review_score: number | null;
  delay_rate: number | null;
}

export interface SellerPerformance {
  seller_id: string;
  total_orders: number;
  gmv: number;
  review_score: number | null;
  delivery_days: number | null;
  delay_rate: number | null;
  seller_city: string | null;
  seller_state: string | null;
}

export interface CustomerRFM {
  customer_unique_id: string;
  recency_days: number;
  frequency: number;
  monetary_value: number;
  avg_order_value: number;
  total_items: number;
  review_score: number;
  delivery_days: number;
  delayed_orders_count: number;
  preferred_payment_method: string;
  customer_state: string;
  r_score: number;
  f_score: number;
  m_score: number;
  rfm_segment: string;
  churn_risk_level: string;
}

export interface CustomerPredictRequest {
  recency_days: number;
  frequency: number;
  monetary_value: number;
  avg_order_value: number;
  total_items: number;
  review_score: number;
  delivery_days: number;
  delayed_orders_count: number;
  preferred_payment_method: string;
}

export interface CustomerPredictResponse {
  predicted_risk_level: string;
  inactivity_probability: number;
  churn_risk_score: number;
  top_risk_factors: { factor: string; detail: string }[];
  recommended_action: string;
}

export interface ModelMetadata {
  model_name: string;
  training_period: string;
  target_definition: string;
  primary_model_metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1: number;
    roc_auc: number;
    confusion_matrix: number[][];
  };
  comparison_model_metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1: number;
    roc_auc: number;
    confusion_matrix: number[][];
  };
  feature_list: string[];
  feature_coefficients: { feature: string; coefficient: number }[];
  limitations: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  category: string;
  priority: string;
  issue: string;
  evidence: string;
  target_segment: string;
  suggested_action: string;
  expected_business_objective: string;
  reason: string;
}

export interface GlobalFilterState {
  state?: string;
  category?: string;
  dateRange?: string;
}
