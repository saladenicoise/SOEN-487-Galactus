<template>

   <!--This class is flex and all children with margin 0 will be affected-->
   <main class="home-main" style="color: aliceblue;">
<!--Clock-->
        <ClockComponent />
<!--Search bar-->
        <div class="searchbar">
            <input type="text" name="city" id="city" v-model="city" placeholder="⌕‍" required>
            <button class="btn" @click="getWeather">Search</button>
        </div>

<!--Top plate-->
    <!-- <div class="loadingerror">

        <h1>Loading...</h1>
        <h1> error</h1>

    </div> -->
<!--main circle-->
    <div class="alignCircles">
        <WeatherCircles />
    </div>

<!--main text-->

        <div class="alignCircles textstyle" >
                <p v-if="loading">Loading...</p>
                <p v-if="error">{{ error }}</p>
                <div v-if="currentTemp">
                <h2>{{ locationName }}</h2>
                <p>Temperature: {{ currentTemp }}° {{ temperatureUnit }}</p>
                <p>Min: {{ dailyMin }}° {{ temperatureUnit }} - Max: {{ dailyMax }}° {{ temperatureUnit }}</p>
                <p>Weather Condition: {{ currentWeatherCondition }}</p>
                </div>
                <div v-else>
                <p>Unable to fetch data</p>
                </div>
        </div>


<!--This is not yet styled-->
            <div class="wData">
                <div class="wCard">
                <p>Wind Speed: {{ windSpeed }} KM/H ({{ windDirection }})</p>
                <p>Humidity: {{ humidity }}%</p>
                <p>Visibility: {{ visibility }} KM</p>
                <p>UV Index: {{ uvIndex }}</p>
                <p>Pressure: {{ pressure }} MB </p>
            </div>
            </div>
    <div class="weather">          
            <img style="width: 80%;" :src="'data:image/svg+xml;base64, ' + forecastVisualData" alt="Weather Forecast" />
        </div>     
    </main>
</template>

<style>
@import '@/assets/home.css';
</style>

<script>
/*This part is important and must be the first thing on top of the script */
import ClockComponent from '@/components/ClockComponent.vue'
import WeatherCircles from '@/components/WeatherCircles.vue'
export default {
    name: 'HomePage',
    components: {
        'ClockComponent': ClockComponent,
        'WeatherCircles': WeatherCircles
      }
}
</script>
<script setup>
/* Imports */
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const WEATHER_API_BASE_URL = 'http://161.35.253.52';
const store = useStore();

const city = ref(''); // Vancouver
const locationName = ref(null);
const currentTemp = ref(null);
const temperatureUnit = ref('C');
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
    if(!userPreferences.value || userPreferences.value.location === 'autoDetect' || userPreferences.value.city === null) {
        getWeatherByIp();
    } 
    else {
        getWeatherByAddress(userPreferences.value.city);
    }

});

const getWeather = async () => {
    if(city.value)
    getWeatherByAddress(city.value);
};

const processWeatherData = (rawWeatherData, rawVisualData) => {

    // console.log('Here is the raw weather data: ', rawWeatherData);
    const forecastCurrent = rawWeatherData.find((data) => data.type === 'forecast-current');
    // console.log(forecastCurrent);

    const forecastDay = rawWeatherData.find((data) => data.type === 'forecast-day');
    // console.log(forecastDay);
    currentTemp.value = forecastCurrent.temperature_c;
    temperatureUnit.value = 'C';
    dailyMin.value = forecastDay.daily_information.min_temp_c;
    dailyMax.value = forecastDay.daily_information.max_temp_c;

    if(userPreferences.value && userPreferences.value.temperatureUnit === 'fahrenheit') {
        currentTemp.value = forecastCurrent.temperature_f;
        temperatureUnit.value = 'F';
        dailyMin.value = forecastDay.daily_information.min_temp_f;
        dailyMax.value = forecastDay.daily_information.max_temp_f;
    }  
    
    currentWeatherCondition.value = forecastCurrent.weather_condition;
    windSpeed.value = forecastCurrent.wind_speed_kph;
    windDirection.value = forecastCurrent.wind_direction;
    humidity.value = forecastCurrent.humidity;
    visibility.value = forecastCurrent.visibility_km;
    uvIndex.value = forecastCurrent.uv_index;
    pressure.value = forecastCurrent.pressure_mb;
    forecastVisualData.value = rawVisualData.celsiusChart;
};

const requestConfig = {
    method: 'GET',
    //mode: 'no-cors',
    headers: {
        'Accept': 'application/json',
    }
};


