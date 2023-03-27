//One function per API

const OPEN_WEATHER_API_KEY = '';
const WEATHER_API_KEY = '';


//Current weather
const fetchOpenWeatherCurrent = (lat, lon, lang) => {
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&appid=' + OPEN_WEATHER_API_KEY + '&units=metric&lang=' + lang;
    let weatherForecastArr = [];

    fetch(url).then(res => {
        if (res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + res.status);
            return;
        }

        // Examine the text in the response
        res.json().then(data => {

            const currentWeatherObject = {
                type: 'forecast-current',
                hour: Date(data.dt*1000),//Unix timestamp to JS date
                temperature_c: data.main.temp,
                temperature_f: data.main.temp * 9/5 + 32,
                waether_condition: data.weather[0].description,
                wind_speed_mph: data.wind.speed * 2.237, //m/s to mph
                wind_speed_kph: data.wind.speed * 3.6, //m/s to kph
                wind_direction: data.wind.deg,
                pressure_mb: data.main.pressure, //hpa
                pressure_in: data.main.pressure * 0.02953, //hpa to inHg
                precipitation_mm: data.rain ? data.rain['1h'] : 0, //mm
                precipitation_in: data.rain ? data.rain['1h'] * 0.03937 : 0, //mm to in
                humidity: data.main.humidity,
                cloud_coverage: data.clouds.all,
                relative_temp_c: data.main.feels_like,
                relative_temp_f: data.main.feels_like * 9/5 + 32,
                gust_speed_mph: data.wind.gust * 2.237, //m/s to mph
                gust_speed_kph: data.wind.gust * 3.6, //m/s to kph
                uv_index: null,
                visibility_km: data.visibility / 1000, //m to km
                visibility_mi: data.visibility / 1609.344, //m to mi
                chance_rain: null,
                chance_snow: null,
            };
            weatherForecastArr.push(currentWeatherObject);
        });
    });
    return weatherForecastArr;
};

