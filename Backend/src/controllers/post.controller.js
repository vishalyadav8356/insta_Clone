const postModel = require("../models/post.model");
// For image upload to imagekit required
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  //privatekey is required for uploading image to imagekit
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


//create post controller
async function createPostController(req, res) {
    //check if token is provided in cookies
  const token = req.cookies.token;

  //if token is not provided return unauthorized access
  if (!token) {
    return res.status(401).send({
      message: "token is not provided unauthorized access",
    });
  }

  //if token is provided verify the token and get the user id from the token
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send({
      message: "invalid token unauthorized access",
    });
  }

  //upload image to imagekit and get the url of the uploaded image
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "insta-clone-posts",
  });

  //create post in database with caption, image url and user id from token
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    userId: decoded.id,
  });

  //return success response with post data
  res.status(201).send({
    message: "post created successfully",
    post,
  });
}

//get post controller
async function getPostController(req, res) {
    //check if token is provided in cookies
  const token = req.cookies.token;

  //if token is not provided return unauthorized access
  if (!token) {
    return res.status(401).send({
      message: "token is not provided unauthorized access",
    });
  }


  //if token is provided verify the token and get the user id from the token
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send({
      message: "invalid token unauthorized access",
    });
  }

  //get all posts of the user from database using user id from token
  const userId = decoded.id;

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
async function getPostDetails(req, res){
  //check if token is provided in cookies
    const token = req.cookies.token;

    //if token is not provided return unauthorized access
    if(!token){
        return res.status(401).send({
            message:"token is not provided unauthorized access"
        })
    }

    //if token is provided verify the token and get the user id from the token
    let decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).send({
            message:"invalid token unauthorized access"
        })
    }

    //get post id from request params and user id from token and find the post in database using post id and check if the user id of the post is same as the user id from token if not return unauthorized access else return the post details in response
    const userId = decoded.id;
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
  getPostDetails
};
