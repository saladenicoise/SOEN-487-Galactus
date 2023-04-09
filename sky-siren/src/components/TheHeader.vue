<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
<div class="logo">
		<img src="/favicon.ico" alt="Logo" width="30" height="24" >
	</div>
	<h3> <b>Galactus</b><br>SkySiren</h3>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link to="/" class="button">
				<span class="material-icons">home</span>
				<span class="text">Home</span>
			</router-link>

						<router-link to="/about" class="button">
							<span class="material-icons">group</span>
							<span class="text">Team</span>
						</router-link>
						<router-link to="/sign-in" class="button" v-if="!isAuthenticated">
							<span class="material-icons">login</span>
				<span class="text">Sign In</span>
			</router-link>

			<router-link to="/news" class="button" v-if="isAuthenticated">
				<span class="material-icons">newspaper</span>
				<span class="text">Local News</span>
			</router-link>

		</div>
		<div class="flex"></div>

		<div class="menu">

			<router-link to="/sign-up" class="button" v-if="!isAuthenticated">
				<span class="material-icons">app_registration</span>
				<span class="text">Sign Up</span>
			</router-link>
			<router-link to="/sign-out" class="button" v-if="isAuthenticated" @click="logout">
				<span class="material-icons" >logout</span>
				<span class="text">Sign Out</span>
			</router-link>

			<router-link to="/preferences" class="button" v-if="isAuthenticated">
				<span class="material-icons">settings</span>
				<span class="text">Preferences</span>
			</router-link>

		</div>
	</aside>
</template>



<script setup>
import { ref } from 'vue'
import logoURL from '../assets/logo.png'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}
</script>

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

<style lang="scss" scoped>
aside {
	display: flex;
	flex-direction: column;
z-index: 101;
background: rgb(23,31,43);
background: linear-gradient(360deg, rgba(23,31,43,1) 20%, rgba(32,46,60,1) 50%, rgba(39,57,72,1) 60%, rgba(51,78,95,1) 75%, rgba(36,59,85,1) 85%, rgba(23,31,43,1) 95%);
	color: var(--primary);

	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;

	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}

	.logo {
		margin-bottom: 1rem;

		img {
			width: 2rem;
		}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: var(--grey);
				transition: 0.2s ease-out;
			}

			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: var(--grey);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--grey);
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: rgba(255, 255, 255, 0.1);
				box-shadow: inset 5px 0px 0px rgba(32,46,60,1) ;
				.material-icons, .text {
					color: aliceblue;
				}
			}

			&.router-link-exact-active {
				background: var(--primary);
  transition: all 0.5s;

				.material-icons, .text {
					color: white;
				}
			}
		}
	}

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: -3rem;

			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3, .button .text {
			opacity: 1;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>