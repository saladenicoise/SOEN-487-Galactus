const OPEN_WEATHER_API_KEY = '534d92cb34d25943cec3aeb8d8281386';
const WEATHER_API_KEY = '7f7c4f738c4045a7829222148232603';

const IP_API_KEY = '326730ba1d4149759691b05c236207aa';
const CITY_API_KEY = '119dc3a311b1faa4ed064d95a49c9d39';


function getWeatherAPI(lat, lon, lang, axios) {
    let url = 'https://api.weatherapi.com/v1/forecast.json?key=' + WEATHER_API_KEY + '&q=' + lat + ',' + lon + '&days=7&aqi=no&alerts=yes&lang=' + 'en';
    let alertsArr = [];

    return axios.get(url)
        .then(response => response.data)
        .then(weatherData => {
            weatherData.alerts.alert.forEach((alert) => {
                let alertObject = {
                    type: 'alert',
                    title: alert.headline,
                    description: alert.desc,
                    severity: alert.severity,
                    date: alert.effective,
                    expires: alert.expires,
                    area: alert.areas,
                    urgency: alert.urgency,
                    instruction: alert.instruction,
                };
                alertsArr.push(alertObject)
            })
            // Adding this weather stub in case the alerts are empty (for demo)
            if (alertsArr.length === 0)
                alertsArr = [
                    {
                        type: 'alert',
                        title: 'Stub Alert Title',
                        description: 'Lorem Ipsum',
                        severity: 'Very severe',
                        date: 'n/a date',
                        expires: 'n/a expiration',
                        area: 'everywhere',
                        urgency: 'Very urgent',
                        instruction: 'Wait for instructions.',
                    }
                ]
            return alertsArr;
        });
};

function getGeocodingFromCityName(cityName, axios) {
    let url = 'http://api.positionstack.com/v1/forward?access_key=' + CITY_API_KEY + '&query=' + cityName + '&timezone_module=1';

    return axios.get(url)
        .then((response) => response.data)
        .then((data) => {
            const toReturn = {
                latitude: data.data[0].latitude,
                longitude: data.data[0].longitude,
                city: data.data[0].name,
                state: data.data[0].region,
                state_abrv: data.data[0].region_code,
                country: data.data[0].country,
                time_zone: null,
            };
            return toReturn;
        })
}

module.exports = function (cityName, axios) {
    return getGeocodingFromCityName(cityName, axios)
        .then(res => {
            return getWeatherAPI(res.latitude, res.longitude, 'en', axios);
        });
}

// module.exports = { getWeatherAPI, getGeocodingFromCityName, getWeatherAlertsData }
