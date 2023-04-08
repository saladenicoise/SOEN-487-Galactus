
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


module.exports = {
    diffInSeconds,
    roundIntTo5minutes,
    roundDateToNext5Minutes,
    getCurrentTimeIndex,
    busyWaitToStartJob
  };