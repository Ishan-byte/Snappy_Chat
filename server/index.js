//Necessary imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//Creating an express application
const app = express();

//Middlware functions
// For every client request to the server the cors function is executed
app.use(cors());

// This function parses the incoming request with JSON payloads
app.use(express.json());

// Connecting to the local database Snappy
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Sucessfull.");
  })
  .catch((err) => {
    console.log(err.messsage);
  });

// Creating an server for listening client requests
const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER started at port ${process.env.PORT}`);
});
