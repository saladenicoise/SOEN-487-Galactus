const express = require('express');

const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const app = express();

// Middleware
app.use(express.json());


//weekly forecast endpoint
app.get('/weeklyVisual', async(req,res) => {

  try{
    //const weatherData = req.body.weatherData; 

    //The following line of code results in a javascript array, containing javascript objects containing the data for each of the following 7 days
    const weatherData = require('./weeklyData.json') // Loads the contents of the 'weeklyData.json' file that we will work with for testing
    ['weatherData'] // Accesses the 'weatherData' property of the loaded JSON object
    .filter(day => day.type === 'forecast-day'); // Filters the array to only include objects with a 'type' property equal to 'forecast-day'
    
    //console.log(weatherData); //<--This will print the contents to the terminal

    // Calls the 'createTemperatureChart' function with 'weatherData' as an argument, and waits for the Promise to resolve. The result is an image buffer representing the chart, which contains the raw data needed to construct the image, such as pixel information, color information, and image format.
    const chartBuffer = await createTemperatureChart(weatherData); 
    // Logs the resulting image buffer to the console for debugging purposes.
    console.log('Generated chart image buffer:', chartBuffer);
    
    res.contentType('image/png'); // Sets the response's content type to 'image/png', indicating that the response will be a PNG image.
    res.send(chartBuffer); // Sends the image buffer as the response body. The client will receive this as a PNG image.
    
    
    //  // Group forecast data by day
    //  //reduce() is used to iterate over each item in 
    //  const groupedData = weatherData.reduce((collect, data) => { //collect obj is used to collect the data into groups by day
    //   const date = new Date(data.date);// takes date string as param,and use Date() to convert string to date
    //   const day = date.toLocaleDateString();// will make it in date form ex 4/3/2023, not sure how this will look like in graph
    //   if (!collect[day]) { //if groupedData doesn't have a group for the current day.
    //     collect[day] = {//the code creates a new group with the day as the key and adds it
    //       dates: [], // we got this lil cute JSON format
    //       temperatures: [],
    //     };
    //   }
      // collect[day].dates.push(date);//we push dem babies to the array
      // collect[day].temperatures.push(data.temperature);
      // return collect;//finally we return array
      //it should look something like this in the JSON
    // }, {});

    // Create the chart using chartjs-node-canvas
  //   const width = 800;
  //   const height = 600;
  //   const chartCallback = (ChartJS) => {
  //     // Configure the Chart.js instance here. 
  //     // Useful when you need to register plugins,
  //     // controllers, or other extensions 
  //     // that should be available to all charts created 
  //     // with the same Chart.js instance
  //     ChartJS.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
  //   };
  //   const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
  //   const chartConfiguration = {
  //     type: 'line', // line chart
  //     data: {
  //       labels: weatherData.map(data => data.date),// An array of labels for the chart x-axis
  //       datasets: [{
  //         label: 'Temperature',// 
  //         data: weatherData.map(data => data.temperature),// An array of data points for the chart y-axis
  //         borderColor: 'rgb(255, 99, 132)', // we need to know th exact colours from the UI team so we can be in sync with the palette
  //         borderWidth: 15, //its gonna be a thicc line 
  //         fill: false,// fill up de baby
  //       }]
  //     },
  //     options: {
  //       responsive: false, // guess we can actually make it interactive, assigning this false until we can test
  //       title: {
  //         display: true,
  //         text: 'Temperature over time' //time here referes to 365 days
  //       },
  //       //specifying X aand Y axis of the diagram
  //       scales: {
  //         xAxes: [{
  //           type: 'time',
  //           time: {
  //             unit: 'month'
  //           }
  //         }],
  //         yAxes: [{
  //           scaleLabel: {
  //             display: true,
  //             labelString: 'Temperature (°C)'
  //           }
  //         }]
  //       }
  //     }
  //   };
  // // Finally response is sent back
  // res.status(200).json({ chartImage: base64Image });
 } catch (error) {
   console.error('Error generating chart:', error);
   res.status(500).json({ error: 'Error generating chart' });
}
});


// This following is the "generateVisual" end-point/procedure
app.post('/historicalVisual', async (req, res) => {
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
          borderColor: 'rgb(255, 99, 132)', // we need to know th exact colours from the UI team so we can be in sync with the palette
          borderWidth: 5, //its gonna be a thicc line 
          fill: false,
        }]
      },
      options: {
        responsive: false, // guess we can actually make it interactive, assigning this false until we can test
        title: {
          display: true,
          text: 'Temperature over time' //time here referes to 365 days
        },
        //specifying X aand Y axis of the diagram
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
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

const createTemperatureChart = async (weatherData) => {
  const width = 800;
  const height = 600;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const dates = weatherData.map(day => day.date);
  const maxTemps = weatherData.map(day => day.daily_information.max_temp_c);
  const minTemps = weatherData.map(day => day.daily_information.min_temp_c);

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

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  return image;
};


