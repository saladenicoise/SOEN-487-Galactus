<template>
  	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<div class="navbar-brand">
				<router-link to="/" class=" no-underline">
				<img src="/favicon.ico" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"> <b>Galactus</b> SkySiren
			</router-link>
			</div>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<div class="nav-link" aria-current="page">
							<router-link to="/" class="bi bi-house-door-fill no-underline">&nbsp;Home</router-link>
						</div>
					</li>
					<li class="nav-item" v-if="isAuthenticated">
						<div class="nav-link">
							<router-link to="/profile" class="bi bi-person-fill no-underline">&nbsp;Profile</router-link>
						</div>
					</li>
					<li class="nav-item" v-if="isAuthenticated">
						<div class="nav-link">
							<router-link to="/preferences" class="bi bi-gear-fill no-underline">&nbsp;Preferences</router-link>
						</div>
					</li>
				</ul>
				<ul class="navbar-nav flex-row">
					<li class="nav-item" v-if="isAuthenticated">
						<button type="button" class="btn btn-outline-danger" @click="logout" >
							<i class="bi bi-box-arrow-right"></i>&nbsp;Sign Out
						</button>
					</li>

					<li class="nav-item" v-if="!isAuthenticated">
						<div class="nav-link">
							<router-link to="/sign-in" class="bi bi-box-arrow-in-right no-underline">&nbsp;Sign In</router-link>
						</div>
					</li>
					<li class="nav-item" v-if="!isAuthenticated">
						<div class="nav-link">
							<router-link to="/sign-up" class="bi bi-person-plus-fill no-underline">&nbsp;Sign Up</router-link>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</nav>

  	<router-view></router-view>

	<footer class="text-center">
		<div class="container " >
			<span class="text-muted"> Made with <i class="bi bi-heart-fill text-danger"></i> by L'equipe<br> </span>

			<span class="text-muted">&copy; {{ new Date().getFullYear() }} All Rights Reserved.</span>
		</div>

	</footer>
</template>

<script setup>

import { computed } from 'vue';
import router from './router';
import { useStore } from 'vuex';
const store = useStore();

const isAuthenticated = computed(() => store.getters['user/isAuthenticated']);

const logout = () => {
	store.dispatch('user/signOut');
	router.push('/sign-in');
};

</script>
<style scoped>
.no-underline {
  text-decoration: none;
}
</style>