import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Users, CalendarX, TrendingUp } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://no-show-appointment.onrender.com/api/stats');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dynamic stats");
      }
    };
    fetchStats();
  }, []);

  if (!data) return <div style={{ padding: '40px' }}>Calculating dynamic dataset metrics...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <p>Live calculation of dataset adherence and baseline metrics.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-label"><Users size={16} color="var(--primary)" /> Test Records Processed</div>
          <div className="stat-value">{data.total_records}</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid var(--risk-high)' }}>
          <div className="stat-label"><CalendarX size={16} color="var(--risk-high)" /> Calculated No-Show Rate</div>
          <div className="stat-value">{data.global_noshow}%</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid var(--risk-low)' }}>
          <div className="stat-label"><Activity size={16} color="var(--risk-low)" /> Calculated Attendance</div>
          <div className="stat-value">{data.global_attendance}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label"><TrendingUp size={16} color="var(--primary)" /> Top Model AUC</div>
          <div className="stat-value">Dynamic</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '20px' }}>No-Show Rate by Age Group</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            {Object.entries(data.age_distribution).map(([label, val]) => (
              <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '600' }}>{val.toFixed(1)}%</span>
                <div style={{ width: '100%', backgroundColor: 'var(--primary)', height: `${val * 5}px`, borderRadius: '4px 4px 0 0' }}></div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}