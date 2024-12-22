import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);

    // Simulate suggestions logic if needed
    if (value) {
      setLoading(true);
      setError("");

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);

      setDebounceTimeout(timeout);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setCity(city);
    setSuggestions([]);
  };

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  const resetWeather = () => {
    setCity("");
    setWeather(null);
    setError("");
    setSuggestions([]);
  };

  return (
    <div className="app-container">
      <h1>Weather Forecast App</h1>
      <p>Get real-time weather updates for cities across the globe.</p>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name"
          className="search-input"
        />
        <div className="button-group">
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="search-button"
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
          <button onClick={resetWeather} className="reset-button">
            Reset
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-container">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Visibility: {weather.visibility / 1000} km</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
        </div>
      )}
      <footer className="footer">
        <p>
          Powered by{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenWeather
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} Weather Forecast App</p>
      </footer>
      <style>{`
        .app-container {
          font-family: 'Arial', sans-serif;
          text-align: center;
          padding: 20px;
          background-color: #f0f8ff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #2c3e50;
          font-weight: bold;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
        }

        p {
          font-size: 1rem;
          color: #34495e;
        }

        .search-container {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .search-input {
          padding: 12px;
          font-size: 16px;
          border: 2px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .search-input:focus {
          border-color: #3498db;
          box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .search-button,
        .reset-button {
          padding: 12px 20px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          color: white;
          border: none;
          border-radius: 8px;
          transition: background-color 0.3s ease, transform 0.2s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .search-button {
          background-color: #3498db;
        }

        .search-button:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }

        .reset-button {
          background-color: #e74c3c;
        }

        .reset-button:hover {
          background-color: #c0392b;
          transform: translateY(-2px);
        }

        .search-button:hover:not(:disabled) {
          background-color: #2980b9;
          transform: translateY(-2px);
        }

        .weather-container {
          margin-top: 20px;
          padding: 20px;
          border: 2px solid #3498db;
          border-radius: 15px;
          background: #ffffff;
          display: inline-block;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          text-align: left;
          max-width: 400px;
          width: 100%;
        }

        .weather-container h2 {
          font-size: 1.8rem;
          margin-bottom: 10px;
          color: #2c3e50;
        }

        .footer {
          margin-top: 20px;
          font-size: 0.9rem;
          color: #7f8c8d;
        }

        .footer a {
          color: #3498db;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default App;
