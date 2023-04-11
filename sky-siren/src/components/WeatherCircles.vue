<template>

    <div class="border">
        <div class="outer-circle">
            <div class="middle-circle">

            </div>
        </div>
    </div>




 </template>

<script>
export default {
   name: "WeatherCircles"
}
</script>

 <style scoped>
/* Eye */



/* Eye */

 .border {
    position: relative;
    height: 500px;
    width: 500px;
    border: 15px dashed rgba(0, 0, 0, 0.9);
    border-radius: 50%;
    margin: auto;
    box-shadow: 0 0 50px rgba(36, 59, 85, 1);
    animation: glow 2.5s infinite backwards;
}

.outer-circle {
    position: relative;
    top: 10px;
    background-color: transparent;
    border: 25px groove rgba(39, 57, 72, 1) ;
    height: 450px;
    width: 450px;
    border-radius: 50%;
    margin: 0 auto;
    box-shadow: 0 0 50px rgba(32, 46, 60, 1);
    animation: rotateClock 45s infinite ;
}

.middle-circle {
    position: relative;
    top: 6px;
    height: 400px;
    width: 400px;
    margin: 0 auto;
    border-radius: 50%;
     border: 15px dashed rgba(23, 31, 43, 1) ;
    background: radial-gradient(
        rgba(23, 31, 43, 1) 20%,
        rgba(32, 46, 60, 1) 50%,
        rgba(39, 57, 72, 1) 60%,
        rgba(37, 56, 68, 1) 70%,
        rgba(36, 59, 85, 1) 80%,
        rgba(23, 31, 43, 1) 95%
        );
        background-clip: padding-box;
        animation: rotateClock-2 45s infinite;
}

@keyframes glow {
    0% {
        box-shadow: 0 0 50px #74e4fc;
    }
    25% {
        box-shadow: 0 0 60px #74e4fc;
    }
    50% {
        box-shadow: 0 0 100px #74e4fc;
    }
    75% {
        box-shadow: 0 0 60px #74e4fc;
    }
    100% {
        box-shadow: 0 0 50px #74e4fc;
    }
}

@keyframes rotateClock {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(45deg);
    }
    50% {
        transform: rotate(90deg);
    }
    75% {
        transform: rotate(45deg);
    }
    100% {
        transform: rotate(360deg);
    }

}
@keyframes rotateClock-2 {
    0% {
        transform: rotate(360deg);
    }
    25% {
        transform: rotate(45deg);
    }
    50% {
        transform: rotate(90deg);
    }
    75% {
        transform: rotate(45deg);
    }
    100% {
        transform: rotate(0deg);
    }

}


 </style>