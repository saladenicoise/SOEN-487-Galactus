// Modify createTemperatureChart function to handle Fahrenheit and return base64-encoded string
const createTemperatureChart = async (weatherData, unit = 'F') => {

    const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
  
    const isForecastDay = weatherData[0].type === 'forecast-day';
  
    const width = 68 * weatherData.length;
    const height = 600;
    
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
            label: `Max (°${unit}) `, // Label for the first dataset (max temperatures)
            data: maxTemps, // Data points for the first dataset (max temperatures)
            borderColor: 'rgba(255, 99, 132, 1)', // Color of the line for the first dataset
            tension: 0.1, // Controls the line smoothness for the first dataset (0 for straight lines, 1 for maximum smoothness)
          },
          {
            label: `Min (°${unit})` , // Label for the second dataset (min temperatures)
            data: minTemps, // Data points for the second dataset (min temperatures)
            borderColor: 'rgba(75, 192, 192, 1)', // Color of the line for the second dataset
            tension: 0.1, // Controls the line smoothness for the second dataset
          },
        ],
      }, 
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'white', // Changes the color of the legend labels to white
            },
          },
        },
        scales: {
          x: {
            color: 'white', // Changes the color of the x-axis labels and grid lines to white
            title: {
              display: true,
              text: 'Date',
              color: 'white', // Changes the color of the x-axis title to white
            },
          },
          y: {
            color: 'white', // Changes the color of the y-axis labels and grid lines to white
            title: {
              display: true,
              text: `°${unit}`,
              color: 'white', // Changes the color of the y-axis title to white
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
  const handleWeeklyTemperatureCharts = async (weatherData) => {
    try {
      // Generate the charts for Celsius and Fahrenheit
      const celsiusChartBuffer = await createTemperatureChart(weatherData, 'C');
      const fahrenheitChartBuffer = await createTemperatureChart(weatherData, 'F');

      // Convert the image buffers to base64-encoded strings
      const celsiusChart = celsiusChartBuffer.toString('base64');
      const fahrenheitChart = fahrenheitChartBuffer.toString('base64');
  
      // Send response as a JSON object 
      return{ 
      'celsiusChart':celsiusChart, 
      'fahrenheitChart':fahrenheitChart };

    } catch (error) {
      console.error('Error generating chart:', error);// Log the error to the console
    }
  };

  const handleHistoricalTemperatureCharts = async (weatherData) => {
    try {

      //Weekly and monthly weather aggregators, which return a JSON object containing the data aggregated per week and per month
      const weeklyWeather = aggregateByWeeks(weatherData);
      const monthlyWeather = aggregateByMonths(weatherData);

      //Checks if there is less than a month of data, and adjusts to a daily scale
      if(weeklyWeather.length <= 3){
        //console.log('Generating daily');

        // Generate the daily charts for Celsius and Fahrenheit
        const dailyCelsiusChartBuffer = await createTemperatureChart(weatherData, 'C');
        const dailyFahrenheitChartBuffer = await createTemperatureChart(weatherData, 'F');
        
        //Returns a JSON object containing the daily celsius and fahrenheit charts 
        return {
          'celsiusChart': dailyCelsiusChartBuffer.toString('base64'),
          'fahrenheitChart':dailyFahrenheitChartBuffer.toString('base64')
        };
      }
      //Checks if there is between a month and 6 months(exclusively) of data, and adjusts to a weekly scale
      else if(monthlyWeather.length >= 1 && monthlyWeather.length< 6) {
        //console.log('Generating weekly');

        // Generate the weekly charts for Celsius and Fahrenheit
        const weeklyCelsiusChartBuffer = await createTemperatureChart(weeklyWeather, 'C');
        const weeklyFahrenheitChartBuffer = await createTemperatureChart(weeklyWeather, 'F');
        
        //Returns a JSON object containing the weekly celsius and fahrenheit charts 
        return {
            'celsiusChart': weeklyCelsiusChartBuffer.toString('base64'),
            'fahrenheitChart':weeklyFahrenheitChartBuffer.toString('base64')
          };
      } 
      //Else, this means that the data is 6 months or more, and adjusts to a monthly scale
      else{

        //console.log('Generating monthly');
      // Generate the monthly charts for Celsius and Fahrenheit
      const monthlyCelsiusChartBuffer = await createTemperatureChart(monthlyWeather, 'C');
      const monthlyFahrenheitChartBuffer = await createTemperatureChart(monthlyWeather, 'F');

      //Returns a JSON object containing the monthly celsius and fahrenheit charts 
      return {
        'celsiusChart':monthlyCelsiusChartBuffer.toString('base64'),
        'fahrenheitChart':monthlyFahrenheitChartBuffer.toString('base64')
      };
      }

    } catch (error) {
      console.error('Error generating chart:', error);// Log the error to the console
    }
  };

// This function takes the daily weather data and aggregates it into weekly data.
const aggregateByWeeks = (weatherData) => {
  const weeklyData = [];

  // Calculate the number of weeks in the given data
  const weeks = Math.ceil(weatherData.length / 7);

  // Loop through each week
  for (let i = 0; i < weeks; i++) {
    const start = i * 7;
    const end = Math.min(start + 7, weatherData.length);
    const weekSlice = weatherData.slice(start, end);

    // Calculate the average maximum and minimum temperatures for the week
    const avgMaxTemp = weekSlice.reduce((acc, day) => acc + day.max_temp_c, 0) / weekSlice.length;
    const avgMinTemp = weekSlice.reduce((acc, day) => acc + day.min_temp_c, 0) / weekSlice.length;

    // Add the aggregated data for the week to the weeklyData array
    weeklyData.push({
      date: weekSlice[0].date,
      max_temp_c: avgMaxTemp,
      max_temp_f: avgMaxTemp * 9 / 5 + 32,
      min_temp_c: avgMinTemp,
      min_temp_f: avgMinTemp * 9 / 5 + 32,
    });
  }
  return weeklyData;
};

// This function takes the daily weather data and aggregates it into monthly data.
const aggregateByMonths = (weatherData) => {
  const monthlyData = [];

  // Get a unique set of months from the weather data
  const months = new Set(weatherData.map(day => day.date.slice(0, 7)));

  // Loop through each month
  for (const month of months) {
    // Filter the data to only include the current month
    const monthData = weatherData.filter(day => day.date.startsWith(month));

    // Calculate the average maximum and minimum temperatures for the month
    const avgMaxTemp = monthData.reduce((acc, day) => acc + day.max_temp_c, 0) / monthData.length;
    const avgMinTemp = monthData.reduce((acc, day) => acc + day.min_temp_c, 0) / monthData.length;

    // Add the aggregated data for the month to the monthlyData array
    monthlyData.push({
      date: month + '-01',
      max_temp_c: avgMaxTemp,
      max_temp_f: avgMaxTemp * 9 / 5 + 32,
      min_temp_c: avgMinTemp,
      min_temp_f: avgMinTemp * 9 / 5 + 32,
    });
  }
  return monthlyData;
};
  
  // Export the createTemperatureChart and handleTemperatureCharts functions 
  module.exports = { handleWeeklyTemperatureCharts, handleHistoricalTemperatureCharts};