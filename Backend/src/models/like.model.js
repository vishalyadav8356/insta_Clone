const mongoose = require("mongoose");

//like schema
const likeSchema = new mongoose.Schema({
    //post id required for creating a like because without post id like cannot be created and it is reference to posts collection
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts",
        required:[true, "post id is required to like a post"]
    },
    //user id required for creating a like because without user id like cannot be created and it is reference to users collection
    user:{
        type:String,
        required:[true, "user id is required to like a post"]
    }
},{
    timestamps:true
})

//to avoid duplicate like from same user on same post we will create a unique index on post and user fields
likeSchema.index({post:1, user:1}, {unique:true})

//like model
const likeModel = mongoose.model("likes", likeSchema)

//export the like model
module.exports = likeModel