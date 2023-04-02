const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const app = express();

// Middleware
app.use(express.json());

// This following is the "generateVisual" end-point/procedure
app.post('/generateVisual', async (req, res) => {
  try {
    const weatherData = req.body.weatherData;
    const historicalData = req.body.historicalData;

    // Create the chart using chartjs-node-canvas
    const width = 800;
    const height = 600;
    const chartCallback = (ChartJS) => {
      // Configure the Chart.js instance here. 
      // Useful when you need to register plugins,
      // controllers, or other extensions 
      // that should be available to all charts created 
      // with the same Chart.js instance
    };
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
    const chartConfiguration = {
      // Define your chart configuration here
      // Basically where to define the settings and data 
      // for an individual chart.
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
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Visual Voyager Server started on port ${port}`);
});