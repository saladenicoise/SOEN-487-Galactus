<template>
    <main style="color: aliceblue;">

        <ClockComponent />

        <div class="searchbar">
            <input type="text" name="city" id="city" v-model="city">
            <button class="btn" @click="getWeather">Search</button>
        </div>

        <WeatherCircles />

        <div class="weather-data">
            <div v-if="loading">Loading...</div>
            <div v-if="error">{{ error }}</div>
            <div v-if="currentTemp">
                <h3>Current Weather for {{ locationName }}</h3>
                <p>Temperature: {{ currentTemp }}° {{ temperatureUnit }}</p>
                <p>Min: {{ dailyMin }}° {{ temperatureUnit }} - Max: {{ dailyMax }}° {{ temperatureUnit }}</p>
                <p>Weather Condition: {{ currentWeatherCondition }}</p>
                <p>Wind Speed: {{ windSpeed }} KM/H ({{ windDirection }})</p>
                <p>Humidity: {{ humidity }}%</p>
                <p>Visibility: {{ visibility }} KM</p>
                <p>UV Index: {{ uvIndex }}</p>
                <p>Pressure: {{ pressure }} MB</p>
            </div>
        </div>

        <div class="charts" v-if="forecastVisualData">
            <img :src="'data:image/png;base64,' + forecastVisualData" alt="Weather Forecast" />
        </div>
    </main>
</template>

<style>
@import '@/assets/home.css';
</style>

<script setup>
/* Imports */
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import ClockComponent from '@/components/ClockComponent.vue';
import WeatherCircles from '@/components/WeatherCircles.vue';

const WEATHER_API_BASE_URL = 'http://localhost:3000';
const store = useStore();

const city = ref(''); // Vancouver
const locationName = ref(null);
const currentTemp = ref(null);
const temperatureUnit = ref(null);
const dailyMin = ref(null);
const dailyMax = ref(null);

const currentWeatherCondition = ref(null);
const windSpeed = ref(null);
const windDirection = ref(null);
const humidity = ref(null);
const visibility = ref(null);
// maybe
const uvIndex = ref(null);
const pressure = ref(null);

const forecastVisualData = ref(null);
const historicalDataLimit = ref(7);
const weatherData = ref(null);
const loading = ref(false);
const error = ref(null);
const userPreferences = computed(() => store.getters['user/userData']);

// Dates for historical weather data
const endDate = new Date();
const getBeginDate = () => {
    const beginDate = new Date();
    beginDate.setDate(beginDate.getDate() - historicalDataLimit.value);
    return beginDate;
};

// Once the component is mounted, fetch the weather data for the user's IP address
onMounted(() => {
    if (!userPreferences.value || userPreferences.value.location === 'autoDetect' || userPreferences.value.city === null) {
        // getWeatherByIp();
    } else {
        // getWeatherByAddress(userPreferences.value.city);
    }
});

const getWeather = async () => {
    // getWeatherByAddress(city.value);
};

const processWeatherData = (rawWeatherData) => {

    // console.log('Here is the raw weather data: ', rawWeatherData);
    const forecastCurrent = rawWeatherData.find((data) => data.type === 'forecast-current');
    // console.log(forecastCurrent);

    const forecastDay = rawWeatherData.find((data) => data.type === 'forecast-day');
    // console.log(forecastDay);

    if (userPreferences.value.temperatureUnit === 'fahrenheit') {
        currentTemp.value = forecastCurrent.temperature_f;
        temperatureUnit.value = 'F';
        dailyMin.value = forecastDay.daily_information.min_temp_f;
        dailyMax.value = forecastDay.daily_information.max_temp_f;
    } else {
        currentTemp.value = forecastCurrent.temperature_c;
        temperatureUnit.value = 'C';
        dailyMin.value = forecastDay.daily_information.min_temp_c;
        dailyMax.value = forecastDay.daily_information.max_temp_c;
    }

    currentWeatherCondition.value = forecastCurrent.weather_condition;
    windSpeed.value = forecastCurrent.wind_speed_kph;
    windDirection.value = forecastCurrent.wind_direction;
    humidity.value = forecastCurrent.humidity;
    visibility.value = forecastCurrent.visibility_km;
    uvIndex.value = forecastCurrent.uv_index;
    pressure.value = forecastCurrent.pressure_mb;
    //forecastVisualData.value = forecastDay.daily_information.daily_condition;
};

