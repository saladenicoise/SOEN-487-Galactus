<template>
    <main class="container flex-shrink-0  mt-4">
        <h1 class="h3 mb-3 fw-normal text-center" style="color: white">Manage Preferences</h1>
        <form class="mx-auto col-lg-4 col-md-6 col-sm-8 col-xs-12" style="color: white" @submit.prevent="updatePreference">
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
                    <input class="form-check-input" type="checkbox" role="switch" id="darkMode" v-model="darkMode">
                    <label class="form-check-label" for="darkMode">Dark mode</label>
                </div>
            </div>

            <button class="btn btn-outline-primary" type="submit">Update</button>
        </form>
    </main>
</template>

<script setup>

/* Imports */
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebase';
import { ref as dbRef, update, get  } from 'firebase/database';
import router from '@/router';
import { onAuthStateChanged } from 'firebase/auth';

/* Data */
const language = ref('');
const temperatureUnit = ref('');
const timeFormat = ref('');
const location = ref('');
const weatherAlerts = ref(false);
const darkMode = ref(false);
const errorMsg = ref('');

/* Once the component is mounted */
onMounted(() => {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            get(dbRef(db, 'users/' + user.uid))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    language.value = data.language;
                    temperatureUnit.value = data.temperatureUnit;
                    timeFormat.value = data.timeFormat;
                    location.value = data.location;
                    weatherAlerts.value = data.weatherAlerts;
                    darkMode.value = data.darkMode;
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    });
});


/* Methods */
const updatePreference = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const userRef = dbRef(db, `users/${user.uid}`);
            await update(userRef, {
                language: language.value,
                temperatureUnit: temperatureUnit.value,
                timeFormat: timeFormat.value,
                location: location.value,
                weatherAlerts: weatherAlerts.value,
                darkMode: darkMode.value,
            });
            router.push('/');
        }
    } catch (error) {
        errorMsg.value = error.message;
    }
};

</script>