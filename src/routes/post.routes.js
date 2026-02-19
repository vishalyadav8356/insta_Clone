const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer")
const uplaod = multer({storage : multer.memoryStorage()})

// post api
postRouter.post("/", uplaod.single("image") , postController.createPostController)

// get post api
postRouter.get("/", postController.getPostController)

//get detail post
postRouter.get("/details/:postId", postController.getPostDetailsController)


module.exports = postRouter