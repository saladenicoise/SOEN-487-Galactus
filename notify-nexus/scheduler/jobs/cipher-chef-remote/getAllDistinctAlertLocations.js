// This function does a JSON-RPC call to the User service (cipher-chief) or directly to its Firebase user collection
// The expected data format is an array of string location
// ex. [ "montreal,qc,canada", "london,uk", "brisbane,australia" ]

// TODO delete and add axios as parameter (axios should be setup in server instead)
const getCitiesAlerts = require('../../../firebase/getCitiesAlerts');

function getAllDistinctAlertLocations(throwAwayNumber, axios, queryCallback = getCitiesAlerts) {

    return queryCallback(axios)

}

function getLocationsStub() {
    const locations = ["montreal", "london", "brisbane"];
    return locations;
}

// function getLocations() {
//     // TODO This is the real query to cipher-chief 
//     return [];
// }

module.exports = getAllDistinctAlertLocations;