// Fetch the weather data for the user's IP address
const getWeatherByIp = async (ip = null, lang = 'en') => {
    console.log('Fetching weather data by IP', ip);
    loading.value = true;
    try {
        let url = `${WEATHER_API_BASE_URL}/fromIp?lang=${lang}`

        const response = await fetch(url);
        const dataDemonResponse = await response.json();
        if (!response.ok) {
            console.log(dataDemonResponse.message || 'Failed to fetch weather data.');
        }
        console.log('Weather data: ', dataDemonResponse.locationObject);
        if(dataDemonResponse.locationObject.city){
            locationName.value = dataDemonResponse.locationObject.city + ', ' + dataDemonResponse.locationObject.state;
        }else{
            locationName.value = dataDemonResponse.locationObject.country;
        }
        processWeatherData(dataDemonResponse.weatherData, dataDemonResponse.forecastVisualData);
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
        console.log(dataDemonResponse, dataDemonResponse.forecastVisualData);
        locationName.value = dataDemonResponse.locationObject.city + ', ' + dataDemonResponse.locationObject.state;
        processWeatherData(dataDemonResponse.weatherData, dataDemonResponse.forecastVisualData);
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
<style scoped>
/*This takes care of displaying the plate on the very top */
.loadingerror {
    position: absolute;
  top: 20%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: linear-gradient(
    360deg,
    rgba(23, 31, 43, 1) 20%,
    rgba(32, 46, 60, 1) 50%,
    rgba(39, 57, 72, 1) 60%,
    rgba(37, 56, 68, 1) 70%,
    rgba(36, 59, 85, 1) 80%,
    rgba(23, 31, 43, 1) 95%
  );
  box-sizing: content-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;

}
/*This one styles the main text of the main circle */
.textstyle {
    font-size: 20px;
    line-height: 150%;
    text-shadow: 0 0 10px #0a9ecf, 0 0 10px rgba(7, 42, 90, 0.834);
    color: #03e9f4;
}
/*This one styles only the city of the main circle */
h2{
    font-weight: bold;
    font-size: 30px;
    line-height: 200%;
}

/*This one makes a transparent centered card-like layout for the main circle and the main text */
.alignCircles {
position: absolute;
display: block;
  top: 50%;
  left: 50%;
  width: auto;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: transparent;
  box-sizing: border-box;

}

.weather{
    margin-left: 40%;
    margin-top: 7%;
    
}
.wData{
    margin-top: 23%;
    margin-left: 10%;
}
.wCard{
    margin-top: -37%;
    margin-right: auto;
    margin-left: auto;
    width: 260px;
    box-shadow: 0 15px 25px rgba(129, 124, 124, 0.2);
    height: 200px;
    border-radius: 5px;
    backdrop-filter: blur(14px);
    background-color: rgba(255, 255, 255, 0.2);
    padding: 10px;
    text-align: center;
    font-size: 20px;
    line-height: 150%;
    text-shadow: 0 0 10px #0a9ecf, 0 0 10px rgba(7, 42, 90, 0.834);
    color: #03e9f4;
}   

  @media (max-width: 1280px) {
    .weather {
    margin-left: 40%;
    margin-top: 15%;
    
    }
    
    .wCard{
    margin-left:7%;
    transform: translate(-50%, -50%);
    margin-top: 25%;
    }
    @media (max-width: 920px) {
    .weather {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
  display: none; /* hide the content by default */
    }
    .wCard{
        margin-left: 100%;
    
    transform: translate(-50%, -50%);
    margin-top: 320%;
    }
  }
    @media (max-width: 820px) {
    .weather {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
  display: none; /* hide the content by default */
    }
    
    .wCard{
    margin-left: 90%;
    transform: translate(-50%, -50%);
    margin-top: 300%;
    }
  }
  @media (max-width: 786px) {

.weather {
position: fixed;
bottom: 0;
right: 0;
background-color: #fff;
padding: 10px;
display: none; 
}
.wCard{
    margin-left: 80%;
    
    transform: translate(-50%, -50%);
    margin-top: 258%;
}
}
@media (max-width: 600px) {
    /* adjust the styles for smaller screens */
     .weather {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #fff;
  padding: 10px;
  display: none; /* hide the content by default */
    }
    
    .wCard{
        margin-left: 30%;
        margin-right: auto;
        width: 100%; 
        max-width: 260px; 
        box-shadow: 0 15px 25px rgba(129, 124, 124, 0.2);
        height: auto; 
        padding: 10px;
        text-align: center;
        font-size: 15px;
        margin-top: 210%;
        transform: translate(-50%, -50%);
    }
    .alignCircles {
        font-size: 15px;
        padding: 10px;
    }
  }
  }
</style>