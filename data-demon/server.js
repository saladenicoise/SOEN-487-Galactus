const express = require("express");
const geoCoding = require("./geoCodingAPI.js");
const weatherRetrieval = require("./weatherRetrievalAPIs.js");
const url = require("url");
const app = express();
const path = require("path");
const router = express.Router();
const produce = require("./producer");
const redis = require("redis");

// Middleware
app.use(express.json());
let locationObject = {};
const client = redis.createClient({
  legacyMode: true,
});

client.connect().catch(console.error);

// Routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/test-views/index.html"));
});

router.get("/fromIp", (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let ip = search_params.get("ip"); //Gets us the requester's IP address
  let language = search_params.get("lang");
  return geoCoding.getLocationFromIp(ip).then((locationObject) => {
    if (!locationObject) {
      res.status(404).send(`Error: Could not find location ${cityName}`);
      return;
    }
    let cityName = locationObject.city;
    client.get(`${cityName}`, async (err, data) => {
      if (err) console.log(err);
      if (data != null) {
        console.log(" [x] Available in Redis. Retreiving from cache...");
        cachedData = JSON.parse(data);
        produce("Q1_weather", cachedData, (durable = false));
        res.status(200).send(cachedData);
      } else {
        console.log(
          " [x] Not available in Redis. Retreiving from API then caching for 1 hour..."
        );
        return weatherRetrieval
          .fetchWeatherData(
            locationObject.latitude,
            locationObject.longitude,
            language
          )
          .then((weatherData) => {
            let jsonObject = {
              locationObject: locationObject,
              weatherData: weatherData,
            };
            let jsonString = JSON.stringify(jsonObject);
            client.SETEX(`${cityName}`, 3600, JSON.stringify(jsonString));
            produce("Q1_weather", jsonString, (durable = false));
            res.status(200).send(jsonString);
            // console.log(jsonString);
          });
      }
    });
  });
});

router.get("/fromAddress", async (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let cityName = search_params.get("cityName");
  let language = search_params.get("lang");
  return geoCoding.getLocationFromAddress(cityName).then((locationObject) => {
    if (!locationObject) {
      res.status(404).send(`Error: Could not find location ${cityName}`);
      return;
    }
    client.get(`${cityName}`, async (err, data) => {
      if (err) console.log(err);
      if (data != null) {
        console.log(" [x] Available in Redis. Retreiving from cache...");
        cachedData = JSON.parse(data);
        produce("Q1_weather", cachedData, (durable = false));
        res.status(200).send(cachedData);
      } else {
        console.log(
          " [x] Not available in Redis. Retreiving from API then caching for 1 hour..."
        );
        return weatherRetrieval
          .fetchWeatherData(
            locationObject.latitude,
            locationObject.longitude,
            language
          )
          .then((weatherData) => {
            let jsonObject = {
              locationObject: locationObject,
              weatherData: weatherData,
            };
            let jsonString = JSON.stringify(jsonObject);
            client.SETEX(`${cityName}`, 3600, JSON.stringify(jsonString));
            produce("Q1_weather", jsonString, (durable = false));
            res.status(200).send(jsonString);
            // console.log(jsonString);
          });
      }
    });
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.use("/", router);
app.listen(port, () => {
  console.log(`Data Demon Server started on port ${port}`);
});
