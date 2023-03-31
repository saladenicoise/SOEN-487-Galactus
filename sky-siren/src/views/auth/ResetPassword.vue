<template>
    <main class="container flex-shrink-0 text-center mt-4">
        <h1 class="h3 mb-3 fw-normal">Reset</h1>
        <form class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-12" @submit.prevent="signIn">
            <div class="alert alert-danger mb-4" role="alert" v-if="errorMsg">
                {{ errorMsg }}
            </div>
            <div class="form-floating mb-4">
                <input type="password" class="form-control" id="password" v-model="password" placeholder="New Password">
                <label for="password">New Password</label>
            </div>
            <div class="form-floating mb-4">
                <input type="password" class="form-control" id="confirm-password" v-model="confirmPassword" placeholder="Confirm New Password">
                <label for="password">Confirm New Password</label>
            </div>

            <button class="btn btn-outline-primary" type="submit">Reset</button>
        </form>
    </main>
</template>

<script setup>

</script>