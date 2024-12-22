const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

console.log(process.env.API_KEY);

app.use(cors());

app.get("/api/weather", async (req, res) => {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }
  
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
      );
      res.json(response.data);
    } catch (error) {
      if (error.response) {
        // If there's a response from the API
        console.error('OpenWeatherMap Error:', error.response.data);
        res.status(500).json({ error: error.response.data });
      } else {
        // If there's no response (network error or other)
        console.error('Network Error:', error.message);
        res.status(500).json({ error: "Error fetching weather data" });
      }
    }
  });
  

app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
