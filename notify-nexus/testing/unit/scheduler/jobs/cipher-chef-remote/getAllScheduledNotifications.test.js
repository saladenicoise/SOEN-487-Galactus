const { getAllScheduledNotifications } = require('../../../../../scheduler/jobs/cipher-chef-remote/getAllScheduledNotifications');

test('returns an array of objects with location and language properties', () => {
  const result = getAllScheduledNotifications(0);
  expect(Array.isArray(result)).toBe(true);
  result.forEach(obj => {
    expect(obj).toHaveProperty('location');
    expect(obj).toHaveProperty('language');
  });
});
