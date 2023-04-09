// All imports needed for the server
const express = require("express");
const cors = require("cors");
const geoCoding = require("./weather-utility/geoCodingAPI.js");
const weatherRetrieval = require("./weather-utility/weatherRetrievalAPIs.js");
const forecastUtility = require("./forecast-utility/forecastVisualizationAPI.js");
const url = require("url");
const app = express();
const path = require("path");
const router = express.Router();
const produce = require("./rabbitmq-utility/logger/producer-logger.js");
const redis = require("redis");
const consumeFromQueue = require("./rabbitmq-utility/logger/consumer-logger.js");


// Middleware to start the server
app.use(express.json());
app.use(cors());
let locationObject = {};
const client = redis.createClient({
  legacyMode: true,
  socket: {
    host: "redis",
    port: 6379
  }
});

// Connect to Redis and log a message
client.connect().catch(console.error);
client.on('connect', function() {
  console.log(' [x] Connected to Redis!');
});

// Routes
/**
 * Make sure before running the server at port 3000, you have the following servers open:
 * 1) Redis server installed in docker, run instance at port 6379
 * 2) Consumer script running on a separate terminal otherwise you must comment out producer.
 * 3) RabbitMQ is running cloudAMPQ instance at port 5672 so no need to run it locally
 * 
 */

/**
 * @res - Sends the index.html file to the client when logging to localhost:3000
 */
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/test-views/index.html"));
});

/**
 * @res - Sends you a string with the weather data when calling localhost:3000/IP
 */
router.get("/fromIp", (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let ip = search_params.get("ip") || req.ip.substring(req.ip.lastIndexOf(":")+1, req.ip.length) || req.headers['x-forwarded-for']; //Gets us the requester's IP address
  if (ip==='1') ip ='127.0.0.1'; 
  console.log(ip);
  let language = search_params.get("lang");
  return geoCoding.getLocationFromIp(ip).then((locationObject) => {
    // we want the city name extracted from the locationObject
    let cityName = locationObject.city;
    if (!locationObject) {
      res.status(404).send(`Error: Could not find location ${cityName}`);
      return;
    }

    // Redis checks the server at default port 6379 for the key cityName
    client.get(`${cityName}`, async (err, data) => {
      if (err) console.log(err);
      if (data != null) { // data exists in the cache, return it
        console.log(" [x] Available in Redis. Retreiving from cache...");
        produce("Q1_weather", data, (durable = false));
        res.status(200).send(data);
      } else {  // data does not exist in the cache, fetch it from the API and cache it
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
            if(!weatherData) res.status(404).send(`Error: Could not find weather data for location`);
            //FOR TESTING WITHOUT FORECAST SERVICE
            let jsonObject = {
              locationObject: locationObject,
              weatherData: weatherData,
            };
            // let jsonString = JSON.stringify(jsonObject);
            // client.SETEX(`${cityName}`, 3600, jsonString);
            // produce("Q1_weather", jsonString, (durable = false));
            // res.status(200).send(jsonString);
            // return;
            // // COMMENT OUT BELOW CODE TO TEST WITHOUT FORECAST SERVICE
            return forecastUtility.getWeeklyVisualData(JSON.stringify(jsonObject)).then((forecastVisualData) => {   
              if(!forecastVisualData) res.status(404).send(`Error: Could not find forecast visual data for location`);
              let jsonObject = {
                locationObject: locationObject,
                weatherData: weatherData,
                forecastVisualData: forecastVisualData
              };
              let jsonString = JSON.stringify(jsonObject);
              client.SETEX(`${cityName}`, 3600, jsonString);
              produce("Q1_weather", jsonString, (durable = false));
              res.status(200).send(jsonString);
            });
          });
      }
    });
  });
});


/**
 * @res - Sends you a string with the weather data when calling localhost:3000/cityName=[city]
 */
router.get("/fromAddress", async (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let cityName = search_params.get("cityName");
  let language = search_params.get("lang");
  console.log("In From Address");
  return geoCoding.getLocationFromAddress(cityName).then((locationObject) => {
    // if locationObject is null, send a 404 error
    console.log("Returned from geocaching")
    if (!locationObject) {
      res.status(404).send(`Error: Could not find location ${cityName}`);
      return;
    }
    console.log("Geocaching not empty")
    // we can extract the city name from the URL and use it as a key for Redis
    // Redis checks the server at default port 6379 for the key cityName
    client.get(`${cityName}`, async (err, data) => {
      if (err) console.log(err);
      if (data != null) { // data exists in the cache, return it
        console.log(" [x] Available in Redis. Retreiving from cache...");
        produce("Q1_weather", data, (durable = false));
        res.status(200).send(data);
      } else {  // data does not exist in the cache, fetch it from the API and cache it
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
            if(!weatherData) res.status(404).send(`Error: Could not find weather data for location`);
            let jsonObject = {
              locationObject: locationObject,
              weatherData: weatherData,
            }
            //FOR TESTING WITHOUT FORECAST SERVICE
            // let jsonObject = {
            //   locationObject: locationObject,
            //   weatherData: weatherData,
            // };
            // let jsonString = JSON.stringify(jsonObject);
            // client.SETEX(`${cityName}`, 3600, jsonString);
            // produce("Q1_weather", jsonString, (durable = false));
            // res.status(200).send(jsonString);
            // return;
            // COMMENT OUT BELOW CODE TO TEST WITHOUT FORECAST SERVICE
            return forecastUtility.getWeeklyVisualData(JSON.stringify(jsonObject)).then((forecastVisualData) => {   
              if(!forecastVisualData) res.status(404).send(`Error: Could not find forecast visual data for location`);
              let jsonObject = {
                locationObject: locationObject,
                weatherData: weatherData,
                forecastVisualData: forecastVisualData
              };
              let jsonString = JSON.stringify(jsonObject);
              client.SETEX(`${cityName}`, 3600, jsonString);
              produce("Q1_weather", jsonString, (durable = false));
              res.status(200).send(jsonString);
            });
          });
      }
    });
  });
});


