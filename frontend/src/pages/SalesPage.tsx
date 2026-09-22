import React, { useEffect, useState } from 'react';
import { fetchMonthlySales, fetchCategoryPerformance } from '../services/api';
import { MonthlySales, CategoryPerformance } from '../types';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const SalesPage: React.FC = () => {
  const [monthly, setMonthly] = useState<MonthlySales[]>([]);
  const [categories, setCategories] = useState<CategoryPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [mRes, cRes] = await Promise.all([
          fetchMonthlySales(),
          fetchCategoryPerformance(15)
        ]);
        setMonthly(mRes);
        setCategories(cRes);
      } catch (err) {
        console.error('Error fetching sales page data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Sales Analytics...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Sales & Revenue Analytics</h2>
        <p className="text-xs text-slate-500">Detailed commercial breakdown of product sales revenue, freight fees, and MoM growth rates.</p>
      </div>

      {/* Revenue Breakdown Area Chart */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Product Revenue vs Freight Revenue (Monthly R$)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="year_month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`R$ ${Number(v).toLocaleString('en-US', { minimumFractionDigits: 2 })}`]} />
              <Legend />
              <Area type="monotone" dataKey="items_revenue" name="Product Items Revenue" stackId="1" stroke="#0284c7" fill="#0284c7" fillOpacity={0.8} />
              <Area type="monotone" dataKey="freight_revenue" name="Freight Cost/Revenue" stackId="1" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Performance Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Product Category Revenue Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Category (English)</th>
                <th className="px-5 py-3 text-right">Total Orders</th>
                <th className="px-5 py-3 text-right">Items Sold</th>
                <th className="px-5 py-3 text-right">Total GMV (R$)</th>
                <th className="px-5 py-3 text-right">Avg Review</th>
                <th className="px-5 py-3 text-right">Avg Delivery (Days)</th>
                <th className="px-5 py-3 text-right">Delay Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {categories.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{c.category}</td>
                  <td className="px-5 py-3 text-right font-mono">{c.total_orders.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right font-mono">{c.total_items.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right font-semibold text-sky-700 font-mono">R$ {c.gmv.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="px-5 py-3 text-right font-mono">{c.review_score ? c.review_score.toFixed(2) : 'N/A'}</td>
                  <td className="px-5 py-3 text-right font-mono">{c.delivery_days ? c.delivery_days.toFixed(1) : 'N/A'}</td>
                  <td className="px-5 py-3 text-right font-mono font-medium text-rose-600">
                    {c.delay_rate ? `${(c.delay_rate * 100).toFixed(1)}%` : '0%'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
