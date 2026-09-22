import React, { useEffect, useState } from 'react';
import { fetchCustomerSegments, fetchCustomersRFM } from '../services/api';
import { CustomerRFM } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export const CustomerPage: React.FC = () => {
  const [segments, setSegments] = useState<any[]>([]);
  const [customers, setCustomers] = useState<CustomerRFM[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<string>('');
  const [selectedRisk, setSelectedRisk] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 25;

  useEffect(() => {
    async function loadSegments() {
      try {
        const segRes = await fetchCustomerSegments();
        setSegments(segRes);
      } catch (err) {
        console.error('Failed to load segments:', err);
      }
    }
    loadSegments();
  }, []);

  useEffect(() => {
    async function loadCustomers() {
      setLoading(true);
      try {
        const custRes = await fetchCustomersRFM(
          selectedSegment || undefined,
          selectedRisk || undefined,
          PAGE_SIZE,
          page * PAGE_SIZE
        );
        setCustomers(custRes);
      } catch (err) {
        console.error('Failed to load customer list:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, [selectedSegment, selectedRisk, page]);

  const filteredCustomers = customers.filter(c =>
    c.customer_unique_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.customer_state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Customer Intelligence & RFM Segmentation</h2>
        <p className="text-xs text-slate-500">Recency, Frequency, and Monetary (RFM) analysis with behavioral segment classification.</p>
      </div>

      {/* RFM Segment Bar Chart */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Customer Segment Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segments}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="segment" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => [v.toLocaleString(), 'Customers']} />
              <Bar dataKey="customer_count" fill="#0284c7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters & Table Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-50">
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search Customer ID or State..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <select
              value={selectedSegment}
              onChange={(e) => { setSelectedSegment(e.target.value); setPage(0); }}
              className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-slate-700"
            >
              <option value="">All RFM Segments</option>
              <option value="Champions">Champions</option>
              <option value="Loyal Customers">Loyal Customers</option>
              <option value="Potential Loyalists">Potential Loyalists</option>
              <option value="At Risk">At Risk</option>
              <option value="High Value At Risk">High Value At Risk</option>
              <option value="New Customers">New Customers</option>
              <option value="Low Engagement">Low Engagement</option>
            </select>

            <select
              value={selectedRisk}
              onChange={(e) => { setSelectedRisk(e.target.value); setPage(0); }}
              className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-slate-700"
            >
              <option value="">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>

        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Customer ID</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3 text-right">Orders</th>
                <th className="px-4 py-3 text-right">Monetary (R$)</th>
                <th className="px-4 py-3 text-right">Recency (Days)</th>
                <th className="px-4 py-3">RFM Segment</th>
                <th className="px-4 py-3 text-center">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">Loading customer dataset...</td>
                </tr>
              ) : filteredCustomers.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono font-medium text-slate-900">{c.customer_unique_id.slice(0, 16)}...</td>
                  <td className="px-4 py-3 font-semibold">{c.customer_state}</td>
                  <td className="px-4 py-3 text-right font-mono">{c.frequency}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-sky-700">R$ {c.monetary_value.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right font-mono">{c.recency_days}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                      {c.rfm_segment}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.churn_risk_level === 'High' ? 'bg-rose-100 text-rose-800' :
                      c.churn_risk_level === 'Medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {c.churn_risk_level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Showing page {page + 1} ({PAGE_SIZE} records per page)</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1 rounded border border-slate-300 hover:bg-slate-100 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={customers.length < PAGE_SIZE}
              className="p-1 rounded border border-slate-300 hover:bg-slate-100 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
