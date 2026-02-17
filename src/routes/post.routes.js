const express = require("express")
const postRouter = express.Router()
const postController = require("../controller/post.controller")
const multer = require("multer")
const uplaod = multer({storage : multer.memoryStorage()})



postRouter.post("/", uplaod.single("image") , postController.createPostController)

module.exports = postRouter