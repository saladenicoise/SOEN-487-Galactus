<template>
    <main id="mainHomePage">
        <h1 class="h3 mb-3 fw-normal">Lock up the weather forecast</h1>
        <form class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-12" @submit.prevent="searchWeather">
            <div class="row">
                <div class="col-8">
                    <div class="form-floating mb-4">
                        <input type="city" class="form-control" id="city" v-model="city"  placeholder="City">
                        <label for="city">City</label>
                    </div>
                </div>
                <div class="col-4 mt-2">
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
        <div class="wrap">
  <div class="container">
  <div class="box">
    <div class='smoke'>
    </div>
  </div>
</div>
</div>
    </main>
</template>

<style scoped>
#mainHomePage {
	background-image: url('https://wallpapercave.com/wp/UkpUlVc.jpg');
    background-repeat: no-repeat;
 -moz-background-clip: border-box;
 background-size:cover;
  overflow: hidden;
}

*, body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrap {
  height: 100vh;
  margin-bottom: 100px;
}

.box {
  border-radius: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
  height: 50%;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/smoke_texture2714-min.jpg") center center no-repeat;
  background-size: cover;
  box-shadow: 0 3rem 5rem -2rem rgba(0, 0, 0, 0.8);
  z-index: 1;
  overflow: hidden;
}
.box .smoke {
  border-radius: 100%;
  position: absolute;
  top: -10%;
  left: -10%;
  transform: translate3d(0, 0, 0) rotate(0.01deg);
  width: 50%;
  height: 50%;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/537051/smoke-min.png") center center no-repeat;
  background-size: cover;
  z-index: -10;
  opacity: 0.5;
  animation: smokebg 60s infinite alternate;
}
@keyframes smokebg {
  25% {
    transform: translate3d(100px, 0, 0) rotate(0.01deg);
  }
  50% {
    transform: translate3d(75px, -25px, 0) rotate(0.01deg);
  }
  75% {
    transform: translate3d(45px, 30px, 0) rotate(0.01deg);
  }
  100% {
    transform: translate3d(25px, -15px, 0) rotate(0.01deg);
  }
}

</style>