const express = require('express');
const app = express();
import { getLocationFromIp, getLocationFromAddress } from './geoCodingAPI.js';

// Middleware
app.use(express.json());
let locationObject = {};

// Routes
app.get('/', (req, res) => {
  res.send('Data Demon 2');
});

app.get('/fromIp', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; //Gets us the requester's IP address
  locationObject = getLocationFromIp(ip);
  //Call weather API with locationObject
});

app.get('/fromAddress', (req, res) => {
  var cityName = req.body.cityName;
  locationObject = getLocationFromAddress(cityName);
  //Call weather API with locationObject
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Data Demon Server started on port ${port}`);
});