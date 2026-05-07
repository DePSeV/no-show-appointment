import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ModelComparison from './components/ModelComparison';
import FeatureAnalysis from './components/FeatureAnalysis';
import LivePredictor from './components/LivePredictor';

export default function App() {
  const [activeTab, setActiveTab] = useState('predictor');

  return (
    <div className="layout-wrapper">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        {activeTab === 'dashboard' && <AnalyticsDashboard />}
        {activeTab === 'comparison' && <ModelComparison />}
        {activeTab === 'features' && <FeatureAnalysis />}
        {activeTab === 'predictor' && <LivePredictor />}
      </div>
    </div>
  );
}