const mongoose = require("mongoose")

const savedPostSchema = new mongoose.Schema({
    user:{
        type:String,
        required:[true,"user id is required to save a post"]
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true,"post id is required to save a post"]
    }
}, {
    timestamps:true
})

savedPostSchema.index({user:1, post:1}, {unique:true})

const savedPostModel = mongoose.model("savedPosts", savedPostSchema)

module.exports = savedPostModel