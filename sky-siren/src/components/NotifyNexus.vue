<template>
    <div class="notify-nexus ">
        <!-- TODO Perform check to see if this devide is registed to Pusher Beam -->
        <div class="centered login-box">

            <div class="user-box">
        <h1>Notification service preferences</h1>
        <input name="alertLocation" placeholder="alert" type="text" v-model="alertLocation">
        </div>

        <div class="user-box">
            <h2 style="color: white">Notifications scheduler</h2>
            <input name="schedule" v-model="schedule" type="time">
            <button class="btn btn-outline-primary" style="color: white"
                @click="subscribeToNotifyNexus('notification')">Subscribe to weather
                notifications?</button>
        </div>
        <div class="user-box">
            <h2 style="color: white">Alerts</h2>
            <button class="btn btn-outline-primary" style="color: white"
                @click="subscribeToNotifyNexus('alert')">Subscribe to weather
                alerts?</button>

        </div>
        <!-- List of useful functions -->
        <div class="user-box">
            <input placeholder="delete an interest" name="deleteOneInterest" v-model="deleteOneInterest" type="text">
            <button @click="removeDeviceInterestByName(deleteOneInterest)"></button>
        </div>

        <div class="user-box">
            <button class="btn btn-outline-primary" style="color: white" @click="removeDeviceInterest()">remove one interest</button>
        </div>

        <div class="user-box">
            <button class="btn btn-outline-primary" style="color: white" @click="getDeviceInterests()">show device interests</button>
        </div>

        <div  class="user-box">
            <button class="btn btn-outline-primary" style="color: white" @click="customClearDeviceInterests()">clear all interests</button>
        </div>


    </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'NotifyNexus',
    data() {
        return {
            schedule: '',
            deleteOneInterest: '',
            alertLocation: ''
        }
    },

    methods: {
        subscribeToNotifyNexus(interest) {
            console.log(`Subscribe to ${interest} interest for notify-nexus`);

            // Registers and subscribes to "weather-alert"
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb',
            });
            console.log('schedule debug: ', this.schedule)
            beamsClient.start()
                .then((beamsClient) => beamsClient.getDeviceId())
                .then(async (deviceId) => {
                    console.log(`Successfully registered device ${deviceId} and subscribed to ${interest}!`)
                    if (interest === 'alert')
                        await this.postDeviceIdToNotifyNexus(deviceId)
                        .catch(e => console.log(`Can't send alert deviceId to notify-nexus service: ${e}`));
                    if (interest === 'notification')
                        await this.postNotificationPreferences(deviceId, this.schedule)
                        .catch(e => console.log(`Can't send notification preferences to notify-nexus service: ${e}`));
                })
                // interest naming convention: alert-<location> and notification-<location>-<schedule>
                .then(() => {
                    let newInterest = interest + '-' + this.alertLocation;
                    if (interest === 'notification')
                    {
                            // parsing time from hh:mm format to hhHmm since char ':' is not allowed by pusher-beam
                            newInterest +='-' + this.schedule;
                            newInterest = newInterest.replace(':', 'h');
                    }
                    console.log(newInterest);
                    beamsClient.addDeviceInterest(newInterest)
                })
                .catch(console.error);
        },
        getDeviceInterests() {
            // this function works
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb',
            });
            beamsClient.start()
                .then((beamsClient) => beamsClient.getDeviceInterests())
                .then((interests) => console.table(interests))
                .catch((err) => console.log(err))
        },
        async getDeviceId() {
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb',
            });

            beamsClient.start()
                .then(() => beamsClient.getDeviceId())
                .then(deviceId => {
                    console.log(deviceId) // Will log something like web-1234-1234-1234-1234
                })
                .catch(e => console.error('Could not get device id', e));
        },


        removeDeviceInterest() {
            console.log('removeDeviceInterest')
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb',
            });
            beamsClient.start()
                .then((beamsClient) => beamsClient.removeDeviceInterest('alert-brisbane'))
                .catch(e => console.error('Could not remove device interest', e));
        },

        removeDeviceInterestByName(name) {
            // This function works
            console.log('removeDeviceInterest')
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb',
            });
            beamsClient.start()
                .then((beamsClient) => beamsClient.removeDeviceInterest(name))
                .catch(e => console.error('Could not remove device interest', e));
        },

        customClearDeviceInterests() {
            // This function works
            console.log('customClearDeviceInterests');
            // get current device's interests
            const beamsClient = new PusherPushNotifications.Client({
                instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb',
            });
            beamsClient.start()
                .then((beamsClient) => beamsClient.getDeviceInterests())
                .then((interests) => interests.forEach((interest) =>
                    beamsClient.removeDeviceInterest(interest))
                )
                .then(() => console.log('Unsubscribe from all interests'))
                .catch((err) => console.log(err))

        },


        async postNotificationPreferences(deviceId, schedule) {
            let res = await axios.post("http://localhost:3001/post/notification-preferences", {
                deviceId,
                schedule
            }).catch(e => console.log(`weird axios or await error? ${e}`))
            console.log(`postNotificationPreferences result: ${res.data}`);
        },
        // This function calls the notify-nexus server to pass it the registered device id
        async postDeviceIdToNotifyNexus(deviceId) {
            let res = await axios.post("http://localhost:3001/post/deviceId", {
                deviceId
            }).catch(e => console.log(`weird axios or await error? ${e}`))
            console.log(`postDeviceIdToNotifyNexus result: ${res.data}`);
        }

    }
}
</script>