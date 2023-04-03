// This module is inspired from get_users_and_interests.js


// TODO RETHINK INPUT FORMATTING
// This is sufficient :
// [ 
//     { location: "montreal", time: "8:00" }, 
//     { location: "montreal", time: "8:01" }, 
//     { location: "brisbane", time: "8:01" }, 
// ]


// COMMENTS BELOW TO DELETE ??
// This function does a JSON-RPC call to the User service (cipher-chief) or directly to its Firebase user collection
// The expected input data format could be a JSON array of key-value pairs, with key location and value is an array of times
// ex.    [ 
//     { "montreal,qc,canada": [ "08:00", "15:05" ] },
//     { "brisbane,australia": [ "12:55" ]}
// ]

// ???
// The expected return a dictionary of similar format ^^ ?? or an array
// ex. { 
//        "montreal,qc,canada": [ "08:00", "15:05" ],
//        "brisbane,australia": [ "12:55" ]
// }
function getAllScheduledNotifications(timeIndex, queryCallback = getSchedulesStub) {
    return queryCallback(timeIndex);
}

function getSchedulesStub(timeIndex) {

    return [
        {"montreal,qc,canada": [ "15:01", "15:05" ]},
        {"brisbane,australia": [ "15:01", "15:02", "15:03", "15:04" ]},
        {"bombai,india": [ "15:03", "15:04", "15:05" ]}
    ];
}

function getSchedules(timeIndex) {
    // TODO This is the real function that queries cipher-chief
    // ...

    // Get all notification preferences that are due within the next 5min of the timeIndex
    let currentHour = Math.floor((timeIndex*5)/60);
    let currentMinute = (timeIndex*5)%60;

    return {};
}

module.exports = { getAllScheduledNotifications, getSchedules };