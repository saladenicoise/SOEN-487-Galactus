<template>

   <main id="clockmain">


      <div id="clock">
         <div class="test">{{ time }}</div>
         <div class="date">{{ date }}</div>

      </div>
   </main>
</template>

<script>
export default {
   name: 'ClockComponent',
   data() {
      return {
         date: '',
         time: ''
      }
   },
   mounted() {
      this.getTime();
      setInterval(this.getTime, 1000);
   },
   methods: {
      getTime() {
         let date = new Date();
         this.date = date.toLocaleDateString();
         this.time = date.toLocaleTimeString();
      }
   },
}

</script>
<style scoped>
#clockmain {
  box-sizing: border-box;
}

#clockmain #clock {
  font-family: "Share Tech Mono", monospace;
  background-color:  #000000;
   box-shadow: 0 0 60px black, 0 0 60px black, 0 0 60px black, 0 0 60px black;
   border-radius: 15px;
   width: fit-content;
   height: fit-content;
  color: #ffffff;
  text-align: center;
  position: relative;
   top: 10vh;
   left: 20vw;
   transform: translate(-50%, -50%);
  color: #daf6ff;
   animation: textColor 10s infinite;

}

#clock .time {
  letter-spacing: 0.05em;
  font-size: 32px;


}
#clock .date {
  letter-spacing: 0.1em;
  font-size: 14px;
}


@keyframes textColor {
    0% {
      color: var(--light);
    }

    50% {
      color: var(--grey);
    }

75%{

}
    100% {
color: var(--light);
    }
  }

</style>