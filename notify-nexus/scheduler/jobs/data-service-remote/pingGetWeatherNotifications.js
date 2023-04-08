const publishToQueue = require('../../../rabbitmq/utilities/notifications/producer-notification-polling');

// this takes in an array and processes it into stringified JSON
function pingGetWeatherNotifications(array) {
    
    // expected object [
    //     { location: 'Montreal', language: 'fr', time: '03h10', ... },
    //     { location: 'Montreal', language: 'en', time: '03h10', ... }
    // ]

    const data = array.map(pair => ({
        location: pair.location,
        language: pair.language,
        time: pair.time
      }));
      
    const message = JSON.stringify(data);
    publishToQueue(message);
    // sends a message in the format:
    // [{"location":"Montreal","language":"fr","time":"03h10"},{"location":"Montreal","language":"en","time":"03h10"}]
}

module.exports = pingGetWeatherNotifications