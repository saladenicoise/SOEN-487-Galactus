function queryWeatherNotificationStubNotification (data) {
    // data format: {"location": string, "language": string}

    const res = {"type": "notification", "location": data.location, "language": data.language, "content": "STUB Notification: Successful polling of user-service and data-service for notification every 5min." }
    console.log(`Stub weatherRetrievalAPIsNotifiation fetched ${res.type} in ${res.location}: ${res.content}`);
    return res;
}

module.exports = queryWeatherNotificationStubNotification;