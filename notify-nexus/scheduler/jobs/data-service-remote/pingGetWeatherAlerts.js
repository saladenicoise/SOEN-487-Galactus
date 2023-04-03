// const formatAlertPollingMessageAndPublish = require('../../../rabbitmq/utilities/alerts/producer-alert-polling');
const formatAlertPollingMessageAndPublish = require('../../../rabbitmq/utilities/alerts/producer-alert-polling');

// function pingGetWeatherAlerts(arrayOfAlertLocations) {
//     arrayOfAlertLocations.forEach((oneAlertLocationString) => {
//         // oneAlertLocationString expected format: "montreal,canada"
//         const message = `alert-${oneAlertLocationString}`;
//         formatAlertPollingMessageAndPublish(message);
//     })
// }

module.exports = function (arrayOfAlertLocations) {
    arrayOfAlertLocations.forEach((oneAlertLocationString) => {
        // oneAlertLocationString expected format: "montreal,canada"
        const message = `alert-${oneAlertLocationString}`;
        formatAlertPollingMessageAndPublish(message);
    })
}
