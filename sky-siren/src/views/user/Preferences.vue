<template>
    <main class="container flex-shrink-0  mt-4">
        <h1 class="h3 mb-3 fw-normal text-center">Manage Preferences</h1>
        <form class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-12" @submit.prevent="updatePreference">
            <div class="alert alert-danger mb-4" role="alert" v-if="errorMsg">
                {{ errorMsg }}
            </div>
            <div class="mb-4">
                <label class="form-label">Language:&nbsp;</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="languageEn" value="en" v-model="language">
                    <label class="form-check-label" for="languageEn">EN</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="languageFr" value="fr" v-model="language">
                    <label class="form-check-label" for="languageFr">FR</label>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label">Temperature unit:&nbsp;</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="temperatureUnitCelsius" value="celsius" v-model="temperatureUnit">
                    <label class="form-check-label" for="temperatureUnitCelsius">Celsius</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="temperatureUnitFahrenheit" value="fahrenheit" v-model="temperatureUnit">
                    <label class="form-check-label" for="temperatureUnitFahrenheit">Fahrenheit</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="temperatureUnitKelvin" value="kelvin" v-model="temperatureUnit">
                    <label class="form-check-label" for="temperatureUnitKelvin">Kelvin</label>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label">Time format:&nbsp;</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="timeFormat12" value="12" v-model="timeFormat">
                    <label class="form-check-label" for="timeFormat12">12-hour</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="timeFormat24" value="24" v-model="timeFormat">
                    <label class="form-check-label" for="timeFormat24">24-hour</label>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label">Location:&nbsp;</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="locationAutoDetect" value="autoDetect" v-model="location">
                    <label class="form-check-label" for="locationAutoDetect">Auto Detect</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="locationManualInput" value="manualInput" v-model="location">
                    <label class="form-check-label" for="locationManualInput">Manual Input</label>
                </div>
            </div>
            <div class="mb-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="weatherAlerts" v-model="weatherAlerts">
                    <label class="form-check-label" for="weatherAlerts">Weather alerts</label>
                </div>
            </div>
            <div class="mb-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="notification" v-model="notification">
                    <label class="form-check-label" for="notification">Notification alerts</label>
                </div>
                <div class="">
                    <input type="time" class="form-control" v-model="notificationSchedule"/>
                </div>
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
const language = ref('');
const temperatureUnit = ref('');
const timeFormat = ref('');
const location = ref('');
const weatherAlerts = ref(false);
const notification = ref(false);
const notificationSchedule = ref('');
const errorMsg = ref('');
const store = useStore();

/* Once the component is mounted */
onMounted(() => {
    const userData = store.getters['user/userData'];
    if (userData) {
        language.value = userData.language;
        temperatureUnit.value = userData.temperatureUnit;
        timeFormat.value = userData.timeFormat;
        location.value = userData.location;
        weatherAlerts.value = userData.weatherAlerts;
        notification.value = userData.notification;
        notificationSchedule.value = userData.notificationSchedule;
    }
});


/* Methods */
const updatePreference = async () => {
    try {
        await store.dispatch('user/updateUserData', {
            language: language.value,
            temperatureUnit: temperatureUnit.value,
            timeFormat: timeFormat.value,
            location: location.value,
            weatherAlerts: weatherAlerts.value,
            notification: notification.value,
            notificationSchedule: notificationSchedule.value,
        });
        router.push('/');
    } catch (error) {
        errorMsg.value = error.message;
    }
};

</script>