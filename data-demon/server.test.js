//Should enccompass both geoCoding and weatherRetrieval APIs since they are both called in the endpoints, and thus testing to see if the endpoints are valid is good
//10 seconds timeout
const redis = require("redis");
const client = redis.createClient({
    legacyMode: true,
});
client.connect().catch(console.error);
client.on('connect', function() {
    console.log("Connected To Redis")
});



test('Invalid City Name from Endpoint', async () => {
    let cityName = 'ulululu';
    let language = 'en';

    await fetch('http://localhost:3000/fromAddress?cityName=' + cityName + '&lang=' + language).then(res => {
        expect(res.status).toBe(404);
    });
    client.flushAll();
}, 10000);

test('Valid City Name & Language from Endpoint', async () => {
    let cityName = 'Toronto';
    let language = 'en';

    await fetch('http://localhost:3000/fromAddress?cityName=' + cityName + '&lang=' + language).then(res => {
        expect(res.status).toBe(200);
    });
    client.flushAll();
}, 10000);

test('Invalid Language from Endpoint', async () => {
    let cityName = 'London';
    let language = 'ulululu';

    await fetch('http://localhost:3000/fromAddress?cityName=' + cityName + '&lang=' + language).then(res => {
        expect(res.status).toBe(200);
    });
    client.flushAll();
}, 10000);