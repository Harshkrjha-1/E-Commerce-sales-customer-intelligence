/// <reference types="vite/client" />
import {
  KPISummary,
  MonthlySales,
  CategoryPerformance,
  StatePerformance,
  SellerPerformance,
  CustomerRFM,
  CustomerPredictRequest,
  CustomerPredictResponse,
  ModelMetadata,
  Recommendation,
  GlobalFilterState
} from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchKPIs(filters?: GlobalFilterState): Promise<KPISummary> {
  const params = new URLSearchParams();
  if (filters?.state) params.append('state', filters.state);
  if (filters?.category) params.append('category', filters.category);
  
  const res = await fetch(`${BASE_URL}/kpis?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch KPI summary');
  return res.json();
}

export async function fetchMonthlySales(): Promise<MonthlySales[]> {
  const res = await fetch(`${BASE_URL}/sales/monthly`);
  if (!res.ok) throw new Error('Failed to fetch monthly sales');
  return res.json();
}

export async function fetchCategoryPerformance(limit = 15): Promise<CategoryPerformance[]> {
  const res = await fetch(`${BASE_URL}/sales/categories?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch category performance');
  return res.json();
}

export async function fetchRegionalPerformance(): Promise<StatePerformance[]> {
  const res = await fetch(`${BASE_URL}/sales/regions`);
  if (!res.ok) throw new Error('Failed to fetch regional performance');
  return res.json();
}

export async function fetchTopSellers(limit = 20): Promise<SellerPerformance[]> {
  const res = await fetch(`${BASE_URL}/sellers/top?limit=${limit}`);
  if (!res.ok) throw new Error('Failed to fetch top sellers');
  return res.json();
}

export async function fetchCustomerSegments(): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/customers/segments`);
  if (!res.ok) throw new Error('Failed to fetch customer segments');
  return res.json();
}

export async function fetchCustomersRFM(segment?: string, riskLevel?: string, limit = 50, offset = 0): Promise<CustomerRFM[]> {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
  if (segment) params.append('segment', segment);
  if (riskLevel) params.append('risk_level', riskLevel);

  const res = await fetch(`${BASE_URL}/customers/rfm?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch customer RFM table');
  return res.json();
}

export async function fetchDeliveryPerformance(): Promise<any> {
  const res = await fetch(`${BASE_URL}/delivery/performance`);
  if (!res.ok) throw new Error('Failed to fetch delivery performance');
  return res.json();
}

export async function fetchRiskSummary(): Promise<any> {
  const res = await fetch(`${BASE_URL}/risk/summary`);
  if (!res.ok) throw new Error('Failed to fetch risk summary');
  return res.json();
}

export async function predictCustomerRisk(req: CustomerPredictRequest): Promise<CustomerPredictResponse> {
  const res = await fetch(`${BASE_URL}/predict/customer-risk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Failed to execute risk prediction');
  return res.json();
}

export async function fetchRecommendations(): Promise<Recommendation[]> {
  const res = await fetch(`${BASE_URL}/recommendations`);
  if (!res.ok) throw new Error('Failed to fetch recommendations');
  return res.json();
}

export async function fetchModelMetadata(): Promise<ModelMetadata> {
  const res = await fetch(`${BASE_URL}/metadata`);
  if (!res.ok) throw new Error('Failed to fetch model metadata');
  return res.json();
}

export async function fetchDataQuality(): Promise<any> {
  const res = await fetch(`${BASE_URL}/data-quality`);
  if (!res.ok) throw new Error('Failed to fetch data quality report');
  return res.json();
}
