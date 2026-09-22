import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Truck,
  ShoppingBag,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Info
} from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/sales', label: 'Sales Analytics', icon: TrendingUp },
  { path: '/customers', label: 'Customer Intelligence', icon: Users },
  { path: '/delivery', label: 'Delivery Analytics', icon: Truck },
  { path: '/products-sellers', label: 'Product & Seller', icon: ShoppingBag },
  { path: '/risk-predictions', label: 'Risk & Predictions', icon: AlertTriangle },
  { path: '/recommendations', label: 'Recommendations', icon: Lightbulb },
  { path: '/data-quality', label: 'Data Quality', icon: CheckCircle2 },
  { path: '/about', label: 'About Project', icon: Info },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 flex-shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Analytics Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <RouterNavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </RouterNavLink>
          );
        })}
      </div>

      <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/50 text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-200">IBM SkillsBuild Capstone</p>
        <p>BharatCares AI Internship</p>
        <p className="text-[10px] text-slate-500 mt-1">Olist E-Commerce Dataset</p>
      </div>
    </aside>
  );
};
