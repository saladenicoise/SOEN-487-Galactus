#Forecast Service ReadMe

To run the service on port 3002, navigate to the visual-voyager directory and run npm run live-reload or npm start. To test the endpoints, navigate to localhost:3002/weeklyVisual and localhost:3002/historicalVisual.

To visually check out different mock data, go to the /historicalVisuals endpoint and change the JSON file it reads from. To run with the logger, uncomment codes from the handleHistoricalTemperatureCharts() function in the chart_util.js file.

##In order to print an actual chart, you would need to either:

Not convert to base64 in the handleTemperatureCharts() functions (either weekly or historical). Then in the appropriate endpoint try block, you would need to modify the response to not send the whole charts object, but one of the embedded objects.

Instead of removing the base64 stuff in the handler function, you would access one of the charts by key, then convert the base64 string into an SVG or PNG.
