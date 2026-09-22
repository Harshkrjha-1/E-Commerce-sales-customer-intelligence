import React from 'react';
import { BookOpen, Layers, Code, Database, Cpu, ExternalLink, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">About the Project & Technical Methodology</h2>
        <p className="text-xs text-slate-500">Academic & Internship Capstone Project for IBM SkillsBuild / BharatCares Data Analytics with AI Program.</p>
      </div>

      {/* Capstone Badge */}
      <div className="bg-gradient-to-r from-sky-900 to-slate-900 text-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">Academic Internship Capstone</span>
          <h3 className="text-lg font-bold mt-1">E-Commerce Sales, Customer Retention & Delivery Performance Analytics</h3>
          <p className="text-xs text-slate-300 mt-1">Full-Stack Data Science & Predictive AI Platform powered by official Olist Brazilian E-Commerce data.</p>
        </div>
        <div className="p-3 bg-sky-600/30 rounded-xl border border-sky-400/30">
          <Award className="w-8 h-8 text-sky-300" />
        </div>
      </div>

      {/* 4 Analytics Levels Grid */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">The Four Analytics Levels Demonstrated</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-sky-700 block text-sm mb-1">1. DESCRIPTIVE ("What happened?")</span>
            <p className="text-slate-700">Calculated overall GMV (R$ 16M+), 99k+ orders, monthly sales trajectories, top product categories, regional state performance, and average review scores.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-indigo-700 block text-sm mb-1">2. DIAGNOSTIC ("Why did it happen?")</span>
            <p className="text-slate-700">Investigated causal relationships between delivery lead times and customer review ratings, discovering review scores plunge from 4.3/5 to 2.1/5 on delayed orders.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-purple-700 block text-sm mb-1">3. PREDICTIVE ("What is likely to happen?")</span>
            <p className="text-slate-700">Trained Logistic Regression customer risk model using historical snapshot methodology (snapshot date 2018-03-01) to predict 180-day customer inactivity without leakage.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-amber-700 block text-sm mb-1">4. PRESCRIPTIVE ("What should the business do?")</span>
            <p className="text-slate-700">Built dynamic business recommendation engine prioritizing customer win-back retention, regional logistics SLA enforcement, and seller quality governance.</p>
          </div>
        </div>
      </div>

      {/* Dataset & Licensing Source */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Dataset Attribution & Licensing</h3>
        <p className="text-xs text-slate-700 leading-relaxed">
          The dataset used in this application is the official <strong>Brazilian E-Commerce Public Dataset by Olist</strong>, containing anonymized transaction records for ~100,000 orders placed from 2016 to 2018 across multiple marketplaces in Brazil.
        </p>
        <a
          href="https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-sky-600 hover:text-sky-800"
        >
          <span>View Dataset on Kaggle</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
