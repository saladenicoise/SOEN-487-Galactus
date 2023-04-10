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
	--primary: rgba(2, 161, 161, 0.5);
	--primary-alt: teal;
	--grey: #848d98;
	--dark: #17262b;
	--dark-alt: #283f47;
	--light: teal;
	--sidebar-width: 200px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
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