const getWeeklyVisualData = (weatherData) => {
    if(!weatherData) {
        console.log("tried to feed empty data to forecast")
        return;
    }
    return fetch('http://localhost:3002/weeklyVisual', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weatherData,
    }).then(visualData => {
        if(!visualData) {
            console.log("no visual data returned from forecast");
            return;
        }
        return visualData; //JSON object containing base64 encoded images
    }).catch(err => {
        console.log(err);
    });
};

const getHistoricalVisualData = (weatherData) => {
    if(!weatherData) {
        console.log("tried to feed empty data to forecast")
        return;
    }
    return fetch('http://localhost:3002/historicalVisual', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: weatherData,
    }).then(visualData => {
        if(!visualData) {
            console.log("no visual data returned from forecast");
            return;
        }
        return visualData; //JSON object containing base64 encoded images
    }).catch(err => {
        console.log(err);
    });
};

module.exports = {getWeeklyVisualData, getHistoricalVisualData};