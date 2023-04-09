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
                    <input class="form-check-input" type="radio" id="languageEn" value="en" v-model="language"
                        name="language">
                    <label class="form-check-label" for="languageEn">EN</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="languageFr" value="fr" v-model="language"
                        name="language">
                    <label class="form-check-label" for="languageFr">FR</label>
                </div>
            </div>
            <div class="mb-4">
                <div>
                    <label class="form-label">Temperature unit:&nbsp;&nbsp;</label>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="temperatureUnitCelsius" value="celsius"
                            v-model="temperatureUnit" name="temperatureUnit">
                        <label class="form-check-label" for="temperatureUnitCelsius">Celsius</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" id="temperatureUnitFahrenheit" value="fahrenheit"
                            v-model="temperatureUnit" name="temperatureUnit">
                        <label class="form-check-label" for="temperatureUnitFahrenheit">Fahrenheit</label>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label">Time format:&nbsp;</label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="timeFormat12" value="12" v-model="timeFormat"
                        name="timeFormat">
                    <label class="form-check-label" for="timeFormat12">12-hour</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="timeFormat24" value="24" v-model="timeFormat"
                        name="timeFormat">
                    <label class="form-check-label" for="timeFormat24">24-hour</label>
                </div>
            </div>
            <div class="mb-4">
                <label class="form-label">Location:&nbsp;</label>
                <div class="form-check form-check-inline">
                    <!-- below: my version -->
                    <input class="form-check-input" type="radio" id="locationAutoDetect" value="autoDetect"
                        v-model="location">
                    <label class="form-check-label" for="locationAutoDetect">Auto Detect</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="locationManualInput" value="manualInput"
                        v-model="location">
                    <label class="form-check-label" for="locationManualInput">Manual Input</label>
                </div>
            </div>
            <div class="mb-4">
                <div class="form-text">
                    <div>
                        <label :hidden="location === 'autoDetect'" class="form-text-label" for="city">Enter a city: </label>
                    </div>
                    <div>
                        <input class="form-text-input" type="text" id="city" v-model="city"
                            :disabled="location === 'autoDetect'">
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="weatherAlerts" v-model="weatherAlerts"
                        name="weatherAlerts">
                    <label class="form-check-label" for="weatherAlerts">Weather alerts</label>
                </div>
            </div>

            <div class="mb-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="notification" v-model="notification"
                        name="notification">
                    <label class="form-check-label" for="notification">Notification alerts</label>
                </div>
                <div class="">
                    <input type="time" class="form-control" v-model="notificationSchedule" name="notificationSchedule " />
                </div>
            </div>

            <button class="btn btn-outline-primary" type="submit">Update</button>
            <button class="btn btn-outline-danger" type="button" @click="cancelPreferenceUpdate()">Cancel</button>
            <button class="btn btn-outline-info" type="button" @click="resetPreference()">Reset</button>
        </form>

        <div>
            <h3>Debugging utility functions. Comment this out</h3>
            <div>
                <button class="btn btn-outline-primary" @click="getDeviceInterests()">Get interests</button>
            </div>
            <div>
                <button class="btn btn-outline-primary" @click="customClearDeviceInterests()">Delete all interests</button>
            </div>
            <div>
                <button class="btn btn-outline-primary" @click="getLocationSelected()">Get location selected</button>
            </div>
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
});


/* Methods */
const cancelPreferenceUpdate = async () => {
    // cancels ongoing updates

    // copy of the onMounted code
    const userData = store.getters['user/userData'];
    if (userData) {
        city.value = userData.city;
        language.value = userData.language;
        temperatureUnit.value = userData.temperatureUnit;
        timeFormat.value = userData.timeFormat;
        location.value = userData.location;
        weatherAlerts.value = userData.weatherAlerts;
        notification.value = userData.notification;
        notificationSchedule.value = userData.notificationSchedule;
    } else {
        // reset form to blank slate
        city.value = '';
        language.value = '';
        temperatureUnit.value = '';
        timeFormat.value = '';
        location.value = '';
        weatherAlerts.value = false;
        notification.value = false;
        notificationSchedule.value = '';
    }
}

const resetPreference = async () => {
    city.value = '';
    language.value = '';
    temperatureUnit.value = '';
    timeFormat.value = '';
    location.value = '';
    weatherAlerts.value = false;
    notification.value = false;
    notificationSchedule.value = '';
}

const updatePreference = async () => {
    // delete all current pusher beam interests
    customClearDeviceInterests();

    // add new ones according to preferences here
    // update the alerts
    if (weatherAlerts.value)
        addInterest('alert');
    // update the scheduled notification
    if (notification.value)
        addInterest('notification');

    try {
        await store.dispatch('user/updateUserData', {
            city: city.value,
            language: language.value,
            temperatureUnit: temperatureUnit.value,
            timeFormat: timeFormat.value,
            location: location.value,
            city: city.value,
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
    {
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
    }
};
// TODO
// Add call to data-service when Location is updated to autoDetect -> /fromIP
// The city input is disabled but its value is changed to the current city

// What if the cityis already auto-detected (saved in db), but user changed city so the auto detect input is "outdated" until we do -> manual input -> auto detect
// .. upon which, the location will be update to current location

// Pusher beam integration methods
const onChangeToAutoDetect = () => {

}

const onUpdateAutoDetectValue = () => {

}

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
            }
            if (interest === 'notification' || interest === 'alert') {
                console.log(newInterest);
                beamsClient.addDeviceInterest(newInterest);
            }

        })
        .catch(console.error);
}

</script>