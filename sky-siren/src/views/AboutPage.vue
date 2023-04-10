<template>
  <main id="mainAboutPage">
    <div>
      <h1>[ L'équipe ]</h1><br>
      || 40110945 | Jules Petit<br>
      || 40110044 |Elias Sabbagh <br>
      || 40045833 | Jaskaran Dhadda <br>
      || 40133600 | Christopher Di Giacomo<br>
      || 40099828 | Carolina Quesada Vilchez<br>
      || 29199160 | Khaled Al Koudmani<br>
      || 40158506 | Mikhail Ovsyannikov<br>
      || 40128079 | Noah-James Dinh<br>
      || 40116096 | Rama Alrifai<br><br>
    </div>
  </main>
</template>

<style scoped>

#mainAboutPage {
  margin: 0;
  padding: 0;
  background: url("https://static.pexels.com/photos/1227/night-dark-blur-blurred.jpg") no-repeat center center;
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
    font-size: xx-large;
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
    25%{

      color: #83d47d;


    }

    50% {
      color:#007480
    }

75%{
  color: #9aae95;

}
    100% {
color:#00a68a
    }
  }
</style>