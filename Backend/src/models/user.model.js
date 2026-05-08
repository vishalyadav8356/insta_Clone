const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema({
  //username is required for creating a user and it must be unique because username is used for login and it is also used for displaying the username in the frontend
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username must be unique"],
  },

  //email is required for creating a user and it must be unique because email is used for login and it is also used for displaying the email in the frontend
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
  },

  //password is required for creating a user because without password user cannot be created and it is also used for login
  password: {
    type: String,
    required: [true, "password is required"],
    select: false, //select false is used to hide the password field when we fetch the user data from database because we don't want to expose the password field in the response
  },

  //bio is not required for creating a user but it is optional and default value is empty string
  bio: {
    type: String,
    default: "",
  },

  //profileImage is not required for creating a user but it is optional and default value is a default profile image url
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/m1knczwsx/insta-clone-posts/user.png?updatedAt=1776023078251",
  },

  profileImageFileId: {
    type: String,
    default: "",
  }

});

//user model
const userModel = mongoose.model("users", userSchema);

//export the user model
module.exports = userModel;
