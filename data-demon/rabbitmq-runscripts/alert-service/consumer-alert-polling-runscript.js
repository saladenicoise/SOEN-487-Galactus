// We need this to call the script from the command line
const consumeFromPollingQueue = require("../../rabbitmq-utility/alert-service/consumer-alert-polling");
const weatherRetrievalAPIsStub = require("../../weather-utility/weatherRetrievalAPIsStub");
const publish = require("../../rabbitmq-utility/alert-service/produce-alert-pushing");

function pingCreateAlerts(data) {
    const alertObj = weatherRetrievalAPIsStub(data);
    // parse alertObj into message
    const alert = { "location": alertObj.location, "alertContent": alertObj.content };
    const dataStr = JSON.stringify(alert);
    publish(dataStr);
}

consumeFromPollingQueue("alerts-polling-queue", pingCreateAlerts);