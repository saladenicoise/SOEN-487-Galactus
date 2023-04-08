const produce = require('../generic-producer');

// Param notificationLocationAndTimePair expected format: { "location": "montreal", "time": }
module.export = function formatNotificationPollingMessageAndPublish(notificationMessageString) {
    const message = notificationMessageString;
    produce("alerts-polling-queue", message, (durable = false));
}