//Hourly forecast for 4 days
const fetchOpenWeatherHourly = (lat, lon, lang) => {
    let url = 'https://api.openweathermap.org/data/2.5/forecast/hourly?lat='+ lat + '&lon=' + lon + '&appid=' + OPEN_WEATHER_API_KEY + '&units=metric&lang='+lang;
    let weatherForecastArr = [];

    fetch(url).then(res => {
        if (res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + res.status);
            return;
        }

        // Examine the text in the response
        res.json().then(data => {
            let hourly_information_arr = [];
            let index = 0;

            //Acummulation Arrays
            let temperature_c_arr = [];
            let wind_speed_kph_arr = [];
            let precipitation_mm_arr = [];
            let humidity_arr = [];
            let visibility_km_arr = [];
            for (let forecastHour of data.list) {
                if (index % 24 === 0) { //T'is a new day
                    const forecastDayObject = {
                        type: 'forecast-day',
                        date: forecastHour.dt_txt,
                        daily_information: {
                            max_temp_c: Math.max(...temperature_c_arr),
                            max_temp_f: Math.max(...temperature_c_arr) * 9/5 + 32,
                            min_temp_c: Math.min(...temperature_c_arr),
                            min_temp_f: Math.min(...temperature_c_arr) * 9/5 + 32,
                            avg_temp_c: temperature_c_arr.reduce((a, b) => a + b, 0) / temperature_c_arr.length,
                            avg_temp_f: temperature_c_arr.reduce((a, b) => a + b, 0) / temperature_c_arr.length * 9/5 + 32,
                            max_wind_speed_mph: Math.max(...wind_speed_kph_arr) * 0.621371, //kph to mph
                            max_wind_speed_kph: Math.max(...wind_speed_kph_arr),
                            total_precipitation_mm: precipitation_mm_arr.reduce((a, b) => a + b, 0),
                            total_precipitation_in: precipitation_mm_arr.reduce((a, b) => a + b, 0) * 0.03937, //mm to in
                            avg_visibility_km: visibility_km_arr.reduce((a, b) => a + b, 0) / visibility_km_arr.length,
                            avg_visibility_mi: visibility_km_arr.reduce((a, b) => a + b, 0) / visibility_km_arr.length * 0.621371, //km to mi
                            will_it_rain: null,
                            will_it_snow: null,
                            day_chance_rain: null,
                            day_chance_snow: null,
                            avg_humidity: humidity_arr.reduce((a, b) => a + b, 0) / humidity_arr.length,
                            daily_condition: null,
                            daily_uv_index: null,
                            sunrise: data.city.sunrise,
                            sunset: data.city.sunset,
                            moonrise: null,
                            moonset: null,
                            moon_phase: null
                        },
                        hourly_information: hourly_information_arr
                    };
                    temperature_c_arr = [];
                    wind_speed_kph_arr = [];
                    precipitation_mm_arr = [];
                    humidity_arr = [];
                    visibility_km_arr = [];
                    weatherForecastArr.push(forecastDayObject);
                }
                //Hours
                const forecastHourObject = {
                    type: 'forecast-hour',
                    hour: forecastHour.dt_txt,
                    temperature_c: forecastHour.main.temp,
                    temperature_f: forecastHour.main.temp * 9/5 + 32,
                    weather_condition: forecastHour.weather[0].description,
                    wind_speed_mph: forecastHour.wind.speed * 2.237, //m/s to mph
                    wind_speed_kph: forecastHour.wind.speed * 3.6, //m/s to kph
                    wind_direction: forecastHour.wind.deg,
                    pressure_mb: forecastHour.main.pressure, //hpa
                    pressure_in: forecastHour.main.pressure * 0.02953, //hpa to inHg
                    precipitation_mm: forecastHour.rain ? forecastHour.rain['1h'] : 0, //mm
                    precipitation_in: forecastHour.rain ? forecastHour.rain['1h'] * 0.03937 : 0, //mm to in
                    humidity: forecastHour.main.humidity,
                    cloud_coverage: forecastHour.clouds.all,
                    relative_temp_c: forecastHour.main.feels_like,
                    relative_temp_f: forecastHour.main.feels_like * 9/5 + 32,
                    gust_speed_mph: forecastHour.wind.gust * 2.237, //m/s to mph
                    gust_speed_kph: forecastHour.wind.gust * 3.6, //m/s to kph
                    uv_index: null,
                    visibility_km: forecastHour.visibility / 1000, //m to km
                    visibility_mi: forecastHour.visibility / 1609.344, //m to mi
                    chance_rain: null,
                    chance_snow: null,
                };
                hourly_information_arr.push(forecastHourObject);
                temperature_c_arr.push(forecastHourObject.temperature_c);
                wind_speed_kph_arr.push(forecastHourObject.wind_speed_kph);
                pressure_mb_arr.push(forecastHourObject.pressure_mb);
                precipitation_mm_arr.push(forecastHourObject.precipitation_mm);
                humidity_arr.push(forecastHourObject.humidity);
                cloud_coverage_arr.push(forecastHourObject.cloud_coverage);
                relative_temp_c_arr.push(forecastHourObject.relative_temp_c);
                visibility_km_arr.push(forecastHourObject.visibility_km);
                gust_speed_kph_arr.push(forecastHourObject.gust_speed_kph);
            }
        });
    });
    return weatherForecastArr;
};


