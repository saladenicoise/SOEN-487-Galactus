
// format json received from notify-nexus
// check for correct format, and make the list if it is a bulk send
// [{"location":"Montreal","language":"fr","time":"03h10"},{"location":"Montreal","language":"en","time":"03h10"}]
function processReceivedJSON(receivedJSON){
    let data = receivedJSON;


    if (!Array.isArray(data)) {
        console.error('JSON data is not an array');
        return null;
    }

    const expectedKeys = ['location', 'language', 'time'];
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        if (!expectedKeys.every(key => obj.hasOwnProperty(key))) {
        console.error('Invalid JSON data format:MIssing keys');
        return null;
        }
    }

    return data.map(obj => ({
        cityName: obj.location,
        language: obj.language,
        time: obj.time
    }));

}

// let result = [{"location":"Montreal","language":"fr","time":"03h10"},{"location":"Montreal","language":"en","time":"03h10"}];
// console.log(processReceivedJSON(result));

module.exports = processReceivedJSON;
