import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { SalesPage } from './pages/SalesPage';
import { CustomerPage } from './pages/CustomerPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { ProductsSellersPage } from './pages/ProductsSellersPage';
import { RiskPredictionsPage } from './pages/RiskPredictionsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { DataQualityPage } from './pages/DataQualityPage';
import { AboutPage } from './pages/AboutPage';
import { GlobalFilterState } from './types';

export const App: React.FC = () => {
  const [filters, setFilters] = useState<GlobalFilterState>({});
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar
          filters={filters}
          setFilters={setFilters}
          onRefresh={handleRefresh}
          loading={false}
        />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 max-w-7xl mx-auto w-full overflow-y-auto">
            <Routes key={refreshKey}>
              <Route path="/" element={<DashboardPage filters={filters} />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/customers" element={<CustomerPage />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/products-sellers" element={<ProductsSellersPage />} />
              <Route path="/risk-predictions" element={<RiskPredictionsPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/data-quality" element={<DataQualityPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
