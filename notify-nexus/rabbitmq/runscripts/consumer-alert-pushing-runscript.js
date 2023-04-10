const consumeFromQueue = require('../utilities/alerts/consumer-alert-pushing');
const createNotification = require('../../notification/createNotification');
require('console-stamp')(console, '[HH:MM:ss.l]');

consumeFromQueue("alerts-pushing-queue", createNotification);