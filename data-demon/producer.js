const amqp = require("amqplib");
var amqpURL =
  "amqps://shdtwjbe:ErN_h2yhsDwmTZRgRYl8SU68t9ylyps2@codfish.rmq.cloudamqp.com/shdtwjbe";
const publishToQueue = async (queue, message, durable = false) => {
  try {
    const cluster = await amqp.connect(amqpURL);
    const channel = await cluster.createChannel();

    await channel.assertQueue(queue, (durable = false));
    await channel.sendToQueue(queue, Buffer.from(message));

    console.info(" [x] Sending message to queue", queue, message);
  } catch (error) {
    // handle error response
    console.error(error, "Unable to connect to cluster!");
    process.exit(1);
  }
};

module.exports = publishToQueue;
