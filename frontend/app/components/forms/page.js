'use client'
import React, { useState } from 'react';
import axios from 'axios';
export default function UserForm() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/create', formData);
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
