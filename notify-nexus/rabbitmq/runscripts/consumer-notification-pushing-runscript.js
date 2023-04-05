const consumeFromQueue = require('../utilities/notifications/consumer-notification-pushing');
const createScheduledNotification = require('../../notification/createScheduledNotification');

consumeFromQueue("notification-pushing-queue", createScheduledNotification);