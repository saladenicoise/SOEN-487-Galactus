const consumeFromQueue = require('../../../../../rabbitmq/utilities/notifications/consumer-notification-pushing');
const amqp = require('amqplib');
const { Buffer } = require('buffer');

jest.mock('amqplib');

describe('consumer-notification-pushing', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('receives a message from the queue and processes it', async () => {
    // Define the message to send
    const message = { location: 'London', language: 'en', content: 'Hello' };

    // Mock the channel object returned by amqplib
    const channel = {
        assertQueue: jest.fn(),
        consume: jest.fn(),
        prefetch: jest.fn(),
      };

    // Mock the cluster object returned by amqplib
    const cluster = {
      createChannel: jest.fn(() => channel),
      close: jest.fn(),
    };
    amqp.connect.mockResolvedValue(cluster);

    // Define the task function that processes the notification
    const task = jest.fn();

    // Call the consumeFromQueue function with the task function
    await consumeFromQueue('notification-polling-queue', task, false, false, null);

    // Check that the amqplib functions were called with the expected arguments
    expect(amqp.connect).toHaveBeenCalledWith(
      'amqps://shdtwjbe:ErN_h2yhsDwmTZRgRYl8SU68t9ylyps2@codfish.rmq.cloudamqp.com/shdtwjbe'
    );
    expect(cluster.createChannel).toHaveBeenCalled();
    expect(channel.assertQueue).toHaveBeenCalledWith('notification-polling-queue', false);
    expect(channel.prefetch).not.toHaveBeenCalled();
    expect(channel.consume).toHaveBeenCalledWith('notification-polling-queue', expect.any(Function), { noAck: false });

  });
});
