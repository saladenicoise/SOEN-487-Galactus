var redis = require("redis");
var connected = false;
const client = redis.createClient({
  legacyMode: true,
});

client.connect().catch(console.error);

test("Redis connection at port 6379", () => {

  client.on("connect", function () {
    connected = true;
    client.disconnect();
    expect(connected).toBe(true);
  });

});