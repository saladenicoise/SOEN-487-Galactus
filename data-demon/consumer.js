const rabbit = require("./rabbit.js");
const fs = require("fs");

const consumeFromQueue = async (
  queue,
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
        if (message !== null) {
          // Parse the message content from the JSON then log in locally in file.log
          const weather = JSON.parse(message.content.toString());
          const result =
            "[ " +
            new Date().toISOString() +
            " ] --- " +
            weather.locationObject.city +
            " --- " +
            weather.weatherData[0].weather_condition +
            "\n";
          fs.appendFile("file.log", result, (err) => {
            if (err) {
              console.error(err);
            }
          });
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

// We need this to call the script from the command line
consumeFromQueue("Q1_weather");
