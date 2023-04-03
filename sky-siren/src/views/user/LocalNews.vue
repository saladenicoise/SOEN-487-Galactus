<template>
	<main id="Home-page" class="lines ">

		<h1 style="color: aliceblue;">Local News</h1>

	<div class="interface">

	</div>
  <div class="line one"></div>
  <div class="line two"></div>


</main>
</template>


<style lang="scss" scoped>
  @function boxShadow($n) {
    $value: "#{random(2500)-500}px #{random(1500)-500}px #{random(5)}px #{$color}";
    @for $i from 1 through $n {
      $value: $value + ", #{random(2500)-500}px #{random(1500)-500}px #{random(5)}px #{$color}";
     }
    @return unquote($value);
   }

$color: #00FF7B;

body { margin: 0; }

.lines {
  background-color: #000;
  height: 100vh;
  overflow: hidden;
}

.line {
  height: 200px;
  transform: skewX(-20deg);
  width: 10px;
}
.one {
  animation: animation 80s linear infinite alternate;
  box-shadow: boxShadow(50);
}
.two {
  animation: animation 80s linear infinite alternate-reverse;
  box-shadow: boxShadow(50);
}
.overlay {
  background-image: radial-gradient(#193326, black);
  height: 100vh;
  opacity: 0.7;
  position: absolute;
  top: 0;
  width: 100vw;
}

@keyframes animation {
  0% {
    opacity: 0.7;
    transform: skewX(-20deg) translate(0px, 0px)
  }

  25% {
    opacity: 0.1
  }

  50% {
    opacity: 0.5;
    transform: skewX(-20deg) scale(1.5);
  }

  75% {

  }

  100%  {
    opacity: 0.3;
    transform: skewX(-20deg) scale(0.7) translate(150px, 200px);
  }
}
</style>