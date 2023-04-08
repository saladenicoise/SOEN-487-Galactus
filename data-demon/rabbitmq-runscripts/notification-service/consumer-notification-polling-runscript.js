// We need this to call the script from the command line
const consumeFromPollingQueue = require("../../rabbitmq-utility/notification-service/consumer-notification-polling");
// TODO: change to getWeatherData
const weatherRetrievalAPIsStubNotif = require("../../weather-utility/notify-nexus-util/weatherRetrievalAPIsStubNotification");
const publish = require("../../rabbitmq-utility/notification-service/produce-notification-pushing");
const processReceivedJSON = require("../../rabbitmq-utility/notification-service/util/processReceivedJSON");

function pingCreateNotifications(receivedJSON) {
    const data = processReceivedJSON(receivedJSON);

    const notifications = data.map(({cityName, language, time}) => {
        const notificationObj = weatherRetrievalAPIsStubNotif(cityName, language, time);
        return { "location": notificationObj.location, "language": notificationObj.language, "time": notificationObj.time, "content": notificationObj.content };
    });

    const dataStr = JSON.stringify(notifications);
    publish(dataStr);
// published format: [{"location":"Montreal","language":"en","time":"13h10","content":"-1C/30.2F Sunny"},{"location":"Montreal","language":"en","time":"13h10","content":"-1C/30.2F Sunny"}]
}

consumeFromPollingQueue("notification-polling-queue", pingCreateNotifications);