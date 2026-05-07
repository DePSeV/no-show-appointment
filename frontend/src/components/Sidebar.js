import React from 'react';
import { LayoutDashboard, GitCompare, BarChart3, Activity } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
    { id: 'comparison', label: 'Model Comparison', icon: GitCompare },
    { id: 'features', label: 'Feature Analysis', icon: BarChart3 },
    { id: 'predictor', label: 'Live Predictor', icon: Activity }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Activity color="#0ea5e9" size={28} />
        <span>NoShowML</span>
      </div>
      <div className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}