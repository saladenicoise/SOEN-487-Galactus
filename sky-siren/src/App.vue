<template>
	<div class="app" id="app">
	<TheHeader></TheHeader>
	<router-view></router-view>
	<TheFooter></TheFooter>
	</div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
export default {
	components: {TheHeader, TheFooter},
}
</script>



<style lang="scss">
:root {
	--primary: #42c271;
	--primary-alt: #1ca54e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: linear-gradient(#141e30, #243b55);;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;

	main {
		flex: 1 1 0;
		padding: 2rem;

		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>