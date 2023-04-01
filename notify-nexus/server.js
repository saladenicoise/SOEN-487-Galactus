const express = require('express');
const app = express();
const startScheduler = require('./scheduler/control/start-scheduler')

// In production change to no arguments 
startScheduler();

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get('/', (req, res) => {
  res.send('Notify Nexus');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Notify Nexus Server started on port ${port}`);
});