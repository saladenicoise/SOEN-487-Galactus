const getAllUsers = require('./getAllUsers')

async function getCurrentUsers(currentTime) {
  const allUsers = await getAllUsers();
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

// //Usage
// getCurrentUsers('15-10')
//   .then((currentUsers) => console.log(currentUsers))
//   .catch((error) => console.error(error));

module.exports = getCurrentUsers;