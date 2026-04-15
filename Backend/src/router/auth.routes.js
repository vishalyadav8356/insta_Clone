const express = require("express");
//auth controller file import
const authController = require("../controllers/auth.controller");

// create auth router
const authRouter = express.Router();

// POST api/auth/register
authRouter.post("/register", authController.registerController);

// POST api/auth/login
authRouter.post("/login", authController.loginController)


module.exports = authRouter;
