const e = require("express")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username must be unique"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/m1knczwsx/insta-clone-posts/user.png?updatedAt=1776023078251"
    }
})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel