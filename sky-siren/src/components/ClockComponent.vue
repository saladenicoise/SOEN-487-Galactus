<template>

   <main>


      <div id="clock">
         <p class="date">{{ date }}</p>
         <p class="time">{{ time }}</p>

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

#clock {
  font-family: "Share Tech Mono", monospace;
  color: #ffffff;
  text-align: center;
  position: absolute;
  left: 80%;
  bottom: 15vh;
  transform: translate(-50%, -50%);
  color: #daf6ff;
  text-shadow: 0 0 20px #0aafe6, 0 0 30px rgba(10, 175, 230, 0);
}
#clock .time {
  letter-spacing: 0.05em;
  font-size: 32px;

}
#clock .date {
  letter-spacing: 0.1em;
  font-size: 14px;
}

</style>