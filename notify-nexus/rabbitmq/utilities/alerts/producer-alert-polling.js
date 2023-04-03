const produce = require('../generic-producer');


// alertLocationString format: "montreal,canada"
// function formatAlertPollingMessageAndPublish(alertLocationString) {
//     const message = alertLocationString;
//     produce("alerts-polling-queue", message, (durable = false));
// }

module.exports = function(alertLocationString) {
    const message = alertLocationString;
    produce("alerts-polling-queue", message, (durable = false));
};


