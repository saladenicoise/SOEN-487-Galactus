const getCitiesSchedulesNotifications = require('../../../firebase/getCitiesScheduledNotifications')


function getAllScheduledNotifications(timeIndex, queryCallback = getSchedulesStub) {
    return queryCallback(timeIndex);
}

function getSchedulesStub(timeIndex, axios) {
// "location": string, "language": string
    return [
        { location: 'Montreal', language: 'fr', time: '03h10' },
        { location: 'Montreal', language: 'en', time: '03h10' }
    ];
}

function getSchedules(timeIndex, axios) {
    return getCitiesSchedulesNotifications(timeIndex, axios);
}

module.exports = { getAllScheduledNotifications, getSchedules };