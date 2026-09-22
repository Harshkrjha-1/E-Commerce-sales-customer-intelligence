import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, Users, Star, Truck, AlertCircle } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { SkeletonKPICard, SkeletonChart } from '../components/SkeletonLoader';
import { fetchKPIs, fetchMonthlySales, fetchCategoryPerformance, fetchRegionalPerformance } from '../services/api';
import { KPISummary, MonthlySales, CategoryPerformance, StatePerformance, GlobalFilterState } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface DashboardPageProps {
  filters: GlobalFilterState;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ filters }) => {
  const [kpis, setKpis] = useState<KPISummary | null>(null);
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>([]);
  const [categories, setCategories] = useState<CategoryPerformance[]>([]);
  const [regions, setRegions] = useState<StatePerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [kpiRes, monthlyRes, catRes, regRes] = await Promise.all([
          fetchKPIs(filters),
          fetchMonthlySales(),
          fetchCategoryPerformance(8),
          fetchRegionalPerformance()
        ]);
        setKpis(kpiRes);
        setMonthlySales(monthlyRes);
        setCategories(catRes);
        setRegions(regRes.slice(0, 10));
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filters]);

  if (loading || !kpis) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array(6).fill(0).map((_, i) => <SkeletonKPICard key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Executive Dashboard Summary</h2>
        <p className="text-xs text-slate-500">Real-time performance metrics computed strictly from the Brazilian Olist E-Commerce dataset.</p>
      </div>

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total GMV Revenue"
          value={`R$ ${(kpis.total_gmv / 1e6).toFixed(2)}M`}
          subtitle="Gross Merchandise Value"
          icon={DollarSign}
          badgeColor="bg-emerald-50 text-emerald-600"
          trend={`+${(kpis.mom_growth_rate * 100).toFixed(1)}% MoM`}
          trendType="positive"
        />
        <KPICard
          title="Total Orders"
          value={kpis.total_orders.toLocaleString()}
          subtitle="Delivered & Processed"
          icon={ShoppingCart}
          badgeColor="bg-sky-50 text-sky-600"
        />
        <KPICard
          title="Unique Customers"
          value={kpis.unique_customers.toLocaleString()}
          subtitle={`${(kpis.repeat_customer_rate * 100).toFixed(1)}% Repeat Buyers`}
          icon={Users}
          badgeColor="bg-indigo-50 text-indigo-600"
        />
        <KPICard
          title="Average Order Value"
          value={`R$ ${kpis.avg_order_value.toFixed(2)}`}
          subtitle="Per Completed Order"
          icon={DollarSign}
          badgeColor="bg-amber-50 text-amber-600"
        />
        <KPICard
          title="Avg Review Score"
          value={`${kpis.avg_review_score} / 5.0`}
          subtitle="Customer Feedback"
          icon={Star}
          badgeColor="bg-purple-50 text-purple-600"
          trend={kpis.avg_review_score >= 4.0 ? 'Strong' : 'Needs Improvement'}
          trendType={kpis.avg_review_score >= 4.0 ? 'positive' : 'negative'}
        />
        <KPICard
          title="Delivery Delay Rate"
          value={`${(kpis.delivery_delay_rate * 100).toFixed(1)}%`}
          subtitle={`Avg Lead: ${kpis.avg_delivery_days} days`}
          icon={AlertCircle}
          badgeColor="bg-rose-50 text-rose-600"
          trend={kpis.delivery_delay_rate > 0.08 ? 'High Delay' : 'Normal'}
          trendType={kpis.delivery_delay_rate > 0.08 ? 'negative' : 'positive'}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Monthly Revenue Trajectory (GMV in R$)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year_month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: any) => [`R$ ${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'GMV']} />
                <Line type="monotone" dataKey="gmv" stroke="#0284c7" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Order Volume */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Monthly Order Count</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year_month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val: any) => [val.toLocaleString(), 'Orders']} />
                <Bar dataKey="total_orders" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category & Regional Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Top Revenue Product Categories</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="category" width={140} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: any) => [`R$ ${Number(v).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="gmv" fill="#0284c7" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional GMV */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Top 10 Revenue Brazilian States</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regions}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="customer_state" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: any) => [`R$ ${Number(v).toLocaleString()}`, 'GMV']} />
                <Bar dataKey="gmv" fill="#0369a1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
