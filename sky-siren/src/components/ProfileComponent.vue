<template>
    <main class="login-box">
        <h1 class="h3 mb-3 fw-normal">Manage Profile</h1>
        <form  @submit.prevent="updateProfile">
            <div class="btn_alert" role="alert" v-if="errorMsg">
                {{ errorMsg }}
            </div>
            <div class="user-box">
                <input type="text" class="form-control" id="name" v-model="name" name="" required>
                <label for="name">Name</label>
            </div>
            <div class="user-box">
                <input type="email" class="form-control" id="email" required v-model="email" name="">
                <label for="email">Email address</label>
            </div>
            <div class="user-box">
                <input type="text" class="form-control" id="city" v-model="city" name="" required>
                <label for="city">City</label>
            </div>


                <button type="submit" class="centered">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sign in
                </button>
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


<script>
export default {
   name: "ProfileComponent",
}
</script>