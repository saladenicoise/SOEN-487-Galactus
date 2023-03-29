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
  return geoCoding.getLocationFromIp(ip).then(locationObject => {
    return weatherRetrieval.fetchWeatherData(locationObject.latitude, locationObject.longitude, language).then((weatherData) => {
      let jsonObject = {
        'locationObject': locationObject,
        'weatherData': weatherData
      }
      let jsonString = JSON.stringify(jsonObject);
      console.log(jsonString);
      res.send(jsonString);
    });
  });
});

router.get('/fromAddress', async (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let cityName = search_params.get('cityName');
  let language = search_params.get('lang');
  return geoCoding.getLocationFromAddress(cityName).then(locationObject => {
    return weatherRetrieval.fetchWeatherData(locationObject.latitude, locationObject.longitude, language).then((weatherData) => {
      let jsonObject = {
        'locationObject': locationObject,
        'weatherData': weatherData
      }
      let jsonString = JSON.stringify(jsonObject);
      console.log(jsonString);
      res.send(jsonString);
    });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.use('/', router)
app.listen(port, () => {
  console.log(`Data Demon Server started on port ${port}`);
});
