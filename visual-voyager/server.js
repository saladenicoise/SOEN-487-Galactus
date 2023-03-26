const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Visual Voyager');
});

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Visual Voyager Server started on port ${port}`);
});