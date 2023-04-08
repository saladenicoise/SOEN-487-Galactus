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
    console.log('debug getAllDistincAlertLocation arrayOfAlertLocations=', arrayOfAlertLocations);
    arrayOfAlertLocations.forEach((oneAlertLocationString) => {
        // oneAlertLocationString expected format: "montreal,canada"
        // const message = `alert-${oneAlertLocationString}`;
        // console.log('pingGetWeatherAlerts ', message);
        const data = { location : oneAlertLocationString }
        console.log('debug getAllDistinctAlertLocation data=', JSON.stringify(data));
        formatAlertPollingMessageAndPublish(data);
    })
}
