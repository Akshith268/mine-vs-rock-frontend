import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Parse the input string into an array of numbers
        const features = inputValue.split(',').map(Number);

        try {
            const response = await axios.post('https://mine-vs-rock-4.onrender.com/predict', {
                features: features,
            });
            console.log(response.data.prediction);
            console.log(features);
            setPrediction(response.data.prediction);
        } catch (error) {
            setError('An error occurred while making the prediction.');
            console.error('Prediction error:', error);
        } finally {
            setLoading(false);
            setInputValue('');
        }
    };

    return (
        <div className="App">
            <h1>Model Prediction</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter features, comma-separated"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Predicting...' : 'Predict'}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
            {prediction && <div>Prediction: {prediction}</div>}
        </div>
    );
}

export default App;
