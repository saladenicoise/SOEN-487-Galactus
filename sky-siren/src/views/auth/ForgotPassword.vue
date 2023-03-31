<template>
    <main class="container flex-shrink-0 text-center mt-4">
        <h1 class="h3 mb-3 fw-normal">Forgot Password</h1>
        <form class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-12" @submit.prevent="forgotPassword">
            <div class="alert alert-danger mb-4" role="alert" v-if="errorMsg">
                {{ errorMsg }}
            </div>
            <div class="form-floating mb-4">
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Email address">
                <label for="email">Email address</label>
            </div>
            <button class="btn btn-outline-primary" type="submit">Initiate recovery process</button>
        </form>
    </main>
</template>

<script setup>
/* Imports */
import { ref } from 'vue';
 
/* Data */
const email = ref('');
const errorMsg = ref('');

</script>