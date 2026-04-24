const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const identfyUser = require("../middlewares/auth.middleware")

//multer for file upload
const multer = require("multer")
// Store files in memory as Buffer objects
const upload = multer({storage: multer.memoryStorage()}) 

// POST api/posts/ 
postRouter.post("/", upload.single("image"), identfyUser, postController.createPostController)


//GET api/posts/
postRouter.get("/", identfyUser, postController.getPostController)

//GET api/posts/details/:postId

postRouter.get("/details/:postId", identfyUser, postController.getPostDetailsController)


//module exports the post router
module.exports = postRouter