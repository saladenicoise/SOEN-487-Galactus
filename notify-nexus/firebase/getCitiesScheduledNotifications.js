const getAllUsers = require('./getAllUsers')

async function getCitiesSchedulesNotifications(timeIndex , axios) {
  const currentTime = reverseIndexToTime(timeIndex);
  const allUsers = await getAllUsers(axios);
  const currentUsers = {};
  for (const userId in allUsers) {
    const userData = allUsers[userId];
    if (userData.notificationSchedule === currentTime) {
      const triplet = `${userData.city}-${userData.language}-${userData.notificationSchedule}`;
      currentUsers[triplet] = { location: userData.city, language: userData.language, time: userData.notificationSchedule };
    }
  }
  return Object.values(currentUsers);
}


function reverseIndexToTime(index) {
  // Ensure that the index is within the valid range of 0 to 287
  if (index < 0 || index > 287) {
    throw new Error('Index falls outside the range of 0 to 287.');
  }

  // Calculate the hour and minute based on the index
  let hour = Math.floor(index / 12);
  let minute = (index % 12) * 5;

  // Format the hour and minute as strings with leading zeros if necessary
  let formattedHour = hour.toString().padStart(2, '0');
  let formattedMinute = minute.toString().padStart(2, '0');

  return `${formattedHour}h${formattedMinute}`;
}
  

// //Usage
// getCurrentUsers('15h10')
//   .then((currentUsers) => console.log(currentUsers))
//   .catch((error) => console.error(error));

// console.log(reverseIndexToTime(182));

module.exports = getCitiesSchedulesNotifications;
