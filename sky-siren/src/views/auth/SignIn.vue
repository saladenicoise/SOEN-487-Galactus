<template>
    <main >
        <div class="login-box">
            <h1>Sign in</h1>
            <form  @submit.prevent="signIn">
                <div class="user-box">
                    <input type="email" name="email" id="email" v-model="email" required>
                    <label>Email</label>
                </div>

                <div class="user-box">
                    <input type="password" name="password" id="password" v-model="password" required>
                    <label>Password</label>
                </div>

                <button type="submit" class="centered">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sign in
                </button>
            </form>
            <div class="btn__danger" role="alert" v-if="errorMsg">
                    {{ errorMsg }}
                </div>
            <p>
                Don't have an account? <router-link to="/sign-up" class="sign-up-link">Sign Up</router-link>
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
        await store.dispatch('user/signIn', { email: email.value, password: password.value })
        router.replace('/');
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Firebase: Error (auth/user-not-found).'|| error.message === 'Firebase: Error (auth/wrong-password).')
             errorMsg.value = "Invalid credentials!";
    }
};
</script>
