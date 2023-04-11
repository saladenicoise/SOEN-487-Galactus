<template>

   <!--This class is flex and all children with margin 0 will be affected-->
   <main class="home-main" style="color: aliceblue;">
<!--Clock-->
        <ClockComponent />
<!--Search bar-->
        <div class="searchbar">
            <input type="text" name="city" id="city" v-model="city" placeholder="⌕‍">
            <button class="btn" @click="getWeather">Search</button>
        </div>

<!--Top plate-->
    <div class="loadingerror">

        <h1>Loading...</h1>
        <h1> error</h1>

    </div>
<!--main circle-->
    <div class="alignCircles">
        <WeatherCircles />
    </div>

<!--main text-->

        <div class="alignCircles textstyle" >
            <h2>Winnipeg, Saskatchewan</h2>
            <p>Temperature: 9° C</p>
            <p>Min: 4.1° C - Max: 15.7° C</p>
            <p>Weather Condition: Clear</p>
        </div>


<!--This is not yet styled-->
    <p>Wind Speed: 19.1 KM/H (SW)</p>
    <p>Humidity: 66%</p>
    <p>Visibility: 14 KM</p>
    <p>UV Index: 1</p>
    <p>Pressure: 1025 MB</p>
    <div class="charts">        </div>
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
</style>