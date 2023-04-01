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
							<router-link to="/profile" class="bi bi-person-fill link-profile no-underline">&nbsp;Profile</router-link>
						</div>
					</li>
					<li class="nav-item" v-if="isAuthenticated">
						<div class="nav-link">
							<router-link to="/preferences" class="bi bi-gear-fill link-preferences no-underline">&nbsp;Preferences</router-link>
						</div>
					</li>
				</ul>
				<ul class="navbar-nav flex-row">
					<li class="nav-item" v-if="isAuthenticated">
						<button type="button" class="btn btn-outline-danger btn-sign-out" @click="logout" >
							<i class="bi bi-box-arrow-right"></i>&nbsp;Sign Out
						</button>
					</li>

					<li class="nav-item" v-if="!isAuthenticated">
						<router-link class="nav-link" to="/sign-in">
							<i class="bi bi-box-arrow-in-right"></i>&nbsp;Sign In
                        </router-link>>
					</li>
					<li class="nav-item" v-if="!isAuthenticated">
						<router-link class="nav-link" to="/sign-up">
							<i class="bi bi-person-plus-fill"></i>&nbsp;Sign Up
                        </router-link>>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script>
export default {
    computed:{
        isAuthenticated(){
           return this.$store.getters['user/isAuthenticated'];
        }
    },
    methods: {
    logout(){
	this.$store.dispatch('user/signOut');
	this.$router.replace('/sign-in');
}
}
}
</script>

<style scoped>
.no-underline {
  text-decoration: none;
}
</style>
