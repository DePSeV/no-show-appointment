import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ModelComparison() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('https://no-show-appointment.onrender.com/api/models');
        setModels(response.data);
      } catch (error) {
        console.error("Error evaluating models");
      }
    };
    fetchModels();
  }, []);

  if (models.length === 0) return <div style={{ padding: '40px' }}>Dynamically evaluating separated .pkl files...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Model Comparison</h1>
        <p>Live dynamic evaluation of separated backend models against the test dataset.</p>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '20px' }}>Live Evaluation Metrics</h3>
        <table className="table-wrapper">
          <thead>
            <tr>
              <th>Model Architecture</th>
              <th>Accuracy</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1-Score</th>
              <th>AUC-ROC</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, idx) => (
              <tr key={idx} style={{ backgroundColor: idx === 0 ? 'rgba(14, 165, 233, 0.05)' : 'transparent' }}>
                <td style={{ fontWeight: idx === 0 ? '600' : '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: model.color }}></div>
                  {model.name}
                </td>
                <td>{model.metrics.accuracy}%</td>
                <td>{model.metrics.precision}%</td>
                <td style={{ fontWeight: idx === 0 ? '600' : '400' }}>{model.metrics.recall}%</td>
                <td>{model.metrics.f1}%</td>
                <td style={{ fontWeight: '700', color: model.color }}>{model.metrics.auc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}