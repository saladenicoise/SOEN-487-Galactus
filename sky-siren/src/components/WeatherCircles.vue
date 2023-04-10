<template>



    <!-- iris eye -->
     <div class="iris-container ">
     <div class="border">
         <div class="outer-circle">
             <div class="middle-circle">
                 <div class="inner-circle">
                     <div class="led"></div>
                 </div>
             </div>
         </div>
     </div>
     </div>



 </template>

<script>
export default {
   name: "WeatherCircles",
}
</script>

 <style scoped>
body, html {
    padding: 0;
    margin: 0;
    height: 100%;
}
.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

/* Eye */
.iris-container {
    position: relative;
bottom:55vh;
    transform: perspective(1px) translateY(-50%);
}

.iris-container .border {
    background-color: rgba(112, 166, 219, 0.3);
    height: 365px;
    width: 365px;
    border: 15px inset rgba(0, 255, 128, 0.5);
    border-radius: 50%;
    margin: 0 auto;
    box-shadow: 0 0 50px rgba(0, 255, 128, 0.5);
    animation: glow 2.8s infinite backwards;
}

.outer-circle {
    position: relative;
    background-color: rgba(112, 166, 219, 0.3);
    height: 345px;
    width: 345px;
    border: 10px dotted rgba(0, 0, 0, 0.9);
    border-radius: 50%;
    bottom: 3%;
    right: 0;
    margin: auto;
    box-shadow: 0 0 50px rgba(0, 255, 128, 0.5);
    animation: rotateClock 30s infinite reverse;
}

.middle-circle {
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 300px;
    width: 300px;
    margin: auto;
    background-color: rgba(112, 219, 219, 0.4);
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.7);
    border: 5px dotted rgba(112, 219, 219, 0.9);
    animation: rotateClock-2 20s infinite;
}

.inner-circle {
    position: relative;
    top: 50px;
    height: 100px;
    width: 100px;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.5);
    animation: pulse 3.2s infinite;
}

.led {
    position: relative;
    top: 37.5px;
    width: 25px;
    height: 25px;
    margin: 0 auto;
    background-color: rgba(255, 0, 0, 0.5);
    border-radius: 50%;
}

/* Container */
.container .border {
	z-index: 1;
	opacity: 1;
	position: absolute;
	transition: all 250ms ease-in;
	border-style: solid;
	border-color: #029dbb;
	box-shadow: 0 0 4px rgba(2,157,187,0.65);
}

.container .border-left {
	top: 50%;
	left: 0;
	height: 100%;
	transform: translate(0, -50%);
	border-width: 0 0 0 1px;
}
.container .border-right {
	top: 50%;
	right: 0;
	height: 100%;
	transform: translate(0, -50%);
	border-width: 0 0 0 1px;
}
.container .border-top {
	top: 0;
	left: 50%;
	width: 100%;
	transform: translate(-50%, 0);
	border-width: 1px 0 0 0;
}
.container .border-bottom {
	bottom: 0;
	left: 50%;
	width: 100%;
	transform: translate(-50%, 0);
	border-width: 1px 0 0 0;
}

/* border angle*/
.container .border-angle {

	width: 24px;
	height: 24px;
	border-color: #26dafd;
	box-shadow: 0 0 4px -2px rgba(38,218,253,0.65);
	z-index: 2;
	opacity: 1;
	position: absolute;
	transition: all 250ms ease-in;
	border-style: solid;
}

.container .angle-top-left {
	left: -2px;
	top: -2px;
	border-width: 2px 0 0 2px;
}
.container .angle-top-right {
	right: -2px;
	top: -2px;
	border-width: 2px 2px 0 0;
}
.container .angle-bottom-left {
	left: -2px;
	bottom: -2px;
	border-width: 0 0 2px 2px;
}
.container .angle-bottom-right {
	right: -2px;
	bottom: -2px;
	border-width: 0 2px 2px 0;
}

/* Animations */
@keyframes pulse {
    0%{
        -webkit-transform: scale(1);
        transform: scale(1);
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
    }
    50%{
        -webkit-transform: scale(0.95);
        transform: scale(0.95);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    }
    100%{
        -webkit-transform: scale(1);
        transform: scale(1);
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
    }
}

@keyframes glow {
    0% {
        box-shadow: 0 0 50px rgba(0, 255, 204, 0.8);
    }
    50% {
        box-shadow: 0 0 100px rgba(0, 255, 204, 0.8);
    }
    100% {
        box-shadow: 0 0 50px rgba(0, 255, 204, 0.8);
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
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(45deg);
    }
    50% {
        transform: rotate(720deg);
    }
    75% {
        transform: rotate(45deg);
    }
    100% {
        transform: rotate(360deg);
    }

}


 </style>