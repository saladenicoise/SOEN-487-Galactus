<template>
  <main id="mainHomePage">


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
import WeatherInfo from '../components/WeatherInfo.vue'


export default {
  components: { WeatherInfo }
}
</script>