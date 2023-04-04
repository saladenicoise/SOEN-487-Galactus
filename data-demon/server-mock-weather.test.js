const weatherRetrieval = require("./weather-utility/weatherRetrievalAPIs.js");

const MOCK_RETURN = {
    weatherData: [
        {
            date: "2023-04-04",
            daily_information: {
                avg_humidity: 90,
            }
        },
    ]
}

const MOCK_DATE = "2023-04-04";
const MOCK_HUMIDITY = 90;

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(MOCK_RETURN)
}));

describe('Weather API mock tests', () => {
    let weatherMockReturn;

    describe('When retrieving weather data for a set of coordinates', () => {
        beforeEach(async () => {
            weatherMockReturn = await weatherRetrieval.fetchWeatherData('45.572744', '73.586295', 'en');
            
        });

        it('Then the correct date should be returned', () => {
            expect(MOCK_DATE).toEqual(weatherMockReturn.weatherData[0].date);
        });
        it('Then the correct humidity should be returned', () => {
            expect(MOCK_HUMIDITY).toEqual(weatherMockReturn.weatherData[0].daily_information.avg_humidity);
        });
    });
});