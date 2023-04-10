const userService = require('./getCities');
const getCitiesAlerts = require('./getCitiesAlerts');
const getCitiesNotifications = require('./getCitiesScheduledNotifications');
const getCurrentSubs = require('./getCitiesScheduledNotifications');
const axios = require('axios');

// userService(axios)
getCitiesAlerts(axios).then((x) => console.log('x = ', x)).catch((err) => console.error(err));
getCurrentSubs(38, axios).then((x) => console.log('x = ', x)).catch((err) => console.error(err));

// getCitiesNotifications(axios);