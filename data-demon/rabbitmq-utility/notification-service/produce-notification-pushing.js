const producer = require("../generic-producer");

const addingNotificationToQueue = (mess) => {
  producer("notification-pushing-queue", mess, (durable = false));
}

module.exports = addingNotificationToQueue;