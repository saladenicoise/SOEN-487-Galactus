// We need this to call the script from the command line
const consumeFromPollingQueue = require("../../rabbitmq-utility/notification-service/consumer-notification-polling");
// TODO: change to getWeatherData
const getWeather = require("../../weather-utility/notify-nexus-util/getWeatherData");
const publish = require("../../rabbitmq-utility/notification-service/produce-notification-pushing");
const processReceivedJSON = require("../../rabbitmq-utility/notification-service/util/processReceivedJSON");
// const redisProm = require('redis-promisify');

// const client = redisProm.createClient({
//     legacyMode: true,
// });
// client.on('connect', function() {
//     console.log(' [x] Connected to Redis!');
// });

async function pingCreateNotifications(receivedJSON) {
    const data = processReceivedJSON(receivedJSON);

    if (!data) {
        console.log("Data is null. Exiting function.");
        return;
    }

    const notifications = await Promise.all(data.map(async ({cityName, language, time}) => {
        const notificationObj = await getWeather(cityName, language, time);
        return { "location": notificationObj.cityName, "language": notificationObj.language, "time": notificationObj.time, "content": notificationObj.content };
    }));

    const dataStr = JSON.stringify(notifications);
    console.log("dataStr: ",dataStr)
    publish(dataStr);
    // client.quit();
// published format: [{"location":"Montreal","language":"en","time":"13h10","content":"-1C/30.2F Sunny"},{"location":"Montreal","language":"en","time":"13h10","content":"-1C/30.2F Sunny"}]
}

consumeFromPollingQueue("notification-polling-queue", pingCreateNotifications);