//Returns hourly forecast for 7 days (including day of request)
//TODO: Document the json object
//https://www.weatherapi.com/docs/#intro-request
const fetchWeatherAPIForecast = (lat, lon, lang) => {
    let url = 'https://api.weatherapi.com/v1/forecast.json?key=' + WEATHER_API_KEY + '&q=' + lat + ',' + lon + '&days=7&aqi=no&alerts=yes&lang='+lang;
    let weatherForecastArr = [];

    fetch(url).then(res => {
        if (res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + res.status);
            return;
        }

        // Examine the text in the response
        res.json().then(data => {
            if (data.alerts.alert.length > 0) {
                for (let alert of data.alerts.alert) {
                    const alertObject = {
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
                }
                //PUSH DIRECTLY TO NOTIFICATION QUEUE, bypass bidding system
            }
            //First element will alway be the current weather
            const currentWeatherObject = {
                type: 'forecast-current',
                temperature_c: data.current.temp_c,
                temperature_f: data.current.temp_f,
                weather_condition: data.current.condition.text,
                wind_speed_mph: data.current.wind_mph,
                wind_speed_kph: data.current.wind_kph,
                wind_direction: data.current.wind_dir,
                pressure_mb: data.current.pressure_mb,
                pressure_in: data.current.pressure_in,
                precipitation_mm: data.current.precip_mm,
                precipitation_in: data.current.precip_in,
                humidity: data.current.humidity,
                cloud_coverage: data.current.cloud,
                relative_temp_c: data.current.feelslike_c,
                relative_temp_f: data.current.feelslike_f,
                gust_speed_mph: data.current.gust_mph,
                gust_speed_kph: data.current.gust_kph,
                uv_index: data.current.uv,
                visibility_km: data.current.vis_km,
                visibility_mi: data.current.vis_miles,
                chance_rain: null,
                chance_snow: null,
            }
            weatherForecastArr.push(currentWeatherObject);
            for (let forecastDay of data.forecast.forecastday) {
                //Generate hourly forecast for each day
                let hourly_information_arr = [];
                for (let forecastHour of forecastDay.hour) {
                    const forecastHourObject = {
                        type: 'forecast-hour',
                        hour: forecastHour.time,
                        temperature_c: forecastHour.temp_c,
                        temperature_f: forecastHour.temp_f,
                        weather_condition: forecastHour.condition.text,
                        wind_speed_mph: forecastHour.wind_mph,
                        wind_speed_kph: forecastHour.wind_kph,
                        wind_direction: forecastHour.wind_dir,
                        pressure_mb: forecastHour.pressure_mb,
                        pressure_in: forecastHour.pressure_in,
                        precipitation_mm: forecastHour.precip_mm,
                        precipitation_in: forecastHour.precip_in,
                        humidity: forecastHour.humidity,
                        cloud_coverage: forecastHour.cloud,
                        relative_temp_c: forecastHour.feelslike_c,
                        relative_temp_f: forecastHour.feelslike_f,
                        gust_speed_mph: forecastHour.gust_mph,
                        gust_speed_kph: forecastHour.gust_kph,
                        uv_index: forecastHour.uv,
                        visibility_km: forecastHour.vis_km,
                        visibility_mi: forecastHour.vis_miles,
                        chance_rain: forecastHour.chance_of_rain,
                        chance_snow: forecastHour.chance_of_snow,
                    };
                    hourly_information_arr.push(forecastHourObject);
                }

                forecastDayObject = {
                    type: 'forecast-day',
                    date: forecastDay.date,
                    daily_information: {
                        max_temp_c: forecastDay.day.maxtemp_c,
                        max_temp_f: forecastDay.day.maxtemp_f,
                        min_temp_c: forecastDay.day.mintemp_c,
                        min_temp_f: forecastDay.day.mintemp_f,
                        avg_temp_c: forecastDay.day.avgtemp_c,
                        avg_temp_f: forecastDay.day.avgtemp_f,
                        max_wind_speed_mph: forecastDay.day.maxwind_mph,
                        max_wind_speed_kph: forecastDay.day.maxwind_kph,
                        total_precipitation_mm: forecastDay.day.totalprecip_mm,
                        total_precipitation_in: forecastDay.day.totalprecip_in,
                        avg_visibility_km: forecastDay.day.avgvis_km,
                        avg_visibility_mi: forecastDay.day.avgvis_miles,
                        will_it_rain: forecastDay.day.daily_will_it_rain,
                        will_it_snow: forecastDay.day.daily_will_it_snow,
                        day_chance_rain: forecastDay.day.daily_chance_of_rain,
                        day_chance_snow: forecastDay.day.daily_chance_of_snow,
                        avg_humidity: forecastDay.day.avghumidity,
                        daily_condition: forecastDay.day.condition.text,
                        daily_uv_index: forecastDay.day.uv,
                        sunrise: forecastDay.astro.sunrise,
                        sunset: forecastDay.astro.sunset,
                        moonrise: forecastDay.astro.moonrise,
                        moonset: forecastDay.astro.moonset,
                        moon_phase: forecastDay.astro.moon_phase,
                    },
                    hourly_information: hourly_information_arr,
                }
                weatherForecastArr.push(forecastDayObject);
            }
        });
    });
    return weatherForecastArr;
};

