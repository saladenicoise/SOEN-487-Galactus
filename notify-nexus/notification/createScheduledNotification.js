const PushNotifications = require("@pusher/push-notifications-server");

// Notification creating message is an object expected to be formatted { "location": string, "language": string, "content": string}
module.exports = function createScheduledNotification(weatherNotification) {
    console.log(` [x] DEBUG notify-nexus.notification.createNotification: notification-${weatherNotification.location}-${weatherNotification.time}-${weatherNotification.language}`);
    // console.log(JSON.stringify(weatherAlert));

    // Create notification using user beam
    let beamsClient = new PushNotifications({
        instanceId: "b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb",
        secretKey: "F022DF8BDA529184A0F88E4C8750396914A195ACB0F6EABFF7562594D6154A9B",
    });

    beamsClient
        .publishToInterests([`notification-${weatherNotification.location}-${weatherNotification.time}-${weatherNotification.language}`], {
            web: {
                notification: {
                    title: `${weatherAlert.location} Weather`,
                    body: weatherNotification.content,
                    deep_link: "https://www.pusher.com",
                },
            },
        })
        .then((publishResponse) => {
            console.log("Just published:", publishResponse.publishId);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}