import React from 'react';
import { Filter, RefreshCw, BarChart2, ShieldCheck } from 'lucide-react';
import { GlobalFilterState } from '../types';

interface NavbarProps {
  filters: GlobalFilterState;
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilterState>>;
  onRefresh: () => void;
  loading: boolean;
}

const BRAZIL_STATES = [
  'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'DF', 'GO', 'ES',
  'PE', 'CE', 'PA', 'MT', 'MS', 'MA', 'PB', 'RN', 'AM', 'AL',
  'SE', 'PI', 'RO', 'TO', 'AC', 'AP', 'RR'
];

export const Navbar: React.FC<NavbarProps> = ({ filters, setFilters, onRefresh, loading }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-sky-600 text-white rounded-lg shadow-sm">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-none">Olist Analytics Intelligence</h1>
            <p className="text-xs text-slate-500 mt-0.5">Brazilian E-Commerce Enterprise Platform</p>
          </div>
        </div>

        {/* Global Filters & Controls */}
        <div className="flex items-center space-x-3">
          
          {/* State Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filters.state || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value || undefined }))}
              className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="">All States (Brazil)</option>
              {BRAZIL_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-600' : ''}`} />
          </button>

          {/* Live Backend Connection Indicator */}
          <div className="flex items-center space-x-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">Real Olist Dataset</span>
          </div>
        </div>

      </div>
    </header>
  );
};
