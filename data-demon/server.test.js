//Should enccompass both geoCoding and weatherRetrieval APIs since they are both called in the endpoints, and thus testing to see if the endpoints are valid is good
//10 seconds timeout
// const redis = require("redis");
// const client = redis.createClient({
//     legacyMode: true,
// });
// client.connect().catch(console.error);
// client.on('connect', function() {
//     console.log("Connected To Redis")
// });

// test('Invalid City Name from Endpoint', async () => {
//     let cityName = 'ulululu';
//     let language = 'en';

//     await fetch('http://localhost:3000/fromAddress?cityName=' + cityName + '&lang=' + language).then(res => {
//         expect(res.status).toBe(404);
//     });
//     client.flushAll();
// }, 10000);

// test('Valid City Name & Language from Endpoint', async () => {
//     let cityName = 'Toronto';
//     let language = 'en';

//     await fetch('http://localhost:3000/fromAddress?cityName=' + cityName + '&lang=' + language).then(res => {
//         expect(res.status).toBe(200);
//     });
//     client.flushAll();
// }, 10000);

// test('Invalid Language from Endpoint', async () => {
//     let cityName = 'London';
//     let language = 'ulululu';

//     await fetch('http://localhost:3000/fromAddress?cityName=' + cityName + '&lang=' + language).then(res => {
//         expect(res.status).toBe(200);
//     });
//     client.flushAll();
// }, 10000);

const geoCoding = require("./weather-utility/geoCodingAPI.js");

const MOCK_RETURN = {
    latitude: 37.386,
    longitude: -122.0838,
    city: 'Mountain View',
    state: 'California',
    state_abrv: 'CA',
    country: 'United States',
    time_zone: 'America/Los_Angeles',
}
const MOCK_CITY = 'Mountain View';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(MOCK_RETURN)
}));

describe('Geocaching API mock tests', () => {
    let location;

    describe('When calling an IP address to get a city location', () => {
        beforeEach(async () => {
            location = await geoCoding.getLocationFromIp('127.0.0.1');
        });

        it('Then the correct city should be returned', () => {
            expect(MOCK_CITY).toEqual( location.city);
        });
    });
});