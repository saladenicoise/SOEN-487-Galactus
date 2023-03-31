<template>
    <main class="container flex-shrink-0 text-center mt-4">
        <h1 class="h3 mb-3 fw-normal">Sign In</h1>
        <form class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-12" @submit.prevent="signIn">
            <div class="alert alert-danger mb-4" role="alert" v-if="errorMsg">
                {{ errorMsg }}
            </div>
            <div class="form-floating mb-4">
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Email address">
                <label for="email">Email address</label>
            </div>
            <div class="form-floating mb-4">
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
                <label for="password">Password</label>
            </div>
            <button class="btn btn-outline-primary" type="submit" >Sign in</button>

            <p class="mt-4">
                Don't have an account? <a href="/sign-up">Sign Up</a>
            </p>

            <p class="mt-2">
                <a href="/forgot-password">Forgot Password?</a>
            </p>
        </form>
    </main>
</template>

<script setup>
/* Imports */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

/* Data */
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const router = useRouter();

/* Authenticates a user */
const signIn = async () => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/');
    } catch (error) {
        switch (error.code) {
            case 'auth/invalid-email':
                errorMsg.value = 'Invalid email address';
            break;
            case 'auth/user-not-found':
                errorMsg.value = 'User not found';
            break;
            case 'auth/wrong-password':
                errorMsg.value = 'Wrong password';
            break;
            default:
                errorMsg.value = 'Something went wrong';
            break;
        }
    }
};
</script>