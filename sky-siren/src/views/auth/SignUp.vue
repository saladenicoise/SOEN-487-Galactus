<template>
    <main class="container ">
      <div class="login-box">
        <h1>Sign Up</h1>
        <form  @submit.prevent="signUp">
            <div class="btn__danger" role="alert" v-if="errorMsg">
                    {{ errorMsg }}
                </div>

            <div class="user-box">
                <input type="text" name="" id="name" v-model="name" required>
                <label>Name</label>
            </div>

            <div class="user-box">
                <input type="email" name="email" id="email" v-model="email" required>
                <label>Email</label>
            </div>

            <div class="user-box">
                <input type="password" name="password" id="password" v-model="password" required>
                <label>Password</label>
            </div>

            <div class="user-box">
                <input type="text"  id="city" v-model="city" name="" required>
                <label>City</label>
            </div>

                <button type="submit" class="centered">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sign in
                </button>
            <p>
                Already have an account? <router-link to="/sign-in">Sign In</router-link>
            </p>
        </form>
    </div>
    </main>
</template>

<script setup>
/* Imports */
import { ref } from 'vue';
import router from '@/router';
import { useStore } from 'vuex';

/* Data */
const name = ref('');
const email = ref('');
const password = ref('');
const city = ref('');
const errorMsg = ref('');
const store = useStore();

/* Create a new user */
const signUp = async () => {
    try {
        await store.dispatch('user/signUp', {
            email: email.value,
            password: password.value,
            name: name.value,
            city: city.value,
            language: 'en',
            temperatureUnit: 'celsius',
            timeFormat: '24',
            location: 'autoDetect',
            weatherAlerts: false,
            notification: false,
            notificationSchedule: '08:00',
            darkMode: false,
        });

        router.push('/');
    } catch (error) {
        errorMsg.value = error.message;
    }
}
</script>


