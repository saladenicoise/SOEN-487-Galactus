const produce = require("./producer");

const addingAlertToQueue = (testData) => {
    let jsonString = JSON.stringify(testData);
    produce("my-weather-alerts", jsonString, (durable = false));
}

addingAlertToQueue({ alert: "only the weather queue will get this!" })