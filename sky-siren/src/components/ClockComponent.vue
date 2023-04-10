<template>


      <div id="clock">
         <div class="time">{{ time }}</div>
         <div class="date">{{ date }}</div>

      </div>

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

 #clock {
  font-family: "Share Tech Mono", monospace;
   position: absolute;

    padding: 10.9px 10.9px;
    margin: 0;
    display: flex;
    box-sizing:border-box;
    Background: linear-gradient(360deg, rgba(23, 31, 43, 1) 20%, rgba(32, 46, 60, 1) 50%, rgba(39, 57, 72, 1) 60%, rgba(37, 56, 68, 1) 70%, rgba(36, 59, 85, 1) 80%, rgba(23, 31, 43, 1) 95%);
    border: 1px groove var(--dark);
    border-width: 10px;
    border-radius: 25px;
    font-family: verdana;
    font-size: 16px;
    z-index: 1;
  top:10vh;
  left: 20vw;
    transform: translate(-50%, -50%);
    background-clip: border-box;

   }

   #clock .time {

      letter-spacing: 0.05em;
      font-size: 32px;
      text-shadow: 0 0 10px #0a9ecf, 0 0 10px rgba(7, 42, 90, 0.834);
      color: #03e9f4;


}
#clock .date {
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

75%{

}
    100% {
color: var(--light);
    }
  }

</style>