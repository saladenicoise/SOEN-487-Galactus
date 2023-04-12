<template>
   <div id="clock">
      <div class="theTime">{{ theTime }}</div>
      <div class="theDate">{{ theDate }}</div>
   </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const theTime = ref("");
const theDate = ref("");

onMounted(() => {
   getTime();
   setInterval(getTime, 1000);
});

const getTime = () => {
   let todayDate = new Date();
   theDate.value = todayDate.toLocaleDateString();
   theTime.value = todayDate.toLocaleTimeString();
}
</script>

<style scoped>
#clockmain {
   box-sizing: border-box;
}

#clock {
   font-family: "Share Tech Mono", monospace;
   position: absolute;

   padding: 10.9px 10.9px;
   margin: 0;
   display: flex;
   box-sizing: border-box;
   background: linear-gradient(360deg, rgba(23, 31, 43, 1) 20%, rgba(32, 46, 60, 1) 50%, rgba(39, 57, 72, 1) 60%, rgba(37, 56, 68, 1) 70%, rgba(36, 59, 85, 1) 80%, rgba(23, 31, 43, 1) 95%);
   border: 1px groove var(--dark);
   border-width: 10px;
   border-radius: 25px;
   font-family: verdana;
   font-size: 16px;
   z-index: 1;
   top: 10vh;
   left: 20vw;
   transform: translate(-50%, -50%);
   background-clip: border-box;
   margin-top: -1%;
}

#clock .theTime {

   letter-spacing: 0.05em;
   font-size: 32px;
   text-shadow: 0 0 10px #0a9ecf, 0 0 10px rgba(7, 42, 90, 0.834);
   color: #03e9f4;


}

#clock .theDate {
   letter-spacing: 0.1em;
   font-size: 14px;
   text-shadow: 0 0 10px #0a9ecf, 0 0 10px rgba(7, 42, 90, 0.834);
   color: #03e9f4;
}


@keyframes textColor {
   0% {
      color: var(--light);
   }

   50% {
      color: var(--grey);
   }

   75% {}

   100% {
      color: var(--light);
   }
   
}
@media (max-width: 600px) {
    /* adjust the styles for smaller screens */
     #clock {
      margin-left: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 2%;
    }
  }
  @media (max-width: 786px) {
    /* adjust the styles for smaller screens */
     #clock {
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media (max-width: 820px) {
    /* adjust the styles for smaller screens */
     #clock {
      left: 50%;
      transform: translate(-50%, -50%);
      top: 5%;
    }
  }
  @media (max-width: 920px) {
    /* adjust the styles for smaller screens */
     #clock {
      left: 50%;
      transform: translate(-50%, -50%);
      top: 5%;
    }
  }
  @media (max-width: 1024px) {
    /* adjust the styles for smaller screens */
     #clock {
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>