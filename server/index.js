//Necessary imports
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import userRouter from "./modules/user/userroutes.js";
// import {} from "dotenv/config";

const express = require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const userRouter = require("./modules/user/userroutes")
require("dotenv").config()



// APP

//Creating an express application
const app = express();



// MIDDLEWARE

// For every client request to the server the cors function is executed
app.use(cors());

// This function parses the incoming request with JSON payloads
app.use(express.json());

// telling the router to handle routes starting with following route via userRouter
app.use("/api/auth", userRouter);





// DATABASE
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successfull.");
  })
  .catch((err) => {
    console.log(err.messsage);
  });




// SERVER

// Creating an server for listening client requests
const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER started at port ${process.env.PORT}`);
});
