const userModel = require("../models/user.model");
const followModel = require("../models/follow.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model")


//register controller
async function registerController(req, res) {
  //get the data from request body
  const { username, email, password, bio, profileImage } = req.body;

  //check if user with the same username or email already exists in database
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  //if user with the same username or email already exists return conflict error
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        "User with the same username or email already exists" +
        (isUserAlreadyExist.email === email
          ? " Email is already exists."
          : "Username is already exists."),
    });
  }

  //hash the password before saving to database
  const hash = await bcrypt.hash(password, 10);

  //create user in database with username, email, bio, profile image and hashed password
  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  //  generate a token for the user and set the token in cookies
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    // set the expiration time for the token to 20 days
    { expiresIn: "20d" },
  );

  //set the token in cookies
  res.cookie("token", token);

  //return success response with user data except password
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}


//create post controller
async function loginController(req, res) {
  //get the data from request body
  const { username, email, password } = req.body;

  //check if user with the given username or email exists in database
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  }).select("+password"); //select password field explicitly because we have set select false in user model for password field to hide the password field in response when we fetch the user data from database but we need the password field here to compare the password with the hashed password in database


  //if user with the given username or email does not exist return not found error
  if (!user) {
    return res.status(404).json({
      message: "User with the given username or email not found",
    });
  }

  //compare the password with the hashed password in database
  const isPasswordValid = await bcrypt.compare(password, user.password);


  //if password is not valid return unauthorized error
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  //generate a token for the user and set the token in cookies
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    // set the expiration time for the token to 20 days
    { expiresIn: "20d" },
  );

  //set the token in cookies
  res.cookie("token", token);

  //return success response with user data except password
  res.status(200).json({   
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

//get me controller
async function getMeController(req, res){
  const userId = req.user.id
  
  const user = await userModel.findById(userId)

  const followersCount = await followModel.countDocuments({
    following: user.username,
    status: "accepted"
  })

  const followingCount = await followModel.countDocuments({
    follower: user.username,
    status: "accepted"
  })

  const postsCount = await postModel.countDocuments({
    userId: user._id
  })

  res.status(200).json({
    user:{
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
      followersCount,
      followingCount,
      postsCount
    }
  })
}

//export the controllers
module.exports = {
  registerController,
  loginController,
  getMeController
};
