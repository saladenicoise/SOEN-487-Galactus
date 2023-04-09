<template>








 </template>

<script>
export default {
   name: "WeatherInfo",
}
</script>

 <style scoped>


/* Eye */
.iris-container {
    position: relative;
    top: 50%;
    transform: perspective(1px) translateY(-50%);
}

.iris-container .border {
    background-color: rgba(112, 166, 219, 0.3);
    height: 265px;
    width: 265px;
    border: 25px inset rgba(0, 255, 128, 0.5);
    border-radius: 50%;
    margin: 0 auto;
    box-shadow: 0 0 50px rgba(0, 255, 128, 0.5);
    animation: glow 2.8s infinite backwards;
}

.outer-circle {
    position: relative;
    top: 2.5px;
    background-color: rgba(112, 166, 219, 0.3);
    height: 250px;
    width: 250px;
    border: 5px dotted rgba(0, 0, 0, 0.9);
    border-radius: 50%;
    margin: 0 auto;
    box-shadow: 0 0 50px rgba(0, 255, 128, 0.5);
    animation: rotateClock 40s infinite reverse;
}

.middle-circle {
    position: relative;
    top: 30px;
    height: 200px;
    width: 200px;
    margin: 0 auto;
    background-color: rgba(112, 219, 219, 0.4);
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.7);
    border: 5px dotted rgba(112, 219, 219, 0.9);
    animation: rotateClock-2 30s infinite;
}
.loading {
  cursor: pointer;
  font-size: 0.5em;
  color: white;
  font-weight: 100;
  width: 5.4em;
  height: 5.4em;
  line-height: 5.4em;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -1.5em;
  margin-top: -1.5em;
  border-radius: 100%;
  border: 2px solid #00d8ff;
  box-shadow: 0 0 0 0 #17262b, 0 0 2px 3px #00d8ff, 0 0 4px 25px #17262b, 0 0 1px 32px #17262b, 0 0 32px 25px #00d8ff, 0 0 32px 25px #17262b;
  animation: pulse 1.4s linear infinite;
  transition: all 0.3s ease;
}

/* Animations */

@keyframes glow {
    0% {
        box-shadow: 0 0 50px teal;
    }
    50% {
        box-shadow: 0 0 100px teal;
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

 @keyframes rotate {
   0% {
     transform: rotate(0deg);
   }
   100% {
     transform: rotate(360deg);
   }
}
 @keyframes pulse {
   0% {
     box-shadow: 0 0 0 0 #17262b, 0 0 2px 3px #00d8ff, 0 0 1px 32px #17262b, 0 0 32px 25px #00d8ff;
   }
   49.9% {
     box-shadow: 0 0 1px 32px #17262b, 0 0 32px 25px #00d8ff, 0 0 1px 64px #17262b, 0 0 60px 25px #00d8ff;
   }
   50% {
     box-shadow: 0 0 0 0 #17262b, 0 0 2px 3px #00d8ff, 0 0 1px 32px #17262b, 0 0 32px 25px #00d8ff;
   }
   100% {
     box-shadow: 0 0 1px 32px #17262b, 0 0 32px 25px #00d8ff, 0 0 1px 64px #17262b, 0 0 60px 25px #00d8ff;
   }
 }


 </style>