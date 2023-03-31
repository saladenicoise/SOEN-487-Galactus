const amqp = require("amqplib");
var amqpURL =
  "amqps://shdtwjbe:ErN_h2yhsDwmTZRgRYl8SU68t9ylyps2@codfish.rmq.cloudamqp.com/shdtwjbe";

const connectToRabbit = async () => {
    return amqp.connect(amqpURL + "?heartbeat=60", function(err, conn) {
      if (err) {
        console.error("[Rabbit]", err.message);
        return setTimeout(start, 1000);
      }
      conn.on("error", function(err) {
        if (err.message !== "Connection closing") {
          console.error("[Rabbit] conn error", err.message);
        }
      });
      conn.on("close", function() {
        console.error("[Rabbit] reconnecting");
        return setTimeout(start, 1000);
      });
      console.log("[Rabbit] connected");
    });
  }
  module.exports = connectToRabbit;