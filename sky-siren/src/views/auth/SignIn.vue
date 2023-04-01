<template>
    <main >
        <div class="login-box">
            <h1>Login</h1>
            <form  @submit.prevent="signIn">
                <div class="alert alert-danger mb-4" role="alert" v-if="errorMsg">
                    {{ errorMsg }}
                </div>
                <div class="user-box">
                    <input type="email" name=""  d="email" v-model="email">
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="password" name=""  id="password" v-model="password">
                    <label>Password</label>
                </div>

                <button type="submit" class="center">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sign in
                </button>
            </form>

            <p class="mt-4">
                Don't have an account? <a href="/sign-up">Sign Up</a>
            </p>

            <p class="mt-2">
                <a href="/forgot-password">Forgot Password?</a>
            </p>
        </div>
    </main>
</template>

<script setup>
/* Imports */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

/* Data */
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const router = useRouter();
const store = useStore();

/* Authenticates a user */
const signIn = async () => {
    try {
        await store.dispatch('user/signIn', { email: email.value, password: password.value });
        router.push('/');
    } catch (error) {
        errorMsg.value = error.message;
    }
};
</script>
