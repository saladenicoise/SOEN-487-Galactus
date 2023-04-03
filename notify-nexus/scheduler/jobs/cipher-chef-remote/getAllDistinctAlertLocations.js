// This function does a JSON-RPC call to the User service (cipher-chief) or directly to its Firebase user collection
// The expected data format is an array of string location
// ex. [ "montreal,qc,canada", "london,uk", "brisbane,australia" ]

function getAllDistinctAlertLocations(throwAwayNumber, queryCallback = getLocationsStub) {
    return queryCallback();
}

function getLocationsStub() {
    const locations = [ "montreal,qc,canada", "london,uk", "brisbane,australia" ];
    return locations;
}

// function getLocations() {
//     // TODO This is the real query to cipher-chief 
//     return [];
// }

module.exports = getAllDistinctAlertLocations;