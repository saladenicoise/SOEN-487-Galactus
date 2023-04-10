<template>
  <main id="mainHomePage">
    <div>
      <Clock-component></Clock-component>
      <SearchBar></SearchBar>
        <WeatherData></WeatherData>
        <weather-circles ></weather-circles>

    </div>
  </main>
</template>

<style scoped>
  main {
    margin: 0;
    padding: 0;
    position: relative;

    /*The image */
    background-image: url('https://wallpapercave.com/wp/UkpUlVc.jpg');

    height: 100vh;
    width: 100vw;
  /* Center and scale the image  */
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    overflow: hidden;
    z-index: -100;

  }




</style>
<script>
/*Importing components */
  import WeatherCircles from '../components/WeatherCircles.vue';
 import ClockComponent from '../components/ClockComponent.vue';
import SearchBar from '../components/SearchBar.vue';

  export default {
   name: 'HomePage',
    components: {

      'Clock-component': ClockComponent,
      'WeatherCircles': WeatherCircles,
      'SearchBar': SearchBar,
    },
  }
</script>
