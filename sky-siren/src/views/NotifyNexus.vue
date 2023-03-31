<template>
    <div class="notify-nexus">
        <h1>Permission</h1>
        <span>Do you allow this web app to <b>register</b> this device to push notifications?</span>
        <button>Register</button>

        <!-- The following divs are only dispayed if the Register button is clicked -->
        <!-- If the device is already register, show the divs by default  -->
        <!-- TODO: Perform check to see if this devide is registed to Pusher Beam -->
        <div>
            <h2>Notifications scheduler</h2>
            <input name="notification-scheduler-input" type="time">
            <button @click="subscribeToNotifyNexus('scheduled-notif')">Subscribe to weather notifications?</button>
        </div>

        <div>
            <h2>Alerts</h2>
            <button @click="subscribeToNotifyNexus('weather-alert')">Subscribe to weather alerts?</button>
        </div>

    </div>
</template>

<script>
export default {
    methods: {
        // registerMyDevice() {
        //     console.log('Registering to for notify-nexus');
        //     // real registration code from pusher beam client sdk docs
        //     const beamsClient = new PusherPushNotifications.Client({
        //     instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb',
        //     });
        
        //     beamsClient.start()
        //     .then((activeClient) => {
        //             // beamsClient.addDeviceInterest('hello')
        //             let x = activeClient.getDeviceId();
        //             console.log(x);

        //     })
        //     .then((deviceId) => console.log(`Successfully registered! This devide ID is ${deviceId}`))
        //     .catch(console.error);
        // },
        subscribeToNotifyNexus(interest) {
            console.log(`Subscribe to ${interest} interest for notify-nexus`);

            // Registers and subscribes to "weather-alert"
            const beamsClient = new PusherPushNotifications.Client({
            instanceId: 'b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb',
            });
        
            beamsClient.start()
            .then((beamsClient) => beamsClient.getDeviceId())
            .then((deviceId) => {
                console.log(`Successfully registered device ${deviceId} and subscribed to ${interest}!`)
                // TODO register deviceId in User service, if does not exist yet
                this.sendDeviceIdToNotifyNexus(deviceId);
            })
            .then(() => beamsClient.addDeviceInterest(interest))
            .then(() => beamsClient.getDeviceInterests())
            .then((interests) => console.log(`Current interests: ${interests}`))
            .catch(console.error);
        },
        sendDeviceIdToNotifyNexus(decideId) {
            
        }
    }
}
</script>