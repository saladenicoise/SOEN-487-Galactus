function queryWeatherNotificationStubNotification (cityName, language, time) {

    // const res = {"type": "notification", "location": data.location, "language": data.language, "content": "STUB Notification: Successful polling of user-service and data-service for notification every 5min." }
    const res = {
        location: 'Montreal',
        language: 'en',
        time: '13h10',
        content: '-1C/30.2F Sunny'
      };      
    console.log(`Stub weatherRetrievalAPIsNotifiation fetched notification in ${res.location}: ${res.content}`);
    return res;
}

module.exports = queryWeatherNotificationStubNotification;

