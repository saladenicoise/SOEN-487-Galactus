# Forecast Service ReadMe

**To run the service on port 3002**, navigate to the visual-voyager directory and laod npm modules ```npm install``` then ```run npm run live-reload```. To test the endpoints, navigate to ```localhost:3002/weeklyVisual``` and ```localhost:3002/historicalVisual```

To test endpoints append ```/weeklyVisual``` or ```/historicalVisual``` to the URL. They currently read from local JSON files, handled in the server.js file, within each endpoint. Below that line, in each respective endpoint, is a commented line containing code that should be used to interact with the data-service request instead of local JSON files.
There are different JSON files containing historical data, named ``historicalDataX.json``, where X corresponds to the amount of historical-day objects present in the test JSON file.

## In order to print an actual chart, you would need to either:

Not convert to base64 in the handleTemperatureCharts() functions (either weekly or historical). Then in the appropriate endpoint try block, you would need to modify the response to not send the whole charts object, but one of the embedded objects.

Instead of removing the base64 stuff in the handler function, you would access one of the charts by key, then convert the base64 string into an SVG or PNG.