const convertWMOCodeToWeatherCondition = (code) => {
    switch(code) {
        case 0:
            return 'Clear';
        case 1:
            return 'Mainly Clear';
        case 2:
            return 'Partly Cloudy';
        case 3:
            return 'Overcast';
        case 45:
            return 'Fog';
        case 48:
            return 'Depositing Rime Fog';
        case 51:
            return 'Drizzle: Light';
        case 53:
            return 'Drizzle: Moderate';
        case 55:
            return 'Drizzle: Dense';
        case 56:
            return 'Freezing Drizzle: Light';
        case 57:
            return 'Freezing Drizzle: Dense';
        case 61:
            return 'Rain: Slight';
        case 63:
            return 'Rain: Moderate';
        case 65:
            return 'Rain: Heavy';
        case 66:
            return 'Freezing Rain: Light';
        case 67:
            return 'Freezing Rain: Heavy';
        case 71:
            return 'Snow: Slight';
        case 73:
            return 'Snow: Moderate';
        case 75:
            return 'Snow: Heavy';
        case 77:
            return 'Snow Grains';
        case 80:
            return 'Rain Showers: Slight';
        case 81:
            return 'Rain Showers: Moderate';
        case 82:
            return 'Rain Showers: Violent';
        case 85:
            return 'Snow Showers: Slight';
        case 86:
            return 'Snow Showers: Heavy';
    }
};

