
// method that returns a dictionary of users that requested notifications at the specified time,
// with the userIDs as the keys and  the values being the interest subscribed by the associated user
function provideDictionary(timeIndex){
    // TO-DO
    return dictionaryStub(timeIndex);
}

// A stub method to be rewritten
function dictionaryStub(timeIndex){
    var currentHour = Math.floor((timeIndex*5)/60);
    var currentMinute = (timeIndex*5)%60;
    var testDict = {
        "user1": `interest1 at ${currentHour}:${currentMinute}`,
        "user2": `interest2 at ${currentHour}:${currentMinute}`
      };
    return testDict;
}


module.exports = provideDictionary;