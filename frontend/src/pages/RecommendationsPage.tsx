import React, { useEffect, useState } from 'react';
import { fetchRecommendations } from '../services/api';
import { Recommendation } from '../types';
import { Lightbulb, Target, AlertTriangle, CheckCircle, Award } from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecs() {
      try {
        const res = await fetchRecommendations();
        setRecs(res);
      } catch (err) {
        console.error('Failed to load recommendations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRecs();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Prescriptive Recommendations...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Executive Prescriptive Recommendation Engine</h2>
        <p className="text-xs text-slate-500">Data-driven business recommendations dynamically generated from real calculated metrics and predictive risk signals.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {recs.map((rec) => (
          <div key={rec.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{rec.id} • {rec.category}</span>
                  <h3 className="text-base font-bold text-slate-900">{rec.title}</h3>
                </div>
              </div>
              <span className={`self-start md:self-auto px-3 py-1 rounded-full text-xs font-bold ${
                rec.priority === 'High' ? 'bg-rose-100 text-rose-800' :
                rec.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                'bg-sky-100 text-sky-800'
              }`}>
                {rec.priority} Priority
              </span>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>IDENTIFIED BUSINESS ISSUE</span>
                </div>
                <p className="text-slate-700">{rec.issue}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                  <Target className="w-4 h-4 text-sky-500" />
                  <span>CALCULATED DATASET EVIDENCE</span>
                </div>
                <p className="text-slate-700">{rec.evidence}</p>
              </div>

              <div className="p-3 bg-sky-50/50 rounded-lg border border-sky-100 space-y-1 md:col-span-2">
                <div className="flex items-center space-x-1.5 font-bold text-sky-900">
                  <CheckCircle className="w-4 h-4 text-sky-600" />
                  <span>SUGGESTED ACTION PLAN</span>
                </div>
                <p className="text-sky-950 font-medium">{rec.suggested_action}</p>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-1 md:col-span-2">
                <div className="flex items-center space-x-1.5 font-bold text-emerald-900">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>EXPECTED BUSINESS OBJECTIVE & RATIONALE</span>
                </div>
                <p className="text-emerald-950 font-medium">{rec.expected_business_objective} — {rec.reason}</p>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
