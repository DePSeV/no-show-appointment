import React, { useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Dashboard from './components/Dashboard';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAssessment = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://no-show-appointment.onrender.com/predict', formData);
      setResult(response.data);
    } catch (err) {
      setError('Failed to connect to the prediction engine. Ensure backend is running.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Predictive Scheduling Engine</h1>
        <p>AI-powered risk assessment for operational appointment management.</p>
      </header>
      
      <main className="content-grid">
        <Form onSubmit={handleAssessment} loading={loading} />
        <Dashboard result={result} error={error} loading={loading} />
      </main>
    </div>
  );
}

export default App;