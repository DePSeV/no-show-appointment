import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard({ result, error, loading }) {
  if (loading) {
    return (
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p style={{ color: 'var(--text-muted)' }}>Analyzing predictive variables...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ backgroundColor: 'var(--risk-high-bg)', borderColor: 'var(--risk-high)' }}>
        <h3 style={{ color: 'var(--risk-high)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={20} /> System Error
        </h3>
        <p style={{ marginTop: '10px', color: 'var(--text-main)' }}>{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%', color: 'var(--text-muted)' }}>
        <Clock size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
        <h3>Awaiting Data</h3>
        <p style={{ marginTop: '8px' }}>Input appointment metrics on the left to generate a risk profile.</p>
      </div>
    );
  }

  // Determine styling based on risk
  let riskColor = 'var(--risk-low)';
  let riskBg = 'var(--risk-low-bg)';
  let Icon = CheckCircle;
  let actionText = "Standard protocol. No immediate intervention required.";

  if (result.risk_level === 'High') {
    riskColor = 'var(--risk-high)';
    riskBg = 'var(--risk-high-bg)';
    Icon = AlertCircle;
    actionText = "Urgent: Initiate manual call. Consider overbooking this timeslot.";
  } else if (result.risk_level === 'Medium') {
    riskColor = 'var(--risk-med)';
    riskBg = 'var(--risk-med-bg)';
    Icon = Clock;
    actionText = "Monitor: Ensure automated reminders are queued. Flag for review.";
  }

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Assessment Results</h2>
      
      <div style={{ 
        backgroundColor: riskBg, 
        border: `1px solid ${riskColor}`,
        borderRadius: '8px', 
        padding: '30px', 
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '48px', fontWeight: '700', color: riskColor, lineHeight: '1' }}>
          {result.probability}%
        </div>
        <div style={{ color: riskColor, fontWeight: '600', marginTop: '10px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Icon size={20} /> {result.risk_level} Risk
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: '8px' }}>
          Recommended Operational Action
        </h3>
        <p style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '6px', fontSize: '15px', lineHeight: '1.5' }}>
          {actionText}
        </p>
      </div>
    </div>
  );
}