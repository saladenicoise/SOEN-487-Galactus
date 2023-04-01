//Should enccompass both geoCoding and weatherRetrieval APIs since they are both called in the endpoints, and thus testing to see if the endpoints are valid is good

test('Invalid City Name from Endpoint', () => {
    let cityName = 'ulululu';
    let language = 'en';

    fetch('http://localhost:3000/fromAddress?cityName=' + cityName + '&lang=' + language).then(res => {
        expect(res.status).toBe(404);
    });
});

test('Valid City Name & Language from Endpoint', () => {
    let cityName = 'Toronto';
    let language = 'en';

    fetch('http://localhost:3000/fromAddress?cityName=' + cityName + '&lang=' + language).then(res => {
        expect(res.status).toBe(200);
    });
});

test('Invalid Language from Endpoint', () => {
    let cityName = 'Toronto';
    let language = 'ulululu';

    fetch('http://localhost:3000/fromAddress?cityName=' + cityName + '&lang=' + language).then(res => {
        expect(res.status).toBe(404);
    });
});