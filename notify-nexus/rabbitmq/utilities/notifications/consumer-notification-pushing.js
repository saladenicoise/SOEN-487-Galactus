// receive current weather information from data service
// use the endpoint /fromAddress - add cityName, language inside of the query

const amqp = require("amqplib");
var amqpURL =
  "amqps://shdtwjbe:ErN_h2yhsDwmTZRgRYl8SU68t9ylyps2@codfish.rmq.cloudamqp.com/shdtwjbe";

const consumeFromQueue = async (queue, task, isNoAck = false, durable = false, prefetch = null) => {

    const cluster = await amqp.connect(amqpURL);
    const channel = await cluster.createChannel();

    await channel.assertQueue(queue, durable=false);

    if (prefetch) {
        channel.prefetch(prefetch);
    }

    console.log(` [x] Waiting for messages in ${queue}. To exit press CTRL+C`)
   
    try {
        channel.consume(queue, message => {
      if (message !== null) {
        console.log(' [x] Received', JSON.parse(message.content.toString()));
        channel.ack(message);

        // Parse
        // Notification is expected to have the format: { "location": string, "language": string, "time":string, "content": string}
        const notif =  JSON.parse(message.content.toString())
        // Task that needs the notification
        task(notif);

        return null;
      } else {
        console.log(error, 'Queue is empty!')
        channel.reject(message);
      }
    }, {noAck: isNoAck})
    } catch (error) {
        console.log(error, 'Failed to consume messages from Queue!')
        cluster.close(); 
    }
}

module.exports = consumeFromQueue;



