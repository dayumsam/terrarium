'use client'
import { useState } from 'react';
import axios from 'axios';

export default function UserForm() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.parse(formData))
    try {
      const response = await axios.post('/api/webhook', formData);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="jsonInput">JSON Input:</label>
          <textarea
            id="jsonInput"
            name="jsonInput"
            value={formData.jsonInput || ''}
            onChange={handleChange}
            rows="4"
            cols="50"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
