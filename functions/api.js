const express = require('express');
const serverless = require('serverless-http');
const app = express()
const router = require('../src/routes');
const cors = require("cors");

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
app.use(router);

module.exports = app
module.exports.handler = serverless(app)
