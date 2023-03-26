const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Data Ninja');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Data Ninja Server started on port ${port}`);
});