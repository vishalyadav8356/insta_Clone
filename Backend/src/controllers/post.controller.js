const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const savedPostModel = require("../models/savedPost.model");
const userModel = require("../models/user.model");

// For image upload to imagekit required
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  //privatekey is required for uploading image to imagekit
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

//create post controller
async function createPostController(req, res) {
  const userId = req.user.id;

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
    userId,
  });

  //return success response with post data
  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

//get post controller
async function getPostController(req, res) {
  const userId = req.user.id;

  //find posts of the user from database using user id from token and return the posts in response
  const posts = await postModel.find({
    userId: userId,
  });

  //return success response with posts data
  res.status(200).json({
    message: "posts fetched successfully",
    posts,
  });
}

//  get post details controller
async function getPostDetailsController(req, res) {
  //get user id from token and post id from request params
  const userId = req.user.id;
  const postId = req.params.postId;

  //find post in database using post id and check if the user id of the post is same as the user id from token if not return unauthorized access else return the post details in response
  const post = await postModel.findById(postId);

  //if post is not found return not found error
  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  //check if the user id of the post is same as the user id from token if not return unauthorized access else return the post details in response
  const isValidUser = post.userId.toString() === userId;

  //if user id of the post is not same as the user id from token return unauthorized access
  if (!isValidUser) {
    return res.status(403).json({
      message: "you are not authorized to view this post",
    });
  }

  //return success response with post details
  res.status(200).json({
    message: "post details fetched successfully",
    post,
  });
}

//like post controller
async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "post liked successfully",
    like,
  });
}

//unlike post controller
async function unlikePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isLiked = await likeModel.findOne({
    user: username,
    post: postId,
  });

  if (!isLiked) {
    return res.status(400).json({
      message: "post is not liked by the user",
    });
  }

  await likeModel.findOneAndDelete({ _id: isLiked._id });

  return res.status(200).json({
    message: "post unliked successfully",
  });
}

//get feed controller
async function getFeedController(req, res) {
  const userId = req.user._id;

  const posts = await postModel.find().populate("userId").lean();

  const likePosts = await likeModel.find({
    user: req.user.username,
  });

  const savedPosts = await savedPostModel.find({
    user: req.user.username,
  });

  const likePostIds = likePosts.map((like) => like.post.toString());
  const savedPostIds = savedPosts.map((savedPost) => savedPost.post.toString());

  const feed = posts.map((post) => ({
    ...post,
    isLiked: likePostIds.includes(post._id.toString()),
    isSaved: savedPostIds.includes(post._id.toString()),
  }));

  res.status(200).json({
    message: "feed fetched successfully",
    feed,
  });
}

//save post controller
async function savePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostExist = await postModel.findById(postId);

  if (!isPostExist) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const isAlreadySaved = await savedPostModel.findOne({
    user: username,
    post: postId,
  });

  if (isAlreadySaved) {
    return res.status(400).json({
      message: "post is already saved",
    });
  }

  const savedPost = await savedPostModel.create({
    user: username,
    post: postId,
  });

  res.status(201).json({
    message: "post saved successfully",
    savedPost,
  });
}

//unsave post controller
async function unSavePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostExist = await postModel.findById(postId);

  if (!isPostExist) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const isAlreadySaved = await savedPostModel.findOne({
    user: username,
    post: postId,
  });

  if (!isAlreadySaved) {
    return res.status(400).json({
      message: "post is not saved by the user",
    });
  }

  await savedPostModel.deleteOne({
    user: username,
    post: postId,
  });

  res.status(200).json({
    message: "post unsaved successfully",
  });
}

//delete post controller
async function deletePostController(req, res) {
  const userId = req.user._id;
  const postId = req.params.postId;

  const deletedPost = await postModel.findOneAndDelete({
    _id: postId,
    userId: userId,
  });

  if (!deletedPost) {
    return res.status(404).json({
      message: "post not found or you are not authorized to delete this post",
    });
  }

  res.status(200).json({
    message: "post deleted successfully",
    deletedPost,
  });
}

//save post controller
async function getSavedPostsController(req, res) {
  const username = req.user.username;

  const savedPosts = await savedPostModel
    .find({
      user: username,
    })
    .populate("post");

  const posts = savedPosts
    .filter((item) => item.post)
    .map((item) => ({
      ...item.post.toObject(),
      isSaved: true,
    }));

  res.status(200).json({
    message: "saved posts fetched successfully",
    posts,
  });
}

//edit profile controller and bio update controller
async function editProfileController(req, res) {
  const userId = req.user.id;

  // find user
  const user = await userModel.findById(userId);

  // if user not found return error
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  // bio update
  if (req.body.bio !== undefined) {
    user.bio = req.body.bio;
  }

  // profile image update
  if (req.file) {
    // delete old image from imagekit
    if (user.profileImageFileId) {
      await imageKit.files.delete(user.profileImageFileId);
    }

    // upload new image
    const file = await imageKit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),

      fileName: `${Date.now()}-profile.jpg`,

      folder: "/insta-clone-profile",
    });

    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      {
        profileImage: file.url,
        profileImageFileId: file.fileId,
        bio: user.bio,
      },
      {
         returnDocument: "after"
      },
    );

    res.status(200).json({
      message: "profile updated successfully",
      user: updateUser,
    });
  }
}

//export the controllers
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
  getFeedController,
  savePostController,
  unSavePostController,
  deletePostController,
  getSavedPostsController,
  editProfileController,
};
