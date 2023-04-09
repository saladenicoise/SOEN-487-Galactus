<template>
  <form  @submit.prevent="searchWeather">
    <h1>Look up the weather forecast</h1>

            <input class=" searchbar"  type="city" id="city" v-model="city" placeholder="City">

        <div >

          <button style="width: auto;" type="submit"> Search</button>
        </div>

    </form>

    <div class="card-circle centered">
      <p>Montreal, CA</p>
      <p class="mb-2">Current temperature: <strong>5°C</strong></p>
      <p>Feels like: <strong>4°C</strong></p>
      <p>Max: <strong>9°C</strong>, Min: <strong>3°C</strong></p>
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
  box-shadow: 0 1px 3px var(--dark);
  padding: 1.25rem;
  margin: 1rem;
  top: 30vh;
  color: #000;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-stretch: semi-expanded;
  line-height: 130%;
  font-size: 1.5rem;
  font-weight: 800;
  z-index: 1;
}


.searchbar {
  position: absolute;
  display: flex;
   justify-content: center;
  align-items: center;
  top: 10vh;
  left: 50%;
  width: 15vw;
  background: var(--dark);
  border-block-color: var(--light);
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  line-height: 130%;
  font-stretch: semi-expanded;
  font-size: 1.5rem;
  font-weight: 600;
  z-index: 1;
  color: var(--primary);

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

.searchbar button:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
    0 0 25px #03e9f4,
    0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}




</style>
<script>
export default {
    name: 'WeatherData'
    }
  </script>