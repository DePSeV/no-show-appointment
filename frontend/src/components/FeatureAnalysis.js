import React from 'react';
import { Calendar, MessageSquare, Clock, AlertTriangle } from 'lucide-react';

export default function FeatureAnalysis() {
  const features = [
    { name: 'Lead Time (Days)', impact: 38.5 },
    { name: 'Patient Age', impact: 22.1 },
    { name: 'Scheduled Hour', impact: 15.4 },
    { name: 'SMS Received', impact: 11.2 },
    { name: 'Day of Week', impact: 7.6 },
    { name: 'Hypertension', impact: 3.1 },
    { name: 'Diabetes', impact: 2.1 }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Feature Analysis</h1>
        <p>Global SHAP interpretation mapping the driving variables behind no-show behavior.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '24px' }}>Feature Importance Ranking (XGBoost)</h3>
          {features.map(f => (
            <div className="bar-container" key={f.name}>
              <div className="bar-label">{f.name}</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${f.impact}%` }}>{f.impact}%</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '24px' }}>Key Analytical Findings</h3>
          
          <div className="insight-box" style={{ borderLeft: '4px solid #f59e0b' }}>
            <div className="insight-icon"><Calendar size={20} color="#f59e0b" /></div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>The Lead Time Degradation</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Lead time is the dominant predictor. Appointments booked &gt;21 days in advance exhibit exponentially higher default rates compared to same-week bookings.</div>
            </div>
          </div>

          <div className="insight-box" style={{ borderLeft: '4px solid #10b981' }}>
            <div className="insight-icon"><MessageSquare size={20} color="#10b981" /></div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>SMS Efficacy</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Successful delivery of an SMS reminder consistently down-ranks no-show probability across all age demographics.</div>
            </div>
          </div>

          <div className="insight-box" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div className="insight-icon"><AlertTriangle size={20} color="var(--primary)" /></div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Chronic Condition Adherence</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Patients flagged with Hypertension or Diabetes show naturally lower risk profiles, indicating health necessity overrides logistical friction.</div>
            </div>
          </div>

          <div className="insight-box" style={{ borderLeft: '4px solid #6366f1' }}>
            <div className="insight-icon"><Clock size={20} color="#6366f1" /></div>
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>Non-Linear Age Distribution</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Age does not scale linearly. High risk peaks in late teens/early twenties, stabilizes in middle age, and fluctuates for seniors based on external factors.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}