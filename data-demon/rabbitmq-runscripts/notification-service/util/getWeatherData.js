const geoCoding = require("../../../weather-utility/geoCodingAPI.js");
const {fetchWeatherData, fetchHistoricalData} = require("../../../weather-utility/weatherRetrievalAPIs.js");


async function getCurrentWeather(cityName, language, time){

    console.log("In From Address");
    const locationObject = await geoCoding.getLocationFromAddress(cityName);

    // if locationObject is null, send a 404 error
    console.log("Returned from geocaching")
    if (!locationObject) {
        res.status(404).send(`Error: Could not find location ${cityName}`);
        return;
    }

    const weatherData = await fetchWeatherData(
        locationObject.latitude,
        locationObject.longitude,
        language
    );

    if(!weatherData) return null;


    let currentWeather = weatherData[0];
    let content = `${currentWeather.temperature_c}C/${currentWeather.temperature_f}F ${currentWeather.weather_condition}`;
    
    let jsonObject = {
        location: cityName,
        language: language,
        time: time,
        content: content
    };

    return jsonObject;
}

getCurrentWeather('Montreal', 'en', '13h10').then(console.log)