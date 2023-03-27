const express = require('express');
const app = express();
import { getLocationFromIp, getLocationFromAddress } from './geoCodingAPI.js';
import { fetchWeatherData, fetchHistoricalData} from './weatherRetrievalAPIs.js';

// Middleware
app.use(express.json());
let locationObject = {};

// Routes
app.get('/', (req, res) => {
  res.send('Data Demon 2');
});

app.get('/fromIp', (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; //Gets us the requester's IP address
  let language= req.params.language;
  locationObject = getLocationFromIp(ip);
  //Call weather API with locationObject properties
  let weatherData = fetchWeatherData(locationObject.latitude, locationObject.longitude, language);
  let jsonObject = {
    'locationObject': locationObject,
    'weatherData': weatherData
  }
  let jsonString = JSON.stringify(jsonObject);
  //Send jsonString to cache
});

app.get('/fromAddress', (req, res) => {
  let cityName = req.params.cityName;
  let language = req.params.language;
  locationObject = getLocationFromAddress(cityName);
  //Call weather API with locationObject properties
  let weatherData = fetchWeatherData(locationObject.latitude, locationObject.longitude, language);
  let jsonObject = {
    'locationObject': locationObject,
    'weatherData': weatherData
  }
  let jsonString = JSON.stringify(jsonObject);
  //Send jsonString to cache
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Data Demon Server started on port ${port}`);
});