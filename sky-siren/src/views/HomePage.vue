<template>
  <main id="mainHomePage">
    <div>
      <Clock-component></Clock-component>
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
    background-size: fit;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    z-index: -100;
  }

  .element {
    float: left;
    shape-outside: circle(50%);
    width: 200px;
    height: 200px;
  }
</style>
<script>
  import WeatherData from '../components/WeatherData.vue';
  import WeatherCircles from '../components/WeatherCircles.vue';
 import ClockComponent from '../components/ClockComponent.vue';

  export default {
    name: 'HomePage',
    components: {
      'WeatherData': WeatherData,
      'Clock-component': ClockComponent,
      'WeatherCircles': WeatherCircles
    },
  }
</script>
