const PushNotifications = require("@pusher/push-notifications-server");

// Notification creating message is an object expected to be formatted [{"location":"Montreal","language":"en","time":"13h10","content":"-1C/30.2F Sunny"},{"location":"Montreal","language":"en","time":"13h10","content":"-1C/30.2F Sunny"}]
function createScheduledNotification(weatherNotifications) {
    console.log(` [x] DEBUG notify-nexus.notification.createNotification: ${JSON.stringify(weatherNotifications)}`);

    // Create notification using user beam
    let beamsClient = new PushNotifications({
        instanceId: "b8e54c3c-7ad0-41ce-9c6f-63f5d8f52dcb",
        secretKey: "F022DF8BDA529184A0F88E4C8750396914A195ACB0F6EABFF7562594D6154A9B",
    });


    const interestsToNotificationsMap = {};
    // format ['notification-Montreal-13h10-en' : {
    //     title: 'Montreal Weather',
    //     body: '-1C/30.2F Sunny',
    //     deep_link: 'https://www.pusher.com'
    //   }, ...]
      

    weatherNotifications.forEach(({ location, language, time, content }) => {
        const interest = `notification-${location}-${time}-${language}`;
        if (interest.length > 164) {
            console.log("Error: Interest name too long");
            return;
        }
        if (!/^[A-Za-z0-9_\-=@,.]+$/.test(interest)) {
            console.log("Error: Invalid characters in interest name");
            return;
        }

        const notification = {
            title: `${location} Weather`,
            body: content,
            deep_link: "https://www.pusher.com",
        };

        interestsToNotificationsMap[interest] = notification;
    });

    Object.entries(interestsToNotificationsMap).forEach(([interest, notification]) => {
        console.log(interest, notification);
        beamsClient
            .publishToInterests([interest], {
                web: {
                    notification: {
                        title: notification.title,
                        body: notification.body,
                        deep_link: notification.deep_link,
                    },
                },
            })
            .then((publishResponse) => {
                console.log(`Just published ${interest}:`, publishResponse.publishId);
                return publishResponse.publishId;
            })
            .catch((error) => {
                console.log(`Error publishing to ${interest}:`, error);
                return null;
            });
    });


}

// const result = [{"location":"Montreal","language":"fr","time":"13h10","content":"-1C/30.2F Sunny"},{"location":"Montreal","language":"en","time":"13h10","content":"-1C/30.2F Sunny"}];
// createScheduledNotification(result)

module.exports = createScheduledNotification;