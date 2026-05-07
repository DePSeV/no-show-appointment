import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FeatureAnalysis() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('https://no-show-appointment.onrender.com/api/features');
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching dynamic feature importances");
      }
    };
    fetchFeatures();
  }, []);

  if (features.length === 0) return <div style={{ padding: '40px' }}>Extracting live feature importances from XGBoost binary...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Feature Analysis</h1>
        <p>Dynamic extraction of mathematical weights directly from the active XGBoost predictor.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '24px' }}>Live Mathematical Importance</h3>
          {features.map(f => (
            <div className="bar-container" key={f.name}>
              <div className="bar-label" style={{ fontSize: '12px' }}>{f.name.replace(/_/g, ' ')}</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${Math.max(f.impact, 5)}%` }}>{f.impact}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}