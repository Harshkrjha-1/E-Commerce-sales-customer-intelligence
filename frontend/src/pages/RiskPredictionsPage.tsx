import React, { useEffect, useState } from 'react';
import { fetchRiskSummary, fetchModelMetadata, predictCustomerRisk } from '../services/api';
import { ModelMetadata, CustomerPredictResponse } from '../types';
import { ShieldAlert, Cpu, Calculator, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

export const RiskPredictionsPage: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [meta, setMeta] = useState<ModelMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  // Live Prediction Form State
  const [recency, setRecency] = useState<number>(120);
  const [frequency, setFrequency] = useState<number>(1);
  const [monetary, setMonetary] = useState<number>(150);
  const [reviewScore, setReviewScore] = useState<number>(2.5);
  const [deliveryDays, setDeliveryDays] = useState<number>(18);
  const [delayedCount, setDelayedCount] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>('boleto');

  const [prediction, setPrediction] = useState<CustomerPredictResponse | null>(null);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [sRes, mRes] = await Promise.all([
          fetchRiskSummary(),
          fetchModelMetadata()
        ]);
        setSummary(sRes);
        setMeta(mRes);
      } catch (err) {
        console.error('Failed to load risk prediction metadata:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setPredicting(true);
    try {
      const res = await predictCustomerRisk({
        recency_days: Number(recency),
        frequency: Number(frequency),
        monetary_value: Number(monetary),
        avg_order_value: Number(monetary) / Math.max(1, Number(frequency)),
        total_items: Number(frequency),
        review_score: Number(reviewScore),
        delivery_days: Number(deliveryDays),
        delayed_orders_count: Number(delayedCount),
        preferred_payment_method: paymentMethod
      });
      setPrediction(res);
    } catch (err) {
      console.error('Prediction failed:', err);
    } finally {
      setPredicting(false);
    }
  };

  if (loading || !meta || !summary) return <div className="p-8 text-center text-slate-500">Loading Predictive Risk Intelligence...</div>;

  const lrMetrics = meta.primary_model_metrics;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Predictive Customer Risk & Inactivity Modeling</h2>
        <p className="text-xs text-slate-500">Machine Learning model evaluating customer churn probability using historical snapshot features (No Target Leakage).</p>
      </div>

      {/* Model Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Model Architecture</span>
          <div className="text-lg font-bold text-slate-900 mt-1">Logistic Regression</div>
          <p className="text-xs text-slate-500 mt-1">Primary Interpretable Classifier</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Precision (Churn Class)</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{(lrMetrics.precision * 100).toFixed(1)}%</div>
          <p className="text-xs text-slate-500 mt-1">Positive Predictive Value</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">Recall (Churn Class)</span>
          <div className="text-2xl font-bold text-sky-600 mt-1">{(lrMetrics.recall * 100).toFixed(1)}%</div>
          <p className="text-xs text-slate-500 mt-1">Sensitivity / Detection Rate</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase">F1 Score</span>
          <div className="text-2xl font-bold text-indigo-600 mt-1">{(lrMetrics.f1 * 100).toFixed(1)}%</div>
          <p className="text-xs text-slate-500 mt-1">Harmonic Mean of Precision/Recall</p>
        </div>
      </div>

      {/* Interactive Customer Risk Predictor */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-4 border-b border-slate-100 pb-3">
          <Calculator className="w-5 h-5 text-sky-600" />
          <h3 className="text-base font-bold text-slate-900">Real-Time Interactive Customer Risk Calculator</h3>
        </div>

        <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Recency (Days since order)</label>
            <input
              type="number"
              value={recency}
              onChange={(e) => setRecency(Number(e.target.value))}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Frequency (Total Orders)</label>
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Monetary Spend (R$)</label>
            <input
              type="number"
              value={monetary}
              onChange={(e) => setMonetary(Number(e.target.value))}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Avg Review Score (1 - 5)</label>
            <input
              type="number"
              step="0.1"
              value={reviewScore}
              onChange={(e) => setReviewScore(Number(e.target.value))}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Delivery Lead Time (Days)</label>
            <input
              type="number"
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(Number(e.target.value))}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Delayed Orders Count</label>
            <input
              type="number"
              value={delayedCount}
              onChange={(e) => setDelayedCount(Number(e.target.value))}
              className="w-full p-2 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={predicting}
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow transition-colors flex items-center space-x-2"
            >
              <span>{predicting ? 'Calculating...' : 'Run Risk Inference'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Prediction Results Banner */}
        {prediction && (
          <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase">Inactivity Probability</span>
                <div className="text-2xl font-bold text-slate-900">{(prediction.inactivity_probability * 100).toFixed(1)}%</div>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                prediction.predicted_risk_level === 'High' ? 'bg-rose-100 text-rose-800' :
                prediction.predicted_risk_level === 'Medium' ? 'bg-amber-100 text-amber-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {prediction.predicted_risk_level} Risk Segment
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <span className="text-xs font-semibold text-slate-700">Recommended Prescriptive Action:</span>
              <p className="text-xs text-slate-800 font-medium mt-1">{prediction.recommended_action}</p>
            </div>
          </div>
        )}
      </div>

      {/* Feature Importance / Coefficients */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Model Feature Importance & Logistic Coefficients</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase">
              <tr>
                <th className="px-4 py-2">Feature Name</th>
                <th className="px-4 py-2 text-right">Coefficient Weight</th>
                <th className="px-4 py-2">Impact Direction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {meta.feature_coefficients.map((f, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 font-mono font-medium">{f.feature}</td>
                  <td className="px-4 py-2 text-right font-mono font-bold">{f.coefficient.toFixed(4)}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${f.coefficient > 0 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {f.coefficient > 0 ? 'Increases Churn Risk' : 'Reduces Churn Risk'}
                    </span>
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
