<template>
<footer  id="footer">
<!-- bi-heart-fill is the heart icon from bootstrap-icons-->
		<span class="text-muted"> Made with <i class="bi bi-heart-fill text-danger"></i> by L'equipe<br> </span>

		<span class="text-muted">&copy; {{ new Date().getFullYear() }} All Rights Reserved.</span>


</footer>
</template>

<style scoped>
#footer {
text-align: center;
  position: absolute;
  bottom: 0%;
  color: white;
  background: rgba(0, 0, 0);
  z-index: 100;
  font-size: 0.8em;
  margin: 0%;
  padding: 0.5%;
  width: 100%;
  align-content: center;
  height: 4rem;            /* Footer height */

}

</style>