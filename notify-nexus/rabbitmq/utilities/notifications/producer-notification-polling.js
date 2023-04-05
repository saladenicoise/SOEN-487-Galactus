// request current weather information from data service
// use the endpoint /fromAddress - add cityName, language inside of the query

const produce = require('../generic-producer');

// Param data expected format: { "location": string, "language": string}
module.exports = function(data) {
    const message = JSON.stringify(data);
    produce("notification-polling-queue", message, (durable = false));
};
