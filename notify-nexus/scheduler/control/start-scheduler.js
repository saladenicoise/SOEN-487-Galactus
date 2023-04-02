// This is a JavaScript module that exports a function 
// startScheduler, which starts a toad-scheduler with two jobs to 
// run periodically: getUsersAndInterests and sendNotifications. 
// The startScheduler function takes an optional argument 
// frequencyInSeconds which specifies the frequency of the job in 
// seconds, defaulting to 300 (5 minutes).

const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');
const getUsersAndInterests = require('../jobs/get_users_and_interests');
const sendNotifications = require('../jobs/send_notifications');


// This function starts by defining a Task object that runs the getUsersAndInterests and sendNotifications jobs. 
// It then creates a SimpleIntervalJob that runs the task at the specified frequency.
// Before starting this SimpleIntervalJob, it waits to the beginning of the next 5 minute interval
function startScheduler(frequencyInSeconds = 300) {
    // every five minutes = 300 seconds

    const task = new Task('notifyEach5mins', () => { 
        let listOfUsersAndInterests = getUsersAndInterests(getCurrentTimeIndex());
        sendNotifications(listOfUsersAndInterests);
    })

    const job = new SimpleIntervalJob({ seconds: frequencyInSeconds, runImmediately: true}, task)

    // wait until the beginning of the next 5 minute interval
    var currentTime = new Date();
    var secondsToWait = diffInSeconds(currentTime, roundDateToNext5Minutes(currentTime));

    // TO DO : TO BE REPLACED
    busyWaitToStartJob(secondsToWait, job);
    // TO BE REPLACED WITH
    // startJobInXSeconds(secondsToWait, job);
}

// This function takes two Date objects as arguments and returns the difference in seconds between them.
function diffInSeconds(date1, date2) {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      throw new Error('Both arguments must be Date objects.');
    }
  
    const diffInMillis = Math.abs(date2.getTime() - date1.getTime());
    const diffInSeconds = Math.floor(diffInMillis / 1000);
  
    return diffInSeconds;
  }


// This function takes an integer argument between 0 and 59 and rounds it down to the nearest multiple of 5.
function roundIntTo5minutes(minutes) {
    // Check that the argument is a whole number
    if (!Number.isInteger(minutes)) {
      throw new Error('Argument must be a whole number.');
    }
  
    // Check that the argument is within the valid range
    if (minutes < 0 || minutes >= 60) {
      throw new Error('Argument must be between 0 and 59.');
    }
  
    return Math.floor(minutes / 5) * 5;
}

// This function rounds minutes in Date format to the start of the next 5 minute period
function roundDateToNext5Minutes(dateArg) {
    var date = new Date(dateArg);
    if (!(date instanceof Date)) {
      throw new Error('Argument must be a Date object.');
    }
    
    const roundedMinutes = Math.ceil(date.getMinutes() / 5) * 5;
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }
  

// Every 5-minute period in 24 hours has its unique index
// This method provides this index for the current time.
function getCurrentTimeIndex(){
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentMinute = roundIntTo5minutes(currentDate.getMinutes());

     // Calculate the index based on the current hour and rounded minute
    let index = currentHour * 12 + currentMinute/5;

    // Ensure that the result is an integer
    if (!Number.isInteger(index)) {
        throw new Error('Result is not an integer.');
    }

    // Ensure that the result falls within the range of 0 to 287
    if (index < 0 || index > 287) {
        throw new Error('Result falls outside the range of 0 to 287.');
    }

    return index;
}

// temporary function, to be changed to the non-blocking one
function busyWaitToStartJob(seconds, job){
    setTimeout(() => {
        const scheduler = new ToadScheduler();
        scheduler.addSimpleIntervalJob(job);
    }, seconds*1000);
}

// BROKEN CODE FOR NOW
// wait for X seconds before starting the job
// function startJobInXSeconds(secondsToWait, job){
//     const scheduler = new ToadScheduler();

//     const waitingTask = new Task('startAnotherJob', () => { 
//         console.log("Running another")
//         scheduler.addSimpleIntervalJob(job);
//         console.log("Inside start before:"+scheduler.getById('startAnotherJob').getStatus());
//         scheduler.removeById('startAnotherJob');
//         // console.log("Inside start after:"+scheduler.getById('startAnotherJob').getStatus());
//     }, { id: 'startAnotherJob' })
    
//     const waitingJob = new SimpleIntervalJob({ seconds: secondsToWait, runImmediately: false}, waitingTask)
//     scheduler.addSimpleIntervalJob(waitingJob);
//     // console.log("Outside start after:"+scheduler.getById('startAnotherJob').getStatus());
// }
// BROKEN CODE

module.exports = startScheduler;
