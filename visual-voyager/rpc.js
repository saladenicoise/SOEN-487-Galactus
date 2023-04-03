
const axios = require('axios');

class forecastRPC {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.url = `http://${host}:${port}`;
  }

  async call(method, params) {
    const data = {
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: 1,
    };

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (json.error) {
      throw new Error(json.error.message);
    }
    return json.result;
  }

  async sendWeatherData(weatherData) {
    const method = 'sendWeatherData';
    const params = [weatherData];
    return this.call(method, params);
  }

//   async sendHistoricalData(historicalData) {
//     const method = 'sendHistoricalData';
//     const params = [historicalData];
//     return this.call(method, params);
//   }
}

module.exports = ForecastDataRPC;