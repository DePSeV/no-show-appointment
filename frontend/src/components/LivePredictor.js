import React, { useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

export default function LivePredictor() {
  const [formData, setFormData] = useState({
    age: 35,
    lead_time: 14,
    hour_booked: 10,
    gender: 'Female',
    day_of_appointment: 'Wednesday',
    sms_sent: false,
    hypertension: false,
    diabetes: false
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAssessment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://no-show-appointment.onrender.com/predict', formData);
      setResult(response.data);
    } catch (err) {
      setError('Connection to prediction engine failed.');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Live No-Show Predictor</h1>
        <p>Enter appointment details to generate a real-time probability utilizing the trained XGBoost engine.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <form onSubmit={handleAssessment}>
            <div className="grid-2" style={{ gap: '16px' }}>
              <div className="form-group">
                <label>Patient Age</label>
                <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Lead Time (Days)</label>
                <input type="number" name="lead_time" className="form-control" value={formData.lead_time} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid-2" style={{ gap: '16px' }}>
              <div className="form-group">
                <label>Scheduled Hour (0-23)</label>
                <input type="number" name="hour_booked" className="form-control" value={formData.hour_booked} onChange={handleChange} max="23" required />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" className="form-control" value={formData.gender} onChange={handleChange}>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Day of Appointment</label>
              <select name="day_of_appointment" className="form-control" value={formData.day_of_appointment} onChange={handleChange}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>

            <div className="checkbox-group">
              <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px' }}>
                <input type="checkbox" name="sms_sent" checked={formData.sms_sent} onChange={handleChange} /> SMS Reminder Sent
              </label>
              <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px' }}>
                <input type="checkbox" name="hypertension" checked={formData.hypertension} onChange={handleChange} /> Hypertension
              </label>
              <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px' }}>
                <input type="checkbox" name="diabetes" checked={formData.diabetes} onChange={handleChange} /> Diabetes
              </label>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              <Zap size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '6px' }} />
              {loading ? 'Processing...' : 'Generate Prediction'}
            </button>
          </form>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          {error && <div style={{ color: 'var(--risk-high)' }}>{error}</div>}
          {!result && !error && !loading && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', margin: 'auto' }}>
              <Clock size={48} opacity={0.5} style={{ marginBottom: '16px' }} />
              <h3>Awaiting Input</h3>
            </div>
          )}
          {loading && <div style={{ textAlign: 'center', margin: 'auto' }}>Analyzing multidimensional vectors...</div>}
          
          {result && (
            <>
              <div style={{
                backgroundColor: result.risk_category === 'High Risk' ? 'var(--risk-high-bg)' : result.risk_category === 'Medium Risk' ? 'var(--risk-med-bg)' : 'var(--risk-low-bg)',
                border: `1px solid ${result.risk_category === 'High Risk' ? 'var(--risk-high)' : result.risk_category === 'Medium Risk' ? 'var(--risk-med)' : 'var(--risk-low)'}`,
                borderRadius: '8px', padding: '30px', textAlign: 'center', marginBottom: '24px'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '12px' }}>NO-SHOW PROBABILITY</div>
                <div style={{ fontSize: '56px', fontWeight: '700', color: result.risk_category === 'High Risk' ? 'var(--risk-high)' : result.risk_category === 'Medium Risk' ? 'var(--risk-med)' : 'var(--risk-low)', lineHeight: '1' }}>
                  {(result.risk_probability * 100).toFixed(1)}%
                </div>
                <div style={{ marginTop: '16px', display: 'inline-block', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', backgroundColor: 'white' }}>
                  {result.risk_category}
                </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>Recommended Action</h3>
                <div style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '8px', fontSize: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  {result.risk_category === 'High Risk' ? <AlertCircle color="var(--risk-high)" /> : <CheckCircle color="var(--risk-low)" />}
                  <span style={{ lineHeight: '1.5' }}>{result.recommended_action}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}