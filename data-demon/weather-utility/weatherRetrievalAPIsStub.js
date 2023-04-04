function queryWeatherAlertsStub (data) {
    // data format: {location: "montreal,qc"}

    const res = {"type": "alert", "location": data.location, "content": "STUB ALERT: Successful polling of user-service and data-service for alerts every 5min." }
    console.log(`Stub weatherRetrievalAPIs fetched ${res.type} in ${res.location}: ${res.content}`);
    return res;
}

module.exports = queryWeatherAlertsStub;