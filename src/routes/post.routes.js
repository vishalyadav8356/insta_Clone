const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer")
const uplaod = multer({storage : multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

// post api
postRouter.post("/", uplaod.single("image") , identifyUser, postController.createPostController)

// get post api
postRouter.get("/", identifyUser, postController.getPostController)

//get detail post
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)


module.exports = postRouter