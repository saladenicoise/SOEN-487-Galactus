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

        // DO THE ALERT TASK
        const alert = message.content;
        // TODO extra parsing if necessary 
        // alert is expected to have the format: { "location": string, "alertContent": string}
        task(alert);

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



