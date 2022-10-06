// import User from "./userscontroller.js";
// import express from "express";
const User = require("./userscontroller");
const express = require("express");

// creating a router only for user
const router = express.Router();

// registering a route in the router
router.post("/register", User.register);
router.post("/login", User.login);
router.post("/setavatar/:id", User.setAvatar);
router.get("/getrandomavatars", User.getRandomAvatars);
router.get("/getallusers/:id", User.getAllUsers);

module.exports = router;
