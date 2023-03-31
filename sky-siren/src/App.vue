<template>
  	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<a class="navbar-brand" href="/">
				<img src="/favicon.ico" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"> <b>Galactus</b> SkySiren
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link" aria-current="page" href="/">
							<i class="bi bi-house-door-fill"></i>&nbsp;Home
						</a>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<a class="nav-link" href="/profile">
							<i class="bi bi-person-fill"></i>&nbsp;Profile
						</a>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<a class="nav-link" href="/preferences">
							<i class="bi bi-gear-fill"></i>&nbsp;Preferences
						</a>
					</li>
				</ul>
				<ul class="navbar-nav flex-row">
					<li class="nav-item" v-if="isLoggedIn">
						<button type="button" class="btn btn-outline-danger" @click="logout" >
							<i class="bi bi-box-arrow-right"></i>&nbsp;Sign Out
						</button>
					</li>

					<li class="nav-item" v-if="!isLoggedIn">
						<a class="nav-link" href="/sign-in">
							<i class="bi bi-box-arrow-in-right"></i>&nbsp;Sign In
						</a>
					</li>
					<li class="nav-item" v-if="!isLoggedIn">
						<a class="nav-link" href="/sign-up">
							<i class="bi bi-person-plus-fill"></i>&nbsp;Sign Up
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

  	<router-view></router-view>

  	<footer class="footer mt-auto py-4 text-center">
		<div class="container">
			Made with <i class="bi bi-heart-fill text-danger"></i> by L'equipe<br>
			<span class="text-muted">&copy; {{ new Date().getFullYear() }} All Rights Reserved.</span>
		</div>
	</footer>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import router from './router';

const isLoggedIn = ref(false);

onMounted(() => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			isLoggedIn.value = true;
		} else {
			isLoggedIn.value = false;
		}
	});
});

const logout = () => {
	signOut(auth).then(() => {
		router.push('/');
	});
};

</script>
