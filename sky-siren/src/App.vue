<template>
	<div>
	<the-header></the-header>
	<router-view></router-view>
	<TheFooter></TheFooter>
	</div>
</template>

<script>
import TheHeader from './components/Layout/TheHeader.vue';
import TheFooter from './components/Layout/TheFooter.vue';
export default {
	components: {TheHeader, TheFooter},
}
</script>