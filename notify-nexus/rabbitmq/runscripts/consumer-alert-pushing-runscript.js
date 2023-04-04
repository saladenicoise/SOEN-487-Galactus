const consumeFromQueue = require('../utilities/alerts/consumer-alert-pushing');
const createNotification = require('../../notification/createNotification');

consumeFromQueue("alerts-pushing-queue", createNotification);