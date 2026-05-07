import React from 'react';

export default function ModelComparison() {
  const models = [
    { name: 'XGBoost Classifier (Extended)', acc: '82.4%', prec: '75.1%', rec: '78.2%', f1: '76.6%', auc: '0.854', color: 'var(--primary)' },
    { name: 'Logistic Regression (Extended + SMOTE)', acc: '78.1%', prec: '71.2%', rec: '74.5%', f1: '72.8%', auc: '0.781', color: '#10b981' },
    { name: 'Logistic Regression (Base Features)', acc: '79.8%', prec: '65.4%', rec: '5.2%', f1: '9.6%', auc: '0.642', color: '#f59e0b' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Model Comparison</h1>
        <p>Comparative analysis of machine learning classifiers evaluated during the Colab training phase.</p>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '20px' }}>Performance Metrics Summary</h3>
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
                <td>{model.acc}</td>
                <td>{model.prec}</td>
                <td style={{ fontWeight: idx === 0 ? '600' : '400' }}>{model.rec}</td>
                <td>{model.f1}</td>
                <td style={{ fontWeight: '700', color: model.color }}>{model.auc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '20px' }}>Validation Strategy</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-main)' }}>
            The baseline Logistic Regression model exhibited high accuracy but critically low recall (5.2%) due to severe class imbalance, failing to identify actual no-shows. Implementing SMOTE with engineered features improved recall substantially. XGBoost ultimately dominated the evaluation by capturing non-linear relationships across Lead Time and Age matrices.
          </p>
        </div>
      </div>
    </div>
  );
}