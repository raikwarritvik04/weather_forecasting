const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

console.log(process.env.API_KEY);

app.use(cors({ 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})); 

app.get('/', (req, res) => {
  res.send('Welcome to the Mental Health API!');
});

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
        console.error('OpenWeatherMap Error:', error.response.data);
        res.status(500).json({ error: error.response.data });
      } else {
        console.error('Network Error:', error.message);
        res.status(500).json({ error: "Error fetching weather data" });
      }
    }
  });
  

app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
