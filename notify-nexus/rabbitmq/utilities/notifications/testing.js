const send = require('./producer-notification-polling');

const result = [{ location: 'Montreal', language: 'fr', time: '13h10' },{ location: 'Montreal', language: 'en', time: '13h10' }];

send(result);