<template>
       <h1 class="h3 mb-3 fw-normal">Lock up the weather forecast</h1>
    <form class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-12" @submit.prevent="searchWeather">
      <div class="row">
        <div class="col-8">
          <div class="form-floating mb-4">
            <input type="city" class="form-control" id="city" v-model="city" placeholder="City">
            <label for="city">City</label>
          </div>
        </div>
        <div class="btn-outline-primary">
          <button type="submit" class="btn btn-outline-primary"><i class="bi bi-search"></i> Search</button>
        </div>
      </div>
    </form>
    <div class="card-body">
      <h4 class="mb-1 sfw-normal">Montreal, CA</h4>
      <p class="mb-2">Current temperature: <strong>5°C</strong></p>
      <p>Feels like: <strong>4°C</strong></p>
      <p>Max: <strong>9°C</strong>, Min: <strong>3°C</strong></p>
    </div>
</template>

<script>
export default {
    name: 'WeatherData'}
</script>