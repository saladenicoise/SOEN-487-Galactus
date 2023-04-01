<template>
    <main class="container flex-shrink-0 text-center mt-4">
        <h1 class="h3 mb-3 fw-normal">Manage Profile</h1>
        <form class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-12" @submit.prevent="updateProfile">
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
                <input type="text" class="form-control" id="city" v-model="city" placeholder="City">
                <label for="city">City</label>
            </div>

            <button class="btn btn-outline-primary" type="submit">Update</button>
        </form>
    </main>
</template>

<script setup>
/* Imports */
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useStore } from 'vuex';

/* Data */
const name = ref('');
const email = ref('');
const city = ref('');
const errorMsg = ref('');
const store = useStore();

/* Once the component is mounted */
onMounted(() => {
    const userData = store.getters['user/userData'];

    if(userData) {
        name.value = userData.name;
        email.value = userData.email;
        city.value = userData.city;
    } else {
        console.error('No user data found');
    }
});

/* Update user profile */
const updateProfile = async () => {
    try {
        await store.dispatch('user/updateUserData', {
            name: name.value,
            email: email.value,
            city: city.value
        });

        router.push('/');
    } catch (error) {
        errorMsg.value = error.message;
    }
};
</script>