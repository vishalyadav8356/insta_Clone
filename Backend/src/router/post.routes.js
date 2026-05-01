const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const identifyUser = require("../middlewares/auth.middleware")

//multer for file upload
const multer = require("multer")
// Store files in memory as Buffer objects
const upload = multer({storage: multer.memoryStorage()}) 

//@route POST /api/posts/   
//@desc create a post
//@access private
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

//@route GET /api/posts/   
//@desc get all posts of the user and his followings
//@access private
postRouter.get("/", identifyUser, postController.getPostController)

//@route GET /api/posts/:postId   
//@desc get details of a post
//@access private
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

// @route POST /api/posts/like/:postId
// @desc like a post
// @access private
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

// @route POST /api/posts/unlike/:postId
// @desc unlike a post
// @access private
postRouter.post("/unlike/:postId", identifyUser, postController.unlikePostController)

// @route GET /api/posts/feed
// @desc get feed of the user
// @access private
postRouter.get("/feed", identifyUser, postController.getFeedController)

// @route POST /api/posts/save/:postId
// @desc save a post
// @access private
postRouter.post("/save/:postId", identifyUser, postController.savePostController)

// @route POST /api/posts/unsave/:postId
// @desc unsave a post
// @access private
postRouter.post("/unsave/:postId", identifyUser, postController.unSavePostController)

// @route DELETE /api/posts/postDelete/:postId
// @desc delete a post
// @access private
postRouter.delete("/postDelete/:postId", identifyUser, postController.deletePostController)

//module exports the post router
module.exports = postRouter