// get the list of users subscribed for current 5-minute period
// get location, language
const axios = require( 'axios');

module.exports = async function getAllUsers() {
    try {
        const response = await axios.get('https://galactus-eaece-default-rtdb.firebaseio.com/Cities.json');
        const processedCitiesData = processCitiesData(response.data);
        // console.log(processedCitiesData);
        return processedCitiesData;
    } catch (error) {
        console.error('Cannot get cities from firebase!', error);
        throw error;
    }
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


function processCitiesData(citiesData) {
  const processedCitiesData = {};
  for (const key in citiesData) {
    const cityData = citiesData[key];
    // Check if cityData has all required fields
    if (cityData.city && cityData.notificationSchedule && cityData.language && cityData.isNotification) {
      const notificationTime = cityData.notificationSchedule;
      const [hours, minutes] = notificationTime.split(':').map(Number);
      const roundedMinutes = roundIntTo5minutes(minutes);
      const processedNotificationTime = `${hours.toString().padStart(2, '0')}-${roundedMinutes.toString().padStart(2, '0')}`;
      processedCitiesData[key] = {
        city: cityData.city,
        language: cityData.language,
        notificationSchedule: processedNotificationTime
      };
    }
  }
  return processedCitiesData;
}

