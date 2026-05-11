const express = require("express");
const identifyUser = require("../middlewares/auth.middleware")
//auth controller file import
const authController = require("../controllers/auth.controller");

// create auth router
const authRouter = express.Router();

// @route POST /api/auth/register
// @desc register a user
// @access public
authRouter.post("/register", authController.registerController);

// @route POST /api/auth/login
// @desc login a user
// @access public
authRouter.post("/login", authController.loginController)

// @route POST /api/auth/logout
// @desc logout a user
// @access public
authRouter.post("/logout", authController.logoutController)

//@route GET /api/auth/get-me
//@desc get current user
//@access public
authRouter.get("/get-me", identifyUser, authController.getMeController)

module.exports = authRouter;
