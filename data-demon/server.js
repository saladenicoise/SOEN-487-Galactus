const express = require('express');
const geoCoding = require('./geoCodingAPI.js');
const weatherRetrieval = require('./weatherRetrievalAPIs.js');
const url = require('url');
const app = express();
const path = require('path');
const router = express.Router();
const produce = require("./producer");

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
  return geoCoding.getLocationFromIp(ip).then(locationObject => {
    if (!locationObject) {
      res.status(404).send(`Error: Invalid IP`);
      return;
    }
    return weatherRetrieval.fetchWeatherData(locationObject.latitude, locationObject.longitude, language).then((weatherData) => {
      if(!weatherData) {
        res.status(404).send('Error: Could not retrieve weather data for this location.');
        return;
      }
      let jsonObject = {
        'locationObject': locationObject,
        'weatherData': weatherData
      }
      let jsonString = JSON.stringify(jsonObject);
      produce("Q1_weather", jsonString, (durable = false));
      console.log(jsonString);
      res.status(200).send(jsonString);
    });
  });
});

router.get('/fromAddress', async (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let cityName = search_params.get('cityName');
  let language = search_params.get('lang');
  return geoCoding.getLocationFromAddress(cityName).then(locationObject => {
    if (!locationObject) {
      res.status(404).send(`Error: Could not find location ${cityName}`);
      return;
    }
    return weatherRetrieval.fetchWeatherData(locationObject.latitude, locationObject.longitude, language).then((weatherData) => {
      if(!weatherData) {
        res.status(404).send('Error: Could not retrieve weather data for this location.');
        return;
      }
      let jsonObject = {
        'locationObject': locationObject,
        'weatherData': weatherData
      }
      let jsonString = JSON.stringify(jsonObject);
      
      produce("Q1_weather", jsonString, (durable = false));
      res.status(200).send(jsonString);
      console.log(jsonString);
    });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.use('/', router)
app.listen(port, () => {
  console.log(`Data Demon Server started on port ${port}`);
});
