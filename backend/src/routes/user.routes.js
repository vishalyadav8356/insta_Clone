const express = require("express")
const userController = require("../controller/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()


userRouter.post("/follow/:username", identifyUser, userController.followUserContoller)

userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserContoller)

userRouter.put("/status/accept/:username", identifyUser, userController.acceptFollowRequest)

userRouter.put("/status/reject/:username", identifyUser, userController.rejectFollowRequest)

module.exports = userRouter