// We need this to call the script from the command line
const consumeFromPollingQueue = require("../../rabbitmq-utility/notification-service/consumer-notification-polling");
const weatherRetrievalAPIsStub = require("../../weather-utility/weatherRetrievalAPIsStubNotification");
const publish = require("../../rabbitmq-utility/notification-service/produce-notification-pushing");

function pingCreateAlerts(data) {
    const notificationObj = weatherRetrievalAPIsStub(data);
    // parse notificationObj into message "location": string, "language": string, "content": string
    const notification = { "location": notificationObj.location, "language": notificationObj.language, "content": notificationObj.content };
    const dataStr = JSON.stringify(notification);
    publish(dataStr);
}

consumeFromPollingQueue("notification-polling-queue", pingCreateAlerts);