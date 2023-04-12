<template>
    <main class="container">
        <div class="login-box">
            <h1 class="text-center">Manage Preferences</h1>
            <form @submit.prevent="updatePreference" style="color: white;">
                <div class="btn__danger" role="alert" v-if="errorMsg">
                    {{ errorMsg }}
                </div>
                <div class="input-box">
                    <span class="input-label">Language</span>&nbsp;
                    <label for="languageEn">
                        <input type="radio" id="languageEn" value="en" v-model="language" name="language">&nbsp;EN
                    </label>
                    <label for="languageFr">
                        <input type="radio" id="languageFr" value="fr" v-model="language" name="language">&nbsp;FR
                    </label>
                </div>

                <div class="input-box">
                    <span class="input-label">Temperature unit&nbsp;</span>
                    <label for="temperatureUnitCelsius">
                        <input type="radio" id="temperatureUnitCelsius" value="celsius" v-model="temperatureUnit" name="temperatureUnit">&nbsp;Celsius
                    </label>
                    <label for="temperatureUnitFahrenheit">
                        <input type="radio" id="temperatureUnitFahrenheit" value="fahrenheit" v-model="temperatureUnit" name="temperatureUnit">&nbsp;Fahrenheit
                    </label>
                </div>

                <div class="input-box">
                    <span class="input-label">Time format&nbsp;</span>
                    <label for="timeFormat12">
                        <input type="radio" id="timeFormat12" value="12" v-model="timeFormat" name="timeFormat">&nbsp;12-hour
                    </label>
                    <label for="timeFormat24">
                        <input type="radio" id="timeFormat24" value="24" v-model="timeFormat" name="timeFormat">&nbsp;24-hour
                    </label>
                </div>

                <div class="input-box">
                    <label class="input-label">Location&nbsp;</label>
                    <label for="locationAutoDetect">
                        <input type="radio" id="locationAutoDetect" value="autoDetect" v-model="location" name="location">&nbsp;Auto Detect
                    </label>
                    <label for="locationManualInput">
                        <input type="radio" id="locationManualInput" value="manualInput" v-model="location" name="location">&nbsp;Manual Input
                    </label>
                </div>

                <div class="input-box" :hidden="location === 'autoDetect'">
                    <label class="input-label">Default city&nbsp;</label>
                    <input type="text" id="city" v-model="city" :disabled="location === 'autoDetect'" name="city">
                </div>

                <div class="input-box">
                    <div>
                        <input type="checkbox" role="switch" id="weatherAlerts" v-model="weatherAlerts" name="weatherAlerts">&nbsp;
                        <label for="weatherAlerts">Weather alerts</label>
                    </div>
                </div>

                <div class="input-box">
                    <div>
                        <input type="checkbox" role="switch" id="notification" v-model="notification" name="notification">&nbsp;
                        <label for="notification">Notification alerts</label>
                    </div>
                </div>

                <div class="input-box" :hidden="!notification">
                    <label class="input-label" for="time-input">Notification schedule&nbsp;</label>
                    <select v-model="notificationSchedule" name="notificationSchedule">
                        <option v-for="time in timeOptions" :value="time">{{ time }}</option>
                    </select>
                </div>

                <button class="btn centered" type="submit">Update</button>
            </form>
        </div>

        <div>
            <!-- <h3>Debugging utility functions. Comment this out</h3> -->
            <div>
                <button hidden class="btn btn-outline-primary" @click="getDeviceInterests()">Get interests</button>
            </div>
            <div>
                <button hidden class="btn btn-outline-primary" @click="customClearDeviceInterests()">Delete all interests</button>
            </div>
            <!-- <div>
                <button class="btn btn-outline-primary" @click="getLocationSelected()">Get location selected</button>
            </div> -->
        </div>
    </main>
</template>

<script setup>
/* Imports */
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useStore } from 'vuex';
import axios from 'axios'

/* Data */
const language = ref('');
const temperatureUnit = ref('');
const timeFormat = ref('');
const location = ref('');
const city = ref('');
const weatherAlerts = ref(false);
const notification = ref(false);
const notificationSchedule = ref('');
const timeOptions = ref([]);
const errorMsg = ref('');
const store = useStore();

