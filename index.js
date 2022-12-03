require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./src/routes');
const app = express();

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Export the Express API
module.exports = app;