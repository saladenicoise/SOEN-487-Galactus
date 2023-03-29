const express = require("express");
const app = express();
const produce = require("./producer");
const rawdata = require("./sample.json");
const APIKey = 'c9c5839bd781b1c418c23e5d0df9b0fe';
// Middleware
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
 // res.send("Data Demon");
  let city = req.query.city;
   fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      produce("w/e", JSON.stringify(data), (durable = false));
    res.send(`The weather in ${city} is ${data.main.temp} degrees Celsius`);
    });
});

const sampleData = JSON.stringify(rawdata);
// produce("w/e", sampleData, (durable = false));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Data Demon Server started on port ${port}`);
});