// Pusher beam client sdk
const beamsClient = new PusherPushNotifications.Client({ instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb', });

/* Once the component is mounted */
onMounted(() => {
    const userData = store.getters['user/userData'];
    if (userData) {
        city.value = userData.city;
        language.value = userData.language;
        temperatureUnit.value = userData.temperatureUnit;
        timeFormat.value = userData.timeFormat;
        location.value = userData.location;
        city.value = userData.city;
        weatherAlerts.value = userData.weatherAlerts;
        notification.value = userData.notification;
        notificationSchedule.value = userData.notificationSchedule;
    }

    // Generate time options with 5-minute intervals
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 5) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
            timeOptions.value.push(time)
        }
    }
});

/* Methods */
const updatePreference = async () => {
    beamsClient.start()
        // first, remove all old notifications
        .then((beamsClient) => beamsClient.getDeviceInterests())
        .then((interests) => interests.forEach((interest) =>
            beamsClient.removeDeviceInterest(interest))
        )
        .then(() => console.log('Unsubscribe from all interests'))
        // add alerts
        .then(() => {
            if (weatherAlerts.value) {
                let newInterest = 'alert-' + city.value;
                beamsClient.addDeviceInterest(newInterest);
            }
        })
        // add scheduled notifications
        .then(() => {
            if (notification.value) {
                let newInterest = 'notification-' + city.value + '-' + notificationSchedule.value;
                newInterest = newInterest.replace(':', 'h') + '-' + language.value;
                beamsClient.addDeviceInterest(newInterest);
            }
        })
        .catch((e) => console.log(e))

    try {
        await store.dispatch('user/updateUserData', {
            city: city.value,
            language: language.value,
            temperatureUnit: temperatureUnit.value,
            timeFormat: timeFormat.value,
            location: location.value,
            city: (location.value === 'autoDetect') ? null : city.value,
            weatherAlerts: weatherAlerts.value,
            notification: notification.value,
            notificationSchedule: notificationSchedule.value,
        });
        setCities();
        router.push('/preferences');
    } catch (error) {
        errorMsg.value = error.message;
    }

};

const setCities = () => {
    console.log(store);
    const userId = store.getters['user/userId'];
    fetch(`https://galactus-eaece-default-rtdb.firebaseio.com/Cities/${userId}.json`,
        {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                city: city.value,
                isAlert: weatherAlerts.value,
                isNotification: notification.value,
                notificationSchedule: notificationSchedule.value,
                language: language.value
            })
        })
        .then((Response) => {
            console.log("SUCCESS");
            if (!Response.ok) {
                throw new Error('Could not save data!');
            }
        })
        .catch((error) => {
            console.log(error);
        })
};

const getDeviceInterests = () => {
    beamsClient.start()
        .then((beamsClient) => beamsClient.getDeviceInterests())
        .then((interests) => console.table(interests))
        .catch((err) => console.log(err))
}

const removeDeviceInterestByName = (name) => {
    // This function works
    console.log('removeDeviceInterest')
    beamsClient.start()
        .then((beamsClient) => beamsClient.removeDeviceInterest(name))
        .catch(e => console.error('Could not remove device interest', e));
}

const customClearDeviceInterests = () => {
    // This function works
    console.log('customClearDeviceInterests');
    // get current device's interests
    beamsClient.start()
        .then((beamsClient) => beamsClient.getDeviceInterests())
        .then((interests) => interests.forEach((interest) =>
            beamsClient.removeDeviceInterest(interest))
        )
        .then(() => console.log('Unsubscribe from all interests'))
        .catch((err) => console.log(err))
}

const addInterest = (interest) => {
    console.log(`Subscribe to ${interest} interest for notify-nexus`);
    beamsClient.start()
        .then(() => {
            let newInterest = interest + '-' + city.value;
            if (interest === 'notification') {
                // parsing time from 08:55 format to 08h55 since char ':' is not allowed by pusher-beam
                newInterest += '-' + notificationSchedule.value;
                newInterest = newInterest.replace(':', 'h');
                newInterest += '-'
                newInterest += language.value;
            }
            // removing language from 'alerts' since backend currently does not support it
            console.log(newInterest);
            beamsClient.addDeviceInterest(newInterest);
        })
        .catch(console.error);
}

</script>

<style scoped>
.input-box {
    margin-bottom: 4%
}

.input-label {
    color: #03e9f4;
}
</style>