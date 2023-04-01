
// method that sends the notifications to all the users provided in passed list/dictionary.
// The argument dictionary provides the userIDs as the keys 
// the interest subscribed by the associated user as the values 
function sendNotifications(listOfUsersAndInterests){
    // TO-DO
    sendingStub(listOfUsersAndInterests);
}

// A stub method to be rewritten
function sendingStub(listOfUsersAndInterests){
    for (const key in listOfUsersAndInterests) {
        if (Object.hasOwnProperty.call(listOfUsersAndInterests, key)) {
            const value = listOfUsersAndInterests[key];
            console.log(`sendingStub(): Key is ${key} and value is ${value}`);
        }
    }
}

module.exports = sendNotifications;