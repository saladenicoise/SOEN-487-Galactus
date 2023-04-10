// producer-notification-polling.test.js
const produce = require('../../../../../rabbitmq/utilities/notifications/producer-notification-polling');
const publishToQueue = require('../../../../../rabbitmq/utilities/generic-producer');

jest.mock('../../../../../rabbitmq/utilities/generic-producer');

describe('producer-notification-polling', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('sends a message to the queue', async () => {
    // Define the message to send
    const message = { location: 'London', language: 'en' };

    // Call the produce function with the message
    produce(message);

    // Check that the publishToQueue function was called with the correct arguments
    expect(publishToQueue).toHaveBeenCalledWith(
      'notification-polling-queue',
      JSON.stringify(message),
      false
    );
  });
});