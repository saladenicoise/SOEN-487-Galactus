const startScheduler = require('../../../../scheduler/control/start-scheduler');
const {
  diffInSeconds,
  roundIntTo5minutes,
  roundDateToNext5Minutes,
  getCurrentTimeIndex,
  busyWaitToStartJob
} = require('./utils_for_testing/utils')

jest.useFakeTimers();

test('startScheduler should start a ToadScheduler with two jobs to run periodically', () => {
  const pollingUserServiceResult = jest.fn();
  const producerMessagesToDataService = jest.fn();
  startScheduler(pollingUserServiceResult, producerMessagesToDataService, frequencyInSeconds=9);
  // Wait for the jobs to run
  var currentTime = new Date();
  var secondsToWait = diffInSeconds(currentTime, roundDateToNext5Minutes(currentTime));
  jest.advanceTimersByTime((secondsToWait+5)*1000);
  // Check that the pollingUserServiceResult and producerMessagesToDataService functions were called
  expect(pollingUserServiceResult).toHaveBeenCalled();
  expect(producerMessagesToDataService).toHaveBeenCalled();
});