const requestConfig = {
    method: 'GET',
    //mode: 'no-cors',
    headers: {
        'Accept': 'application/json',
    }
};

const testIpCall = async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const ipApiData = await response.json();
    if (!response.ok) {
        console.log(ipApiData.message || 'Failed to fetch IP address.');
    }
    console.log('IP address: ', ipApiData.ip);
};

// Fetch the weather data for the user's IP address
const getWeatherByIp = async (ip = null, lang = 'en') => {
    console.log('Fetching weather data by IP', ip);
    loading.value = true;
    try {
        let url = `${WEATHER_API_BASE_URL}/fromIp?lang=${lang}`
        // If no IP address is provided, fetch it from the API
        if (!ip) {
            const response = await fetch('https://api.ipify.org?format=json');
            const ipApiData = await response.json();
            if (!response.ok) {
                console.log(ipApiData.message || 'Failed to fetch IP address.');
            }
            url += `&ip=${ipApiData.ip}`;
        }

        const response = await fetch(url);
        const dataDemonResponse = await response.json();
        if (!response.ok) {
            console.log(dataDemonResponse.message || 'Failed to fetch weather data.');
        }
        console.log('Weather data: ', dataDemonResponse.locationObject);
        locationName.value = dataDemonResponse.locationObject.city + ', ' + dataDemonResponse.locationObject.state;
        processWeatherData(dataDemonResponse.weatherData);
    } catch (err) {
        error.value = err.message;
    }
    loading.value = false;
};

const getWeatherByAddress = async (cityName, lang = 'en') => {
    console.log('Fetching weather data by address...', cityName);
    loading.value = true;
    try {
        let response = await fetch(`${WEATHER_API_BASE_URL}/fromAddress?lang=${lang}&cityName=${cityName}`, requestConfig);
        let dataDemonResponse = await response.json();
        if (!response.ok) {
            console.log(dataDemonResponse.message || 'Failed to fetch weather data.');
        }

        locationName.value = dataDemonResponse.locationObject.city + ', ' + dataDemonResponse.locationObject.state;
        processWeatherData(dataDemonResponse.weatherData);
    } catch (err) {
        console.log(err);
        error.value = err.message;
    }
    loading.value = false;
};

const getWeatherByIpHistorical = async (ip = null, lang, beginDate, endDate) => {
    // endpoint: fromIpHistorical
    loading.value = true;
    try {
        let url = `${WEATHER_API_BASE_URL}/fromIpHistorical?lang=${lang}&beginDate=${beginDate}&endDate=${endDate}`
        // If no IP address is provided, fetch it from the API
        if (!ip) {
            const response = await fetch('https://api.ipify.org?format=json');
            const ipApiData = await response.json();
            if (!response.ok) {
                console.log(ipApiData.message || 'Failed to fetch IP address.');
            }

            url += `&ip=${ipApiData.ip}`;
        }

        const response = await fetch(url);
        const dataDemonResponse = await response.json();
        if (!response.ok) {
            console.log(dataDemonResponse.message || 'Failed to fetch weather data.');
        }
        weatherData.value = dataDemonResponse;

    } catch (err) {
        error.value = err.message;
    }
};

const getWeatherByAddressHistorical = async (cityName, lang, beginDate, endDate) => {
    // endpoint: fromAddressHistorical
    loading.value = true;
    try {
        const response = await fetch(`${WEATHER_API_BASE_URL}/fromAddressHistorical?lang=${lang}&cityName=${cityName}&beginDate=${beginDate}&endDate=${endDate}`);
        const dataDemonResponse = await response.json();
        if (!response.ok) {
            console.log(dataDemonResponse.message || 'Failed to fetch weather data.');
        }
        weatherData.value = dataDemonResponse;
    } catch (err) {
        error.value = err.message;
    }
    loading.value = false;
};

</script>