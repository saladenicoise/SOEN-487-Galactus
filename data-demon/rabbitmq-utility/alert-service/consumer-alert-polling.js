const rabbit = require("../rabbit.js");
const fs = require("fs");

const consumeFromPollingQueue = async (
  queue,
  task,
  isNoAck = false,
  durable = false,
  prefetch = null
) => {
  // Connect to RabbitMQ using methods in the rabbit.js file
  const cluster = await rabbit();
  // Must be able to create a channel to send messages
  const channel = await cluster.createChannel();
  // Make a new queue
  await channel.assertQueue(queue, (durable = false));

  if (prefetch) {
    channel.prefetch(prefetch);
  }

  console.log(` [x] Waiting for messages in ${queue}. To exit press CTRL+C`);

  try {
    // If there are messages in the queue, consume them asap
    channel.consume(
      queue,
      (message) => {
        /*
          Message format: location as city
        */
        if (message !== null) {
          // Parse the message content from the JSON then log in locally in file.log
          
          // Get weather alerts by city


          // LOGGER commented out, to update if want to use it
          // const result =
          //   "[ " +
          //   new Date().toISOString() +
          //   " ] --- " +
          //   weather.locationObject.city +
          //   " --- " +
          //   weather.weatherData[0].weather_condition +
          //   "\n";
          // fs.appendFile("alert_polling.log", result, (err) => {
          //   if (err) {
          //     console.error(err);
          //   }
          // });

          // TODO Task: retrieve weather alerts from location
          task(message)

          console.log(" [x] Received ", queue);
          channel.ack(message);
          return null;
        } else {
          console.log(error, "Queue is empty!");
          channel.reject(message);
        }
      },
      { noAck: isNoAck }
    );
  } catch (error) {
    console.log(error, "Failed to consume messages from Queue!");
    cluster.close();
  }
};

// export this function so we can use it in other files
module.exports = consumeFromPollingQueue;
