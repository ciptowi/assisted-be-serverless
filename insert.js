require('dotenv').config()
const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("answer.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });

    // switch query for to use
    const insertQuestion = "INSERT INTO question (id, category_id, content, status) VALUES ($1, $2, $3, $4)";
    const insertAnswer = "INSERT INTO answer (id, question_id, content, score, status) VALUES ($1, $2, $3, $4, $5)";

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(insertAnswer, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
    // console.log(csvData);
  });

stream.pipe(csvStream);