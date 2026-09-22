import React, { useEffect, useState } from 'react';
import { fetchDeliveryPerformance } from '../services/api';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const DeliveryPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchDeliveryPerformance();
        setData(res);
      } catch (err) {
        console.error('Failed to load delivery performance:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) return <div className="p-8 text-center text-slate-500">Loading Delivery Analytics...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Delivery Performance & Logistics Diagnostic</h2>
        <p className="text-xs text-slate-500">Analyze delivery lead times, estimated vs actual delivery dates, and delay rate correlation with review scores.</p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Average Actual Delivery Time</span>
          <div className="text-3xl font-bold text-slate-900 mt-2">{data.overall.avg_delivery_days} Days</div>
          <p className="text-xs text-slate-500 mt-1">From order purchase to customer receipt</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Average Estimated Lead Time</span>
          <div className="text-3xl font-bold text-slate-900 mt-2">{data.overall.avg_estimated_days} Days</div>
          <p className="text-xs text-slate-500 mt-1">Promised delivery SLA window</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Overall Delivery Delay Rate</span>
          <div className="text-3xl font-bold text-rose-600 mt-2">{(data.overall.delay_rate * 100).toFixed(1)}%</div>
          <p className="text-xs text-slate-500 mt-1">Percentage of orders exceeding estimated date</p>
        </div>
      </div>

      {/* State Delivery Latency Chart */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Delivery Latency & Delay Rate by State</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.by_state.slice(0, 15)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="state" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any, name: string) => [name === 'delay_rate' ? `${(v * 100).toFixed(1)}%` : `${v} Days`, name]} />
              <Legend />
              <Bar dataKey="avg_delivery_days" name="Avg Delivery Days" fill="#0284c7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
