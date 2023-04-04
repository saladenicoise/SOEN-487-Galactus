const publishToQueue = require('../../../rabbitmq/utilities/notifications/producer-notification-polling');

// 
module.exports = function pingGetWeatherNotifications(arrayOfLocationAndTimePair) {
    arrayOfLocationAndTimePair.forEach((locationAndTimePair) => {
        // expected object { "location": "montreal,canada" , "time": "8:00" }

        // parsing
        let message = `notification-${locationAndTimePair.location}-${locationAndTimePair.time}`;
        publishToQueue(message);
    })
}

