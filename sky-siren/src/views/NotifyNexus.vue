<template>
    <div class="notify-nexus">
        <!-- TODO Perform check to see if this devide is registed to Pusher Beam -->
        <div>
            <h2>Notifications scheduler</h2>
            <input name="schedule" v-model="schedule" type="time">
            <button @click="subscribeToNotifyNexus('scheduled-notif')">Subscribe to weather notifications?</button>
        </div>

        <div>
            <h2>Alerts</h2>
            <button @click="subscribeToNotifyNexus('weather-alert')">Subscribe to weather alerts?</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            schedule: ''
        }
    },
    methods: {
        subscribeToNotifyNexus(interest) {
            console.log(`Subscribe to ${interest} interest for notify-nexus`);

            // Registers and subscribes to "weather-alert"
            const beamsClient = new PusherPushNotifications.Client({
            instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb',
            });
        
            beamsClient.start()
            .then((beamsClient) => beamsClient.getDeviceId())
            .then(async (deviceId) => {
                console.log(`Successfully registered device ${deviceId} and subscribed to ${interest}!`)
                // TODO Register deviceId in User service, if does not exist yet
                // TODO Refactor into switch case?
                if (interest === 'weather-alert')
                    await this.postDeviceIdToNotifyNexus(deviceId).catch(e => console.log(`Can't send alert deviceId to notify-nexus service: ${e}`));
                if (interest === 'scheduled-notif')
                    await this.postNotificationPreferences(deviceId, this.schedule).catch(e => console.log(`Can't send notification preferences to notify-nexus service: ${e}`));
            })
            .then(() => beamsClient.addDeviceInterest(interest))
            .then(() => beamsClient.getDeviceInterests())
            .then((interests) => console.log(`Current interests: ${interests}`))
            .catch(console.error);
        },
        async postNotificationPreferences(deviceId, schedule) {
            let res = await axios.post("http://localhost:3001/post/notification-preferences", {
                deviceId,
                schedule
            }).catch(e =>  console.log(`weird axios or await error? ${e}`))
            console.log(`postNotificationPreferences result: ${res.data}`);
        },
        // This function calls the notify-nexus server to pass it the registered device id
        async postDeviceIdToNotifyNexus(deviceId) {
            let res = await axios.post("http://localhost:3001/post/deviceId", {
                deviceId
            }).catch(e =>  console.log(`weird axios or await error? ${e}`))
            console.log(`postDeviceIdToNotifyNexus result: ${res.data}`);
        }
    }
}
</script>