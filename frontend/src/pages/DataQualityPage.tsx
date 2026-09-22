import React, { useEffect, useState } from 'react';
import { fetchDataQuality } from '../services/api';
import { ShieldCheck, Database, CheckCircle2, FileText } from 'lucide-react';

export const DataQualityPage: React.FC = () => {
  const [dq, setDq] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchDataQuality();
        setDq(res);
      } catch (err) {
        console.error('Failed to load data quality:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !dq) return <div className="p-8 text-center text-slate-500">Loading Data Quality Verification...</div>;

  const summary = dq.cleaning_summary || {};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Data Quality & Cleaning Audit</h2>
        <p className="text-xs text-slate-500">Transparent verification of raw dataset ingestion, deduplication, date validation, and clean row transformations.</p>
      </div>

      {/* Quality Score Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Verified Dataset Integrity</h3>
            <p className="text-xs text-slate-500">Zero synthetic fallback data. 100% computed from official Olist CSVs.</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-400 uppercase">Data Quality Score</span>
          <div className="text-3xl font-extrabold text-emerald-600">{dq.score} / 100</div>
        </div>
      </div>

      {/* Cleaning Audit Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
          <Database className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-900">Cleaning & Transformation Audit Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 uppercase">
              <tr>
                <th className="px-5 py-3">Table Name</th>
                <th className="px-4 py-3 text-right">Raw Rows</th>
                <th className="px-4 py-3 text-right">Clean Rows</th>
                <th className="px-4 py-3 text-right">Removed Rows</th>
                <th className="px-5 py-3">Cleaning Transformation Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {Object.entries(summary).map(([table, info]: [string, any], i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono font-bold text-slate-900">{table}</td>
                  <td className="px-4 py-3 text-right font-mono">{info.before_rows.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-emerald-700">{info.after_rows.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold text-rose-600">{info.removed_rows.toLocaleString()}</td>
                  <td className="px-5 py-3 text-slate-600 font-medium">{info.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
