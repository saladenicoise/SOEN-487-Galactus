<template>
  <main id="mainAboutPage">
    <div>
      <h1>L'équipe</h1>
    
      <div v-for="member in teamMembers" :key="member.studentId">
        {{ member.name }} - {{ member.studentId }} - <a :href="'https://github.com/' + member.githubUsername">{{ member.githubUsername }}</a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const teamMembers = ref([
  {
    name: 'Jules Petit',
    studentId: '40110945',
    githubUsername: 'saladenicoise',
  },
  {
    name: 'Elias Sabbagh',
    studentId: '40110044',
    githubUsername: 'EliasSabbagh47',
  },
  {
    name: 'Jaskaran Dhadda',
    studentId: '40045833',
    githubUsername: 'jaskaran-dhadda',
  },
  {
    name: 'Christopher Di Giacomo',
    studentId: '40133600',
    githubUsername: 'chrisdigiacs',
  },
  {
    name: 'Carolina Quesada Vilchez',
    studentId: '40099828',
    githubUsername: 'Quoiquecesoit',
  },
  {
    name: 'Khaled Al Koudmani',
    studentId: '29199160',
    githubUsername: 'kkodmani',
  },
  {
    name: 'Mikhail Ovsyannikov',
    studentId: '40158506',
    githubUsername: 'allfatherWednesday',
  },
  {
    name: 'Noah-James Dinh',
    studentId: '40128079',
    githubUsername: 'eyeshield2110',
  },
  {
    name: 'Rama Alrifai',
    studentId: '40116096',
    githubUsername: 'riri404',
  }
]);
</script>

<style scoped>
#mainAboutPage {
  padding: 0;
  background: url("/blurred.jpg") no-repeat center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  opacity: 0.9;
  z-index: -100;

}

#mainAboutPage div {
  position: relative;
  height: fit-content;
  width: fit-content;
  font-size: 2vw;
  line-height: 150%;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: x-large;
  text-align: center;
  margin: auto;
  overflow: hidden;
  box-shadow: #151823fa 0px 40px 40px 40px;
  background: #151823;
  animation: animateGlow 10s ease infinite;
  animation: textColor 10s ease infinite;
}

#mainAboutPage div:after {
  position: relative;
  content: "";
  top: 5vw;
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  transform: scale(1);
}

@keyframes animateGlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes textColor {
  0% {
    color: #00a68a;
  }
  25% {
    color: #83d47d;
  }
  50% {
    color: #007480
  }
  75% {
    color: #9aae95;
  }
  100% {
    color: #00a68a
  }
}
</style>