const rabbit = require("./rabbit.js");
const publishToQueue = async (queue, message, durable = false) => {
  try {
    const cluster = await rabbit();
    const channel = await cluster.createChannel();

    await channel.assertQueue(queue, (durable = false));
    await channel.sendToQueue(queue, Buffer.from(message));

    console.info(" [x] Sending message to ", queue);
  } catch (error) {
    // handle error response
    console.error(error, "Unable to connect to cluster!");
    process.exit(1);
  }
};

module.exports = publishToQueue;
