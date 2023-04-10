const consumeFromQueue = require('../utilities/notifications/consumer-notification-pushing');
const createScheduledNotification = require('../../notification/createScheduledNotification');

module.exports = function () {
    consumeFromQueue("notification-pushing-queue", createScheduledNotification);
}