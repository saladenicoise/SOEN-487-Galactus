const express = require('express');
const geoCoding = require('./geoCodingAPI.js');
const weatherRetrieval = require('./weatherRetrievalAPIs.js');
const url = require('url');
const app = express();
const path = require('path');
const router = express.Router();

// Middleware
app.use(express.json());
let locationObject = {};

// Routes
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/test-views/index.html'));
});

router.get('/fromIp', (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let ip = search_params.get('ip'); //Gets us the requester's IP address
  let language= search_params.get('lang');
  locationObject = geoCoding.getLocationFromIp(ip);
  //Call weather API with locationObject properties
  let weatherData = weatherRetrieval.fetchWeatherData(locationObject.latitude, locationObject.longitude, language);
  let jsonObject = {
    'locationObject': locationObject,
    'weatherData': weatherData
  }
  let jsonString = JSON.stringify(jsonObject);
  //Send jsonString to cache
});

router.get('/fromAddress', async (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let cityName = search_params.get('cityName');
  let language = search_params.get('lang');
  const locationObject = await geoCoding.getLocationFromAddress(cityName);
  //Call weather API with locationObject properties
  let weatherData = weatherRetrieval.fetchWeatherData(locationObject.latitude, locationObject.longitude, language);
  console.log("Weather Data: " + weatherData);
  let jsonObject = {
    'locationObject': locationObject,
    'weatherData': weatherData
  }
  let jsonString = JSON.stringify(jsonObject);
  //Send jsonString to cache
});

// Start the server
const port = process.env.PORT || 3000;
app.use('/', router)
app.listen(port, () => {
  console.log(`Data Demon Server started on port ${port}`);
});