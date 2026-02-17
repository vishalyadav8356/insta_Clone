const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    capation:{
        type:String,
        default: ""
    },
    imgUrl:{
        type:String,
        required:[true, "imgUrl is required for creating an post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true, "user id is required for craeting an post"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel