const createScheduledNotification = require('../../../notification/createScheduledNotification');

test('createScheduledNotification should not return null', async () => {
  const weatherNotification = {
    location: 'MONTREAL',
    time: 'morning',
    language: 'en',
    content: 'It will be sunny today.',
  };

  const result = await createScheduledNotification(weatherNotification);

  expect(result).not.toBeNull();
});