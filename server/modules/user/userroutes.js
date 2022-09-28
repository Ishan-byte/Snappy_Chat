// import User from "./userscontroller.js";
// import express from "express";
const User = require("./userscontroller")
const express = require("express")


// creating a router only for user
const router = express.Router();

// registering a route in the router
router.post("/register", User.Register);

module.exports = router;
