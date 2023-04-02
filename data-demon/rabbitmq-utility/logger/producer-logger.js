const rabbit = require("../rabbit.js");

const publishToQueue = async (queue, message, durable = false) => {
  try {
    // Connect to RabbitMQ using methods in the rabbit.js file
    const cluster = await rabbit();
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
