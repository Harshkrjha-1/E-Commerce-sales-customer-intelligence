import React, { useEffect, useState } from 'react';
import { fetchTopSellers } from '../services/api';
import { SellerPerformance } from '../types';

export const ProductsSellersPage: React.FC = () => {
  const [sellers, setSellers] = useState<SellerPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSellers() {
      try {
        const res = await fetchTopSellers(25);
        setSellers(res);
      } catch (err) {
        console.error('Failed to load top sellers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSellers();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Product & Seller Analytics...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Product & Seller Performance Matrix</h2>
        <p className="text-xs text-slate-500">Evaluate merchant order fulfillment volumes, revenue contributions, and quality SLA compliance.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-sm font-semibold text-slate-900">Top Performing Marketplace Sellers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Seller ID</th>
                <th className="px-4 py-3">City / State</th>
                <th className="px-4 py-3 text-right">Total Orders</th>
                <th className="px-4 py-3 text-right">GMV (R$)</th>
                <th className="px-4 py-3 text-right">Avg Review</th>
                <th className="px-4 py-3 text-right">Avg Delivery (Days)</th>
                <th className="px-4 py-3 text-right">Delay Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {sellers.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono font-medium text-slate-900">{s.seller_id.slice(0, 16)}...</td>
                  <td className="px-4 py-3">{s.seller_city || 'N/A'}, {s.seller_state || 'N/A'}</td>
                  <td className="px-4 py-3 text-right font-mono">{s.total_orders.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-sky-700">R$ {s.gmv.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-3 text-right font-mono">{s.review_score ? s.review_score.toFixed(2) : 'N/A'}</td>
                  <td className="px-4 py-3 text-right font-mono">{s.delivery_days ? s.delivery_days.toFixed(1) : 'N/A'}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-rose-600">
                    {s.delay_rate ? `${(s.delay_rate * 100).toFixed(1)}%` : '0%'}
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
