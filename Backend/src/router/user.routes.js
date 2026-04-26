const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")


// @route POST /api/users/follow/:userId
// @desc follow a user
// @access private

userRouter.post("/follow/:username", identifyUser, userController.followUserController)

// @route DELETE /api/users/unfollow/:userId
// @desc unfollow a user
// @access private  

userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)


module.exports = userRouter