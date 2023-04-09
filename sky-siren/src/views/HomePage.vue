<template>
  <main id="mainHomePage">
<div>
<weather-data></weather-data>
<weather-circles></weather-circles>
</div>

  </main>
</template>

<style scoped>

 main {
  background-image: url('https://wallpapercave.com/wp/UkpUlVc.jpg');
    height: 100vh;
    width: 100vw;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: -100;

  }


</style>
<script>
import WeatherData from '../components/WeatherData.vue';
import WeatherCircles from '../components/WeatherCircles.vue';
export default {
  name: 'HomePage',
  components: {
   'WeatherData': WeatherData,
   'WeatherCircles': WeatherCircles
  },
}
</script>
