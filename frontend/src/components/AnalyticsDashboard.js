import React from 'react';
import { Activity, Users, CalendarX, TrendingUp } from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div>
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <p>Overview of historical appointment adherence and baseline metrics.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-label"><Users size={16} color="var(--primary)" /> Total Records</div>
          <div className="stat-value">110,527</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid var(--risk-high)' }}>
          <div className="stat-label"><CalendarX size={16} color="var(--risk-high)" /> Global No-Show Rate</div>
          <div className="stat-value">20.19%</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid var(--risk-low)' }}>
          <div className="stat-label"><Activity size={16} color="var(--risk-low)" /> Global Attendance</div>
          <div className="stat-value">79.81%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><TrendingUp size={16} color="var(--primary)" /> Top Model AUC</div>
          <div className="stat-value">0.854</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '20px' }}>No-Show Rate by Age Group</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            {[
              { label: '0-18', val: 22 },
              { label: '19-35', val: 24 },
              { label: '36-50', val: 19 },
              { label: '51-65', val: 16 },
              { label: '65+', val: 15 }
            ].map(col => (
              <div key={col.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600' }}>{col.val}%</span>
                <div style={{ width: '100%', backgroundColor: 'var(--primary)', height: `${col.val * 5}px`, borderRadius: '4px 4px 0 0', opacity: col.val > 20 ? 1 : 0.6 }}></div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '20px' }}>No-Show Rate by Day of Week</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            {[
              { label: 'Mon', val: 20.6 },
              { label: 'Tue', val: 20.0 },
              { label: 'Wed', val: 19.6 },
              { label: 'Thu', val: 19.3 },
              { label: 'Fri', val: 21.2 },
              { label: 'Sat', val: 23.0 }
            ].map(col => (
              <div key={col.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600' }}>{col.val}%</span>
                <div style={{ width: '100%', backgroundColor: '#6366f1', height: `${col.val * 5}px`, borderRadius: '4px 4px 0 0', opacity: col.val > 21 ? 1 : 0.6 }}></div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{col.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}