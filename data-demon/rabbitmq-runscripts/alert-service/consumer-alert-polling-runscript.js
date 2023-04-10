// We need this to call the script from the command line
const consumeFromPollingQueue = require("../../rabbitmq-utility/alert-service/consumer-alert-polling");
// const weatherRetrievalAPIsStub = require("../../weather-utility/weatherRetrievalAPIsStub"); // stub
const getWeatherAlertsData = require('../../weather-utility/notify-nexus-util/getWeatherAlertsData');
const publish = require("../../rabbitmq-utility/alert-service/produce-alert-pushing");
const axios = require('axios')
require('console-stamp')(console, '[HH:MM:ss.l]');

function pingCreateAlerts(data) {
    // expected data: data = "locationStr"
    // console.log('Debugging pingCreateAlerts, data=', JSON.stringify(data));
    let alertObj = undefined;
    getWeatherAlertsData(data.location, axios)
        .then((res) => {
            // res is an array of alerts
            return res.map(alert => {
                return {
                    location: data.location,
                    alertContent: `${alert.title} - ${alert.description}`
                }
            })
        })
        .then(alerts => {
            // parse alertObj into message
            alerts.forEach((alertObj) => {
                // const alert = { "location": alertObj.location.replace(/^[^\w_\-=@,.]/g, ' '), "alertContent": alertObj.content.replace(/^[^\w_\-=@,.]/g, ' ') };
                console.log('alert from pingCreateAlerts alertObj=', alertObj);
                const dataStr = JSON.stringify(alertObj);
                publish(dataStr);
            })

        })



}

consumeFromPollingQueue("alerts-polling-queue", pingCreateAlerts);