<template>
  <div>
    <form @submit.prevent="searchWeather">
<div class="searchbar">
              <input   type="city" id="city" v-model="city" placeholder="City">
        <button style="width: auto;" type="submit"> Search</button>
</div>
      </form>
    <div class="card-circle centered">
      <p>Montreal, CA</p>
      <p class="mb-2">Current temperature: <strong>5°C</strong></p>
      <p>Feels like: <strong>4°C</strong></p>
      <p>Max: <strong>9°C</strong>, Min: <strong>3°C</strong></p>
    </div>
  </div>
</template>

<style scoped>
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .card-circle {
    border-radius: 0.5rem;
    box-shadow: 0 5px 10px var(--dark);
    top: 30vh;
    color: #000;
    text-align: center;
    font-family: verdana;
    line-height: 130%;
    font-size: 1.5rem;
    font-weight: 800;
    z-index: 1;
    block-size: auto;
  }
  .searchbar {
    position: absolute;
    padding: 1rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    box-shadow: 0 5px 5px var(--dark);
    box-sizing:content-box;
    Background: linear-gradient(360deg, rgba(23, 31, 43, 1) 20%, rgba(32, 46, 60, 1) 50%, rgba(39, 57, 72, 1) 60%, rgba(37, 56, 68, 1) 70%, rgba(36, 59, 85, 1) 80%, rgba(23, 31, 43, 1) 95%);
    border: 1px groove var(--dark);
    border-width: 10px;
    border-radius: 15px;
    font-family: verdana;
    font-weight: 800;
    z-index: 1;
  top:10vh;
  left: 50%;
    transform: translate(-50%, -50%);
    background-clip: padding-box;
  }
  .searchbar button {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px
  }
  .card {
    display: flex;
    justify-content: center;
    width: 300px;
    height: 180px;
    position: relative;
    align-items: center;
    background-color: rgb(194, 37, 194);
    box-shadow: 5px 4px 0px rgba(0, 0, 0, 0.3);
  }
  .card:before {
    content: '';
    position: absolute;
    width: 0;
    height: 100px;
  }
  .card:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    margin-top: -50px;
    margin-left: 60px;
    animation: rotate 5s infinite;
  }
</style>
<script>
  export default {
    name: 'WeatherData'
  }
</script>