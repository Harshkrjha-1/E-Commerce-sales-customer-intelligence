import React from 'react';

export const SkeletonKPICard: React.FC = () => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm animate-pulse space-y-3">
    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
    <div className="h-8 bg-slate-200 rounded w-3/4"></div>
    <div className="h-3 bg-slate-200 rounded w-1/3"></div>
  </div>
);

export const SkeletonChart: React.FC = () => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse space-y-4">
    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
    <div className="h-64 bg-slate-100 rounded"></div>
  </div>
);
