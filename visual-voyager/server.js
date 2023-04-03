const express = require('express');
const RPC = require('./rpc');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const app = express();

// Middleware
app.use(express.json());
const rpc = new RPC('http://localhost:3000/rpc');

// This following is the "generateVisual" end-point/procedure
app.post('/generateVisual', async (req, res) => {
  try {
    const weatherData = req.body.weatherData;
    //const historicalData = req.body.historicalData;

    // Create the chart using chartjs-node-canvas
    const width = 800;
    const height = 600;
    const chartCallback = (ChartJS) => {
      // Configure the Chart.js instance here. 
      // Useful when you need to register plugins,
      // controllers, or other extensions 
      // that should be available to all charts created 
      // with the same Chart.js instance
      ChartJS.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    };
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
    const chartConfiguration = {
      type: 'line', // line chart
      data: {
        labels: weatherData.map(data => data.date),// An array of labels for the chart x-axis
        datasets: [{
          label: 'Temperature',// 
          data: weatherData.map(data => data.temperature),// An array of data points for the chart y-axis
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 5, 
          fill: false,
        }]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: 'Temperature over time' //we will specify in the weatherData the time, week? 10 days? month?
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Temperature (°C)'
            }
          }]
        }
      }
    };

    // This converts the raw binary data of the chart into a Buffer object.
    // Buffer objects are data structures designed to encapsulate
    // chunks of raw binary data, so that it is more convenient to work with.
    const image = await chartJSNodeCanvas.renderToBuffer(chartConfiguration);

    // Returns the base64-encoded chart image
    // To return this image to the data service, it's convenient to convert it 
    // to a base64-encoded string. This way, the image can be easily transmitted 
    // over HTTP as part of the JSON response. Not only in the response from this
    // service to the data service, but also from the data service to the UI.
    const base64Image = image.toString('base64');

    // Finally response is sent back
    res.status(200).json({ chartImage: base64Image });
  } catch (error) {
    res.status(500).json({ error: 'Error generating chart' });
  }
});

// Start the server
const port = process.env.PORT || 3002; // why is it port 3002 not 3000
app.listen(port, () => {
  console.log(`Visual Voyager Server started on port ${port}`);
});

// Define the RPC endpoint for sending weather data to the data server
const sendWeatherData = async (weatherData) => {
  try {
    const response = await axios.post('http://localhost:3000/weatherData', weatherData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error sending weather data to data server');
  }
};

module.exports = {
  sendWeatherData,
};