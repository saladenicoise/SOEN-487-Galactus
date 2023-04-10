const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Cipher Chief');
});

// Start the server
const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Cipher Chief Server started on port ${port}`);
});