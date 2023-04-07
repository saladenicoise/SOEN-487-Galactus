const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { createTemperatureChart, handleTemperatureCharts } = require('./chart_util');
const app = express();

// Middleware
app.use(express.json());



//weekly forecast endpoint
app.get('/weeklyVisual', async(req,res) => {

  try{

    //The following line of code results in a javascript array, containing javascript objects containing the data for each of the following 7 days
    const weatherData = require('./weeklyData.json') // Loads the contents of the 'weeklyData.json' file that we will work with for testing
    ['weatherData'] // Accesses the 'weatherData' property of the loaded JSON object
    .filter(day => day.type === 'forecast-day'); // Filters the array to only include objects with a 'type' property equal to 'forecast-day'
    
    //console.log(weatherData); //<--This will print the contents to the terminal

    // Calls the 'createTemperatureChart' function with 'weatherData' as an argument, and waits for the Promise to resolve. The result is an image buffer representing the chart, which contains the raw data needed to construct the image, such as pixel information, color information, and image format.
    const chart = await createTemperatureChart(weatherData); 
    // Logs the resulting image buffer to the console for debugging purposes.
    console.log('Generated chart image buffer:', chart);
    //console.log('Image buffer to string: ', chart.toString('base64'));
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(chart); // Sends the image buffer as the response body. The client will receive this as a PNG image.
    
 } catch (error) {
   console.error('Error generating chart:', error);
   res.status(500).json({ error: 'Error generating weekly chart' });
}
});

// This following is the "generateVisual" end-point/procedure
app.get('/historicalVisual', async (req, res) => {
  try {

    const weatherData = require('./historicalData.json') // Loads the contents of the 'weeklyData.json' file that we will work with for testing
    ['weatherData'] // Accesses the 'weatherData' property of the loaded JSON object
    .filter(day => day.type === 'historical-day'); // Filters the array to only include objects with a 'type' property equal to 'forecast-day'
    
    //console.log(weatherData); //<--This will print the contents to the terminal

    // Calls the 'createTemperatureChart' function with 'weatherData' as an argument, and waits for the Promise to resolve. The result is an image buffer representing the chart, which contains the raw data needed to construct the image, such as pixel information, color information, and image format.
    const chart = await createTemperatureChart(weatherData); 
    // Logs the resulting image buffer to the console for debugging purposes.
    console.log('Generated chart image buffer:', chart);
    //console.log('Image buffer to string: ', chart.toString('base64'));
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(chart); // Sends the image buffer as the response body. The client will receive this as a PNG image.
    


  } catch (error) {
    res.status(500).json({ error: 'Error generating historical chart' });
  }
});


// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Visual Voyager Server started on port ${port}`);
});
