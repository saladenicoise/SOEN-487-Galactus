// We need this to call the script from the command line
const consumeFromPollingQueue = require("../../rabbitmq-utility/alert-service/consumer-alert-polling");
const weatherRetrievalAPIsStub = require("../../weather-utility/weatherRetrievalAPIsStub");
const publish = require("../../rabbitmq-utility/alert-service/produce-alert-pushing");

function pingCreateAlerts(locationStr) {
    const alertObj = weatherRetrievalAPIsStub(locationStr);
    // parse alertObj into message
    const data = { "location": alertObj.location, "alertContent": alertObj.content };
    const dataStr = JSON.stringify(data);
    publish(dataStr);
}

consumeFromPollingQueue("alerts-polling-queue", pingCreateAlerts);