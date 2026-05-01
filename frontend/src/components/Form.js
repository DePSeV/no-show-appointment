import React, { useState } from 'react';

export default function Form({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    age: 35,
    leadtime: 7,
    scheduled_hour: 10,
    gender: 'F',
    day_of_week: 'Monday',
    sms_received: false,
    hypertension: false,
    diabetes: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Appointment Details</h2>
      <form onSubmit={handleSubmit}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="form-group">
            <label>Patient Age</label>
            <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} min="0" required />
          </div>
          <div className="form-group">
            <label>Lead Time (Days)</label>
            <input type="number" name="leadtime" className="form-control" value={formData.leadtime} onChange={handleChange} min="0" required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="form-group">
            <label>Hour Booked (0-23)</label>
            <input type="number" name="scheduled_hour" className="form-control" value={formData.scheduled_hour} onChange={handleChange} min="0" max="23" required />
          </div>
          <div className="form-group">
            <label>Patient Gender</label>
            <select name="gender" className="form-control" value={formData.gender} onChange={handleChange}>
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Day of Appointment</label>
          <select name="day_of_week" className="form-control" value={formData.day_of_week} onChange={handleChange}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" name="sms_received" checked={formData.sms_received} onChange={handleChange} />
            SMS Sent
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="hypertension" checked={formData.hypertension} onChange={handleChange} />
            Hypertension
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="diabetes" checked={formData.diabetes} onChange={handleChange} />
            Diabetes
          </label>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Running AI Assessment...' : 'Calculate Risk Profile'}
        </button>
      </form>
    </div>
  );
}