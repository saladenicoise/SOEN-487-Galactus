const producer = require("../generic-producer");

const addingAlertToQueue = (mess) => {
  producer("alerts-pushing-queue", mess, (durable = false));
}

module.exports = addingAlertToQueue;