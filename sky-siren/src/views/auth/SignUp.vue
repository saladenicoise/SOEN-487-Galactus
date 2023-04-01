<template>
    <main class="container flex-shrink-0 text-center mt-4">
        <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
        <form class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-12" @submit.prevent="signUp">
            <div class="alert alert-danger mb-4" role="alert" v-if="errorMsg">
                {{ errorMsg }}
            </div>
            <div class="form-floating mb-4">
                <input type="text" class="form-control" id="name" v-model="name" placeholder="Name">
                <label for="name">Name</label>
            </div>
            <div class="form-floating mb-4">
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Email address">
                <label for="email">Email address</label>
            </div>
            <div class="form-floating mb-4">
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
                <label for="password">Password</label>
            </div>
            <div class="form-floating mb-4">
                <input type="password" class="form-control" id="confirm-password" v-model="confirmPassword" placeholder="Confirm Password">
                <label for="password">Confirm Password</label>
            </div>
            <div class="form-floating mb-4">
                <input type="text" class="form-control" id="city" v-model="city" placeholder="City">
                <label for="city">City</label>
            </div>

            <button class="btn btn-outline-primary" type="submit">Sign Up</button>

            <p class="mt-4">
                Already have an account? <router-link to="/sign-in">Sign In</router-link>
            </p>
        </form>

        <!-- Vue test button to save user data -->
        <button class="btn btn-outline-primary" @click="saveUserData">saveUserData</button>
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
const confirmPassword = ref('');
const city = ref('');
const errorMsg = ref('');
const store = useStore();

/* Create a new user */
const signUp = async () => {
    try {
        await store.dispatch('user/signUp', {
            email: email.value,
            password: password.value,
        });

        // Save user data to firebase database
        await store.dispatch('user/saveUserData', {
            name: name.value,
            email: email.value,
            city: city.value,
            language: 'en',
            temperatureUnit: 'celsius',
            timeFormat: '24h',
            location: 'autoDetect',
            weatherAlerts: false,
            notification: false,
            notificationTime: '08:00 AM',
            darkMode: false,
        });

        router.push('/preferences');
    } catch (error) {
        errorMsg.value = error.message;
    }
}
</script>