const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken"); 
const bcryptjs = require("bcryptjs")

 async function registerController (req, res)  {
  const { username, password, email, bio, profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    res.status(409).json({
      message:
        "User already exists" +
        (isUserAlreadyExists.email == email
          ? "Email already exists"
          : "Username already exists"),
    });
  }

  const hash = await bcryptjs.hash(password, 10)

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username : user.username
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user register successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController (req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    return res.status(409).json({
      message: "user not found",
    });
  }


  const isPaswordValid = bcryptjs.compare(password, user.password)

  if (!isPaswordValid) {
    return res.status(401).json({
      message: "password invalids",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username : user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user loggedIn successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
    registerController,
    loginController
}