router.get("/fromIpHistorical", (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let ip = search_params.get("ip") || req.ip.substring(req.ip.lastIndexOf(":")+1, req.ip.length) || req.headers['x-forwarded-for']; //Gets us the requester's IP address
  let startDate = search_params.get("startDate");
  let endDate = search_params.get("endDate");
  return geoCoding.getLocationFromIp(ip).then((locationObject) => {
    let cityName = locationObject.city;
    if (!locationObject) {
      res.status(404).send(`Error: Could not find location ${cityName}`);
      return;
    }
    // Redis checks the server at default port 6379 for the key cityName
    client.get(`${cityName}-historical`, async (err, data) => {
      if (err) console.log(err);
      if (data != null) { // data exists in the cache, return it
        console.log(" [x] Available in Redis. Retreiving from cache...");
        produce("Q1_weather", data, (durable = false));
        res.status(200).send(data);
      } else {  // data does not exist in the cache, fetch it from the API and cache it
        console.log(
          " [x] Not available in Redis. Retreiving from API then caching for 1 hour..."
        );
        return weatherRetrieval
          .fetchHistoricalData(
            locationObject.latitude,
            locationObject.longitude,
            startDate, //Start Date
            endDate //End Date
          )
          .then((weatherData) => {
            if(!weatherData) return res.status(404).send("Error: Could not find weather data for this location");
            //FOR TESTING WITHOUT FORECAST SERVICE
            let jsonObject = {
              locationObject: locationObject,
              weatherData: weatherData,
            };
            // let jsonString = JSON.stringify(jsonObject);
            // client.SETEX(`${cityName}-historical`, 3600, jsonString);
            // produce("Q1_weather", jsonString, (durable = false));
            // res.status(200).send(jsonString);
            // return;
            // COMMENT OUT BELOW CODE TO TEST WITHOUT FORECAST SERVICE
            return forecastUtility.getHistoricalVisualData(JSON.stringify(jsonObject)).then((forecastVisualData) => {           
              if(!forecastVisualData) return res.status(404).send("Error: Could not generate visual data for this location");
              let jsonObject = {
                locationObject: locationObject,
                weatherData: weatherData,
                forecastVisualData: forecastVisualData
              };
              let jsonString = JSON.stringify(jsonObject);
              client.SETEX(`${cityName}-historical`, 3600, jsonString);
              produce("Q1_weather", jsonString, (durable = false));
              res.status(200).send(jsonString);
            });
          });
      }
    });
  });
});

router.get("/fromAddressHistorical", (req, res) => {
  const incomingURL = new URL(req.url, `http://${req.headers.host}`);
  const search_params = incomingURL.searchParams;
  let cityName = search_params.get("cityName");
  let startDate = search_params.get("startDate");
  let endDate = search_params.get("endDate");
  console.log("In From Address Hisotrical")
  return geoCoding.getLocationFromAddress(cityName).then((locationObject) => {
    console.log("Returned from location address")
    if (!locationObject) {
      res.status(404).send(`Error: Could not find location ${cityName}`);
      return;
    }
    console.log("Location object not empty")

    // Redis checks the server at default port 6379 for the key cityName
    client.get(`${cityName}-historical`, async (err, data) => {
      if (err) console.log(err);
      if (data != null) { // data exists in the cache, return it
        console.log(" [x] Available in Redis. Retreiving from cache...");
        produce("Q1_weather", data, (durable = false));
        res.status(200).send(data);
      } else {  // data does not exist in the cache, fetch it from the API and cache it
        console.log(
          " [x] Not available in Redis. Retreiving from API then caching for 1 hour..."
        );
        return weatherRetrieval
          .fetchHistoricalData(
            locationObject.latitude,
            locationObject.longitude,
            startDate, //Start Date
            endDate //End Date
          )
          .then((weatherData) => {
            if(!weatherData) return res.status(404).send("Error: Could not find weather data for this location");
            //FOR TESTING WITHOUT FORECAST SERVICE
            let jsonObject = {
              locationObject: locationObject,
              weatherData: weatherData,
            };
            // let jsonString = JSON.stringify(jsonObject);
            // client.SETEX(`${cityName}-historical`, 3600, jsonString);
            // produce("Q1_weather", jsonString, (durable = false));
            // res.status(200).send(jsonString);
            // return;
            // COMMENT OUT BELOW CODE TO TEST WITHOUT FORECAST SERVICE
            return forecastUtility.getHistoricalVisualData(JSON.stringify(jsonObject)).then((forecastVisualData) => {           
              if(!forecastVisualData) return res.status(404).send("Error: Could not generate visual data for this location");
              let jsonObject = {
                locationObject: locationObject,
                weatherData: weatherData,
                forecastVisualData: forecastVisualData
              };
              let jsonString = JSON.stringify(jsonObject);
              client.SETEX(`${cityName}-historical`, 3600, jsonString);
              produce("Q1_weather", jsonString, (durable = false));
              res.status(200).send(jsonString);
            });
          });
      }
    });
  });
});


consumeFromQueue("Q1_weather");

// Start the server
const port = process.env.PORT || 3001;
app.use("/", router);
app.listen(port, () => {
  console.log(`Data Demon Server started on port ${port}`);
});
