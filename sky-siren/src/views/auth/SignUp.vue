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
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref as dbRef, set } from 'firebase/database';
import router from '@/router';

/* Data */
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const city = ref('');
const errorMsg = ref('');

/* Create a new user */
const signUp = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);

        // Save user data to firebase database
        await saveUserData();

        router.push('/preference');
    } catch (error) {
        console.log(error);
        switch (error.code) {
            case 'auth/invalid-email':
                errorMsg.value = 'Invalid email address';
            break;
            case 'auth/email-already-in-use':
                errorMsg.value = 'Email already in use';
            break;
            case 'auth/weak-password':
                errorMsg.value = 'Password is too weak';
            break;
            default:
                errorMsg.value = 'Something went wrong';
            break;
        }
    }
}

// Save user data to firebase database
const saveUserData = async () => {
    try {
        await set(dbRef(db, 'users/' + auth.currentUser.uid),{
            name: name.value,
            email: email.value,
            city: city.value,
            language: 'en',
            temperatureUnit: 'celsius',
            timeFormat: '24h',
            location: 'autoDetect',
            weatherAlerts: false,
            darkMode: false,
        })
    } catch (error) {
        errorMsg.value = error.message;
    }
}
</script>