//Returns hourly forecast for 7 days (including day of request)
// Format is array of indexes representing hours starting with hour 0 of the request day, this index is then used to access the rest of the data
// in the other arrays
const fetchOpenMeteoHourlyForecast = (lat, lon) => {
    let url = 'https://api.open-meteo.com/v1/forecast?latitude='+ lat + '&longitude=' + lon + '&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,pressure_msl,surface_pressure,cloudcover,visibility,windspeed_10m,winddirection_10m,windgusts_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,temperature_2m_mean,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,snowfall_sum,precipitation_probability_max,windspeed_10m_max&timezone=America%2FNew_York'
    let weatherForecastArr = [];

    fetch(url).then(res => {
        if (res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + res.status);
            return;
        }

        res.json().then(data => {
            let hourly_information_arr = [];

            // Get the current date and time
            const now = new Date();

            // Get the UTC time offset in minutes
            const offsetInMinutes = now.getTimezoneOffset();

            // Convert the offset to milliseconds and add/subtract it from the current time
            const offsetInMilliseconds = offsetInMinutes * 60 * 1000;
            const gmtTime = new Date(now.getTime() + offsetInMilliseconds).getUTCHours();

            for (let i = 0; i < data.hourly.time.length; i++) {
                if (i === gmtTime) {//Represents the closest time to what we have rounded to the previous hour
                    const currentWeatherObject = {
                        type: 'forecast-current',
                        date: data.hourly.time[gmtTime],
                        temperature_c: data.hourly.temperature_2m[gmtTime],
                        temperature_f: data.hourly.temperature_2m[gmtTime] * 9/5 + 32,
                        weather_condition: convertWMOCodeToWeatherCondition(data.hourly.weathercode[gmtTime]),
                        wind_speed_kph: data.hourly.windspeed_10m[gmtTime],
                        wind_speed_mph: data.hourly.windspeed_10m[gmtTime] * 0.621371,
                        wind_direction: data.hourly.winddirection_10m[gmtTime],
                        pressure_mb: data.hourly.surface_pressure[gmtTime],
                        pressure_in: data.hourly.surface_pressure[gmtTime] * 0.029529983071445,
                        precipitation_mm: data.hourly.precipitation[gmtTime],
                        precipitation_in: data.hourly.precipitation[gmtTime] * 0.039370078740157,
                        humidity: data.hourly.relativehumidity_2m[gmtTime],
                        cloud_coverage: data.hourly.cloudcover[gmtTime],
                        relative_temp_c: data.hourly.apparent_temperature[gmtTime],
                        relative_temp_f: data.hourly.apparent_temperature[gmtTime] * 9/5 + 32,
                        gust_speed_kph: data.hourly.windgusts_10m[gmtTime],
                        gust_speed_mph: data.hourly.windgusts_10m[gmtTime] * 0.621371,
                        uv_index: null,
                        visibility_km: data.hourly.visibility[gmtTime]/1000, //m
                        visibility_mi: data.hourly.visibility[gmtTime]/1609.344, //m to mi
                        chance_rain: null,
                        chance_snow: null,
                    }
                    weatherForecastArr.push(currentWeatherObject);
                }           
                const forecastHourObject = {
                    type: 'forecast-hour',
                    date: data.hourly.time[i],
                    temperature_c: data.hourly.temperature_2m[i],
                    temperature_f: data.hourly.temperature_2m[i] * 9/5 + 32,
                    weather_condition: convertWMOCodeToWeatherCondition(data.hourly.weathercode[i]),
                    wind_speed_kph: data.hourly.windspeed_10m[i],
                    wind_speed_mph: data.hourly.windspeed_10m[i] * 0.621371,
                    wind_direction: data.hourly.winddirection_10m[i],
                    pressure_mb: data.hourly.surface_pressure[i],
                    pressure_in: data.hourly.surface_pressure[i] * 0.029529983071445,
                    precipitation_mm: data.hourly.precipitation[i],
                    precipitation_in: data.hourly.precipitation[i] * 0.039370078740157,
                    humidity: data.hourly.relativehumidity_2m[i],
                    cloud_coverage: data.hourly.cloudcover[i],
                    relative_temp_c: data.hourly.apparent_temperature[i],
                    relative_temp_f: data.hourly.apparent_temperature[i] * 9/5 + 32,
                    gust_speed_kph: data.hourly.windgusts_10m[i],
                    gust_speed_mph: data.hourly.windgusts_10m[i] * 0.621371,
                    uv_index: null,
                    visibility_km: data.hourly.visibility[i]/1000,
                    visibility_mi: data.hourly.visibility[i]/1609.344,
                    chance_rain: data.hourly.precipitation_probability[i],
                    chance_snow: null,
                };
                hourly_information_arr.push(forecastHourObject);
            }
            for (let dailyData of data.daily) {
                const forecastDayObject = {
                    type: 'forecast-day',
                    date: dailyData.time,
                    daily_information: {
                        max_temp_c: dailyData.temperature_2m_max,
                        max_temp_f: dailyData.temperature_2m_max * 9/5 + 32,
                        min_temp_c: dailyData.temperature_2m_min,
                        min_temp_f: dailyData.temperature_2m_min * 9/5 + 32,
                        avg_temp_c: dailyData.temperature_2m_mean,
                        avg_temp_f: dailyData.temperature_2m_mean * 9/5 + 32,
                        max_wind_speed_kph: dailyData.windspeed_10m_max,
                        max_wind_speed_mph: dailyData.windspeed_10m_max * 0.621371,
                        total_precipitation_mm: dailyData.precipitation_sum,
                        total_precipitation_in: dailyData.precipitation_sum * 0.039370078740157,
                        avg_visibility_km: null,
                        avg_visibility_mi: null,
                        will_it_rain: dailyData.precipitation_sum > 0 ? 1 : 0,
                        will_it_snow: dailyData.snowfall_sum > 0 ? 1 : 0,
                        day_chance_rain: dailyData.precipitation_probability_max,
                        day_chance_snow: null,
                        avg_humidity: null,
                        daily_condition: convertWMOCodeToWeatherCondition(dailyData.weathercode),
                        daily_uv_index: dailyData.uv_index_max,
                        sunrise: dailyData.sunrise,
                        sunset: dailyData.sunset,
                        moonrise: null,
                        moonset: null,
                        moon_phase: null,
                    },
                    hourly_information: hourly_information_arr,
                }
            }
        });
    });
    return weatherForecastArr;
};

//Date Format: YYYY-MM-DD
//For simplicity sake, we only get the data for the America/New_York (EDT) timezone
const fetchHistoricalData = (lat, lon, start_date, end_date) => {
    let url = 'https://archive-api.open-meteo.com/v1/archive?latitude='+lat+'&longitude='+lon+'&start_date='+start_date+'&end_date='+end_date+'&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean,sunrise,sunset,shortwave_radiation_sum,rain_sum,snowfall_sum,precipitation_hours,windspeed_10m_max&timezone=America%2FNew_York';
    let historicalDataArr = [];

    fetch(url).then(res => {
        if (res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + res.status);
            return;
        }
        res.json().then(data => {
            for (let i=0; i < data.time.length; i++) {
                const historicalDataObject = {
                    type: 'historical-day',
                    date: data.time[i],
                    max_temp_c: data.temperature_2m_max[i],
                    max_temp_f: data.temperature_2m_max[i] * 9/5 + 32,
                    min_temp_c: data.temperature_2m_min[i],
                    min_temp_f: data.temperature_2m_min[i] * 9/5 + 32,
                    avg_temp_c: data.temperature_2m_mean[i],
                    avg_temp_f: data.temperature_2m_mean[i] * 9/5 + 32,
                    max_relative_temp_c: data.apparent_temperature_max[i],
                    max_relative_temp_f: data.apparent_temperature_max[i] * 9/5 + 32,
                    min_relative_temp_c: data.apparent_temperature_min[i],
                    min_relative_temp_f: data.apparent_temperature_min[i] * 9/5 + 32,
                    avg_relative_temp_c: data.apparent_temperature_mean[i],
                    avg_relative_temp_f: data.apparent_temperature_mean[i] * 9/5 + 32,
                    sunrise: data.sunrise[i],
                    sunset: data.sunset[i],
                    total_solar_radiation: data.shortwave_radiation_sum[i], //MJ/m2
                    total_rain_mm: data.rain_sum[i],
                    total_rain_in: data.rain_sum[i] * 0.0393701,
                    total_snowfall_mm: data.snowfall_sum[i],
                    total_snowfall_in: data.snowfall_sum[i] * 0.0393701,
                    precipitation_hours: data.precipitation_hours[i],
                    max_wind_speed_kph: data.windspeed_10m_max[i],
                    max_wind_speed_mph: data.windspeed_10m_max[i] * 0.621371,
                    min_wind_speed_kph: data.windspeed_10m_min[i],
                    min_wind_speed_mph: data.windspeed_10m_min[i] * 0.621371,
                    avg_wind_speed_kph: data.windspeed_10m_mean[i],
                    avg_wind_speed_mph: data.windspeed_10m_mean[i] * 0.621371,
                };
                historicalDataArr.push(historicalDataObject);
            }
        });
    });
    return historicalDataArr;
};

const fetchWeatherData = (lat, lon) => {
    //APIs are ranked arbitrarily according to my personal preference and observations on the quality and amount of data provided
    //1) WeatherAPI
    //2) OpenMeteo
    //3) OpenWeatherMap

    let weatherData = null;
    weatherData = fetchWeatherAPIForecast(lat, lon);
    if(weatherData !== undefined || weatherData.length > 0) {
        return weatherData;
    }
    weatherData = fetchOpenMeteoHourlyForecast(lat, lon);
    if(weatherData !== undefined || weatherData.length > 0) {
        return weatherData;
    }
    weatherData = fetchOpenWeatherCurrent(lat, lon).concat(fetchOpenWeatherHourly(lat, lon));
    return weatherData;
}

export default {fetchWeatherData, fetchHistoricalData};