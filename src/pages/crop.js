import React, { useState } from 'react';
import axios from 'axios';

function Crop() {
  const [formData, setFormData] = useState({
    Area: '',
    average_rain_fall_mm_per_year: '',
    Year: '',
    Item: '',
    avg_temp: '',
    pesticides_tonnes: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null);
    setError(null);
    try {
      const response = await axios.post('http://127.0.0.1:5000/crop_predict', {
          input: [
              formData.Area,
              formData.average_rain_fall_mm_per_year,
              formData.Year,
              formData.Item,
              formData.avg_temp,
              formData.pesticides_tonnes
          ]
      });
      setPrediction(response.data.prediction);
  } catch (error) {
      console.error("There was an error with the prediction request:", error);
  }
  
  };

  return (
    <div className="App">
      <h1>ML Model Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Area:
          <input type="text" name="Area" value={formData.Area} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Average Rainfall (mm/year):
          <input type="number" name="average_rain_fall_mm_per_year" value={formData.average_rain_fall_mm_per_year} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Year:
          <input type="number" name="Year" value={formData.Year} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Item:
          <input type="text" name="Item" value={formData.Item} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Average Temperature (°C):
          <input type="number" name="avg_temp" value={formData.avg_temp} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Pesticides (tonnes):
          <input type="number" name="pesticides_tonnes" value={formData.pesticides_tonnes} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div>
          <h2>Prediction</h2>
          <p>{prediction}</p>
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Crop;
