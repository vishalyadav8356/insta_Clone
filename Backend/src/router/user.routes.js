const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")


// @route GET /api/users/follow/requests
// @desc get all pending follow requests for logged in user
// @access private
userRouter.get("/follow/requests", identifyUser, userController.getFollowRequestsController)

// @route POST /api/users/follow/:username
// @desc send follow request to :username
// @access private
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

// @route POST /api/users/follow/:username/accept
// @desc accept follow request from :username
// @access private
userRouter.post("/follow/:username/accept", identifyUser, userController.acceptFollowRequestController)

// @route POST /api/users/follow/:username/reject
// @desc reject follow request from :username
// @access private
userRouter.post("/follow/:username/reject", identifyUser, userController.rejectFollowRequestController)

// @route POST /api/users/unfollow/:username
// @desc unfollow a user
// @access private  
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

// @route GET /api/users/search
// @desc search users by username
// @access private
// userRouter.get("/search", identifyUser, userController.searchUsersController)


module.exports = userRouter