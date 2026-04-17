const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")

//multer for file upload
const multer = require("multer")
// Store files in memory as Buffer objects
const upload = multer({storage: multer.memoryStorage()}) 

// POST api/posts/ 
postRouter.post("/", upload.single("image"), postController.createPostController)


//GET api/posts/
postRouter.get("/", postController.getPostController)

//GET api/posts/details/:postId

postRouter.get("/details/:postId", postController.getPostDetails)


//module exports the post router
module.exports = postRouter