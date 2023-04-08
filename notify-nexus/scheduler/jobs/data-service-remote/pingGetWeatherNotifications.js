const publishToQueue = require('../../../rabbitmq/utilities/notifications/producer-notification-polling');

// 
module.exports = function pingGetWeatherNotifications(arrayOfLocationAndTimePair) {
    arrayOfLocationAndTimePair.forEach((locationAndTimePair) => {
        // expected object { "location": string, "language": string }

        // parsing
        let message = `notification-${locationAndTimePair.location}-${locationAndTimePair.language}`;
        publishToQueue(message);
    })
}

