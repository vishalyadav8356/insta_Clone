const mongoose = require("mongoose")
const { create } = require("./user.model")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true, "image url is required for creating a post"]
    },
    userId:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "userId is required for creating a post"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel