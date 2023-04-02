const produce = require("./producer");

const sendingUserSettings = (testData) => {
    let jsonString = JSON.stringify(testData);
    produce("my-weather-alerts", jsonString, (durable = false));
}

sendingUserAlertSettings({ functionName: "saveUserPreference", arg: { email: "hello@world", webId: "12345" } })
