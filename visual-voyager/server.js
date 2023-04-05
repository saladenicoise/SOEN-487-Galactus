const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
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
   res.status(500).json({ error: 'Error generating chart' });
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
    res.status(500).json({ error: 'Error generating chart' });
  }
});

// Start the server
const port = process.env.PORT || 3002; // why is it port 3002 not 3000
app.listen(port, () => {
  console.log(`Visual Voyager Server started on port ${port}`);
});

const createTemperatureChart = async (weatherData) => {
  
  const isForecastDay = weatherData[0].type === 'forecast-day';

  const width = (isForecastDay ? 800 : 10000);
  const height = (isForecastDay ? 600 : 600);
  
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ type: 'svg', width, height });

  const dates = weatherData.map(day => day.date);
  const maxTemps = weatherData.map(day => isForecastDay ? day.daily_information.max_temp_c : day.max_temp_c);
  const minTemps = weatherData.map(day => isForecastDay ? day.daily_information.min_temp_c : day.min_temp_c);

  // This configuration defines a line chart with two datasets, one for maximum temperatures and one for minimum temperatures, with smooth lines and different colors for each dataset. The x-axis represents dates, and the y-axis represents temperatures in degrees Celsius. Both axes have titles displayed.

  const configuration = {
    type: 'line', // Specifies the type of chart - in this case, a line chart
    data: {
      labels: dates, // Sets the labels for the x-axis, which are the dates
      datasets: [
        {
          label: 'Max Temperature (°C)', // Label for the first dataset (max temperatures)
          data: maxTemps, // Data points for the first dataset (max temperatures)
          borderColor: 'rgba(255, 99, 132, 1)', // Color of the line for the first dataset
          tension: 0.1, // Controls the line smoothness for the first dataset (0 for straight lines, 1 for maximum smoothness)
        },
        {
          label: 'Min Temperature (°C)', // Label for the second dataset (min temperatures)
          data: minTemps, // Data points for the second dataset (min temperatures)
          borderColor: 'rgba(75, 192, 192, 1)', // Color of the line for the second dataset
          tension: 0.1, // Controls the line smoothness for the second dataset
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true, // Enables the display of the x-axis title
            text: 'Date', // Sets the text for the x-axis title
          },
        },
        y: {
          title: {
            display: true, // Enables the display of the y-axis title
            text: 'Temperature (°C)', // Sets the text for the y-axis title
          },
        },
      },
    },
  };  

  const image = await chartJSNodeCanvas.renderToBufferSync(configuration, 'image/svg+xml');
  return image;
};


