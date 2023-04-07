const { ChartJSNodeCanvas } = require('chartjs-node-canvas');


//we should maybe place this in a different js file
// Modify createTemperatureChart function to handle Fahrenheit and return base64-encoded string
const createTemperatureChart = async (weatherData, unit = 'F') => {
  
    const isForecastDay = weatherData[0].type === 'forecast-day';
  
    const width = (isForecastDay ? 800 : 10000);
    const height = (isForecastDay ? 600 : 600);
    
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ type: 'svg', width, height });
  
    const dates = weatherData.map(day => day.date);
    // const maxTemps = weatherData.map(day => isForecastDay ? day.daily_information.max_temp_c : day.max_temp_c);
    // const minTemps = weatherData.map(day => isForecastDay ? day.daily_information.min_temp_c : day.min_temp_c);
   
    // Convert temperature data to the requested unit (Celsius or Fahrenheit)
    const maxTemps = weatherData.map(day => unit === 'C' ? (isForecastDay ? day.daily_information.max_temp_c : day.max_temp_c) : (isForecastDay ? day.daily_information.max_temp_f : day.max_temp_f));
    const minTemps = weatherData.map(day => unit === 'C' ? (isForecastDay ? day.daily_information.min_temp_c : day.min_temp_c) : (isForecastDay ? day.daily_information.min_temp_f : day.min_temp_f));
  

    // This configuration defines a line chart with two datasets, one for maximum temperatures 
    //and one for minimum temperatures, with smooth lines and different colors for each dataset. 
    //The x-axis represents dates, and the y-axis represents temperatures in degrees Celsius. 
    //Both axes have titles displayed
    const configuration = {
      type: 'line', // Specifies the type of chart - in this case, a line chart
      data: {
        labels: dates, // Sets the labels for the x-axis, which are the dates
        datasets: [
          {
            label: `Max Temperature (°${unit}) `, // Label for the first dataset (max temperatures)
            data: maxTemps, // Data points for the first dataset (max temperatures)
            borderColor: 'rgba(255, 99, 132, 1)', // Color of the line for the first dataset
            tension: 0.1, // Controls the line smoothness for the first dataset (0 for straight lines, 1 for maximum smoothness)
          },
          {
            label: `Min Temperature (°${unit})` , // Label for the second dataset (min temperatures)
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
              text: `Temperature (°${unit})` , // Sets the text for the y-axis title
            },
          },
        },
      },
    };  
  
    const image = await chartJSNodeCanvas.renderToBufferSync(configuration, 'image/svg+xml');
    return image;
  };
  
  //also should be in another js file with createTemperatureChart just to make this file more readable
  // Create a new function to handle both Celsius and Fahrenheit charts
  const handleTemperatureCharts = async (req, res, weatherData) => {
    try {
      // Generate the charts for Celsius and Fahrenheit
      const celsiusChartBuffer = await createTemperatureChart(weatherData, 'C');
      const fahrenheitChartBuffer = await createTemperatureChart(weatherData, 'F');

      // Convert the image buffers to base64-encoded strings
      const celsiusChart = celsiusChartBuffer.toString('base64');
      const fahrenheitChart = fahrenheitChartBuffer.toString('base64');
  
      // Set the response content type to JSON 
      res.setHeader('Content-Type', 'application/json');
      //and send both charts as a JSON object
      res.send({ celsiusChart, fahrenheitChart }); // actually Express automatically converts the object to a JSON string and sends it as the response body
    } catch (error) {
      console.error('Error generating chart:', error);// Log the error to the console
      res.status(500).json({ error: 'Error generating chart' });// Send a 500 status code with an error message in the response
    }
  };
  
  // Export the createTemperatureChart and handleTemperatureCharts functions 
  module.exports = { createTemperatureChart, handleTemperatureCharts };