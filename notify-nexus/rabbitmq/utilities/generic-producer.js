const amqp = require("amqplib");
var amqpURL =
  "amqps://shdtwjbe:ErN_h2yhsDwmTZRgRYl8SU68t9ylyps2@codfish.rmq.cloudamqp.com/shdtwjbe";
const publishToQueue = async (queue, message, durable = false) => {
  try {
    const cluster = await amqp.connect(amqpURL);
    // Must be able to create a channel to send messages
    const channel = await cluster.createChannel();
    // Make a new queue
    await channel.assertQueue(queue, (durable = false));
    // Send the message to the queue
    await channel.sendToQueue(queue, Buffer.from(message));

    console.info(" [x] Sending message to ", queue);

    // timeout the producer since we no longer need them.
    setTimeout(function () {
      cluster.close();
    }, 500);
  } catch (error) {
    // handle error response
    console.error(error, "Unable to connect to cluster!");
    process.exit(1);
  }
};

// export this function so we can use it in other files
module.exports = publishToQueue;