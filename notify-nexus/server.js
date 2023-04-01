const express = require('express');
var cors = require('cors');
const app = express();
const startScheduler = require('./scheduler/control/start-scheduler')

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors({origin: 'http://localhost:5173'}))

// Routes
app.get('/', (req, res) => {
  res.send('Notify Nexus');
});

app.post('/post/deviceId', (req, res) => {
  let deviceId = req.body.deviceId;
  console.log(`The device id ${deviceId} successfully subscribed to an alert`);
  res.status(200).send('OK');
})

app.post('/post/notification-preferences', (req, res) => {
  let deviceId = req.body.deviceId;
  let schedule = req.body.schedule;
  console.log(`The device id ${deviceId} successfully subscribed to weather notification every ${schedule}`);
  res.status(200).send('OK');

})

// TO-DO In production change to no arguments 
startScheduler();

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Notify Nexus Server started on port ${port}`);
});

