<template>
    <main class="container ">
      <div class="login-box">
        <h1>Sign Up</h1>
        <form  @submit.prevent="signUp">
            <div class="user-box">
                <input type="text" name="name" id="name" v-model="name" required>
                <label>Name</label>
            </div>

            <div class="user-box">
                <input type="email" name="email" id="email" v-model.trim="email" required @blur="checkEmail">
                <label>Email</label>
            </div>

            <div class="user-box">
                <input type="password" name="password" id="password" v-model.trim="password" required @blur="checkPassword">
                <label>Password</label>
            </div>

            <div class="user-box">
                <input type="text"  id="city" v-model="city" name="city" required>
                <label>City</label>
            </div>
            <div class="btn__danger" role="alert" v-if="errorMsg">
                    {{ errorMsg }}
                </div>
                <button type="submit" class="centered">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sign up
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
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') errorMsg.value = 'Email already in use. Please enter another email.';
      else errorMsg.value === 'Faild to login';
    }
}

    const checkEmail = () =>{
      const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);
    if (!emailRegex.test(email.value)) {
        console.log(email.value);
        errorMsg.value = 'Please enter a valid email address.';
      } else {
        errorMsg.value = '';
      }
}
const checkPassword = () =>{
      const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
    if (!passwordRegex.test(password.value)) {
        console.log(password.value);
        errorMsg.value = 'Invalid password! The password must contain One uppercase, one lowercase, one number and at least 8 characters.';
      } else {
        errorMsg.value = '';
      }
}

</script>
