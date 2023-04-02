// We need this to call the script from the command line
const consumeFromQueue = require("../../rabbitmq-utility/logger/consumer-logger");

consumeFromQueue("Q1_weather");