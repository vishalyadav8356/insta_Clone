const postModel = require("../models/post.model");
// For image upload to imagekit required
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  //privatekey is required for uploading image to imagekit
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


//create post controller
async function createPostController(req, res) {

  //upload image to imagekit and get the url of the uploaded image
  const file = await imageKit.files.upload({
    //convert the buffer to file and upload to imagekit
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    //file name is required for uploading image to imagekit
    fileName: "Test",
    //folder name is optional for uploading image to imagekit if not provided the image will be uploaded to the root folder of imagekit account
    folder: "insta-clone-posts",
  });

  //create post in database with caption, image url and user id from token
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    userId: req.userId,
  });

  //return success response with post data
  res.status(201).send({
    message: "post created successfully",
    post,
  });
}

//get post controller
async function getPostController(req, res) {
  
  const userId = req.userId

  //find posts of the user from database using user id from token and return the posts in response
  const posts = await postModel.find({
    userId: userId,
  });

  //return success response with posts data
  res.status(200).send({
    message: "posts fetched successfully",
    posts,
  });
}

//  get post details controller
async function getPostDetailsController(req, res){
  //get user id from token and post id from request params
  const userId = req.userId
  const postId = req.params.postId;

    //find post in database using post id and check if the user id of the post is same as the user id from token if not return unauthorized access else return the post details in response
    const post = await postModel.findById(postId);

    //if post is not found return not found error
    if(!post){
      return res.status(404).send({
        message:"post not found"
      })
    }

    //check if the user id of the post is same as the user id from token if not return unauthorized access else return the post details in response
    const isValidUser = post.userId.toString() === userId;

    //if user id of the post is not same as the user id from token return unauthorized access
    if(!isValidUser){
      return res.status(403).send({
        message:"you are not authorized to view this post"
      })
    }

    //return success response with post details
    res.status(200).send({
      message:"post details fetched successfully",
      post
    })


}


//export the controllers
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController
};
