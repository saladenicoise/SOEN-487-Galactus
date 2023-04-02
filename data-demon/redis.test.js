var redis = require("redis");
var connected = false;

 test('Redis connection at port 6379', () => {
    const client = redis.createClient({
        legacyMode: true,
      });
    
    client.connect().catch(console.error);
    
    client.on('connect', function() {
     connected = true
     expect(connected).toBe(true);
    });
  });