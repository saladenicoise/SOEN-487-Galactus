const geoCoding = require("../geoCodingAPI.js");
const {fetchWeatherData, fetchHistoricalData} = require("../weatherRetrievalAPIs.js");
const redisProm = require('redis-promisify');

async function getCurrentWeather(cityName, language, time, client){
    
    let jsonObject = await client.getAsync(`${cityName}-notif`);

    if (jsonObject != null) { // data exists in the cache, return it
        console.log(" [x] Available in Redis. Retreiving from cache...");
        jsonObject = JSON.parse(jsonObject.toString());
    } else {  // data does not exist in the cache, fetch it from the API and cache it
        console.log(
        " [x] Not available in Redis. Retreiving from API then caching for 1 hour..."
        );

        console.log("In From Address");
        const locationObject = await geoCoding.getLocationFromAddress(cityName);

        // if locationObject is null, send a 404 error
        console.log("Returned from geocaching")
        if (!locationObject) {
            res.status(404).send(`Error: Could not find location ${cityName}`);
            return;
        }

        weatherData = await fetchWeatherData(
            locationObject.latitude,
            locationObject.longitude,
            language
        );
        
        if(!weatherData) return null;

        let currentWeather = weatherData[0];
        let content = `${currentWeather.temperature_c}C/${currentWeather.temperature_f}F ${currentWeather.weather_condition}`;
    
        jsonObject = {
            location: cityName,
            language: language,
            time: time,
            content: content
        };

        let jsonString = JSON.stringify(jsonObject);
        client.SETEX(`${cityName}-notif`, 3600, jsonString);    
    }

    return jsonObject;

}


const client = redisProm.createClient({
    legacyMode: true,
});


// Connect to Redis and log a message
client.on('connect', function() {
    console.log(' [x] Connected to Redis!');
    getCurrentWeather('Montreal', 'en', '13h10', client).then(console.log);
});



