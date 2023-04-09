const fs = require('fs');
const path = require('path');

console.log('Current directory:', process.cwd());

const writeReducedWeatherData = (originalData, daysCount, outputFileName) => {
  const outputPath = path.join(__dirname, outputFileName);
  const reducedData = {
    ...originalData,
    weatherData: originalData.weatherData.slice(0, daysCount),
  };

  fs.writeFileSync(outputPath, JSON.stringify(reducedData, null, 2));
};

// Read the original JSON file
const originalData = JSON.parse(fs.readFileSync('/SOEN-487-Galactus/visual-voyager/historicalData.json', 'utf-8'));

// Call the writeReducedWeatherData function with the original data, desired number of days, and output file name
writeReducedWeatherData(originalData, 7, 'reducedData7.json');
writeReducedWeatherData(originalData, 21, 'reducedData21.json');
writeReducedWeatherData(originalData, 31, 'reducedData1mth.json');
writeReducedWeatherData(originalData, 140, 'reducedData5mths.json');
writeReducedWeatherData(originalData, 183, 'reducedData6mths.json');




// The reducedData.json file will be created in the current directory with 10 historical days