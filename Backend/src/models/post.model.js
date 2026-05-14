const mongoose = require("mongoose")

//post schema
const postSchema = new mongoose.Schema({
    //caption is not required for creating a post but it is optional and default value is empty string
    caption:{
        type:String,
        default:""
    },

    //imgUrl is required for creating a post because without image url post cannot be created
    imgUrl:{
        type:String,
        required:[true, "image url is required for creating a post"]
    },

    // store ImageKit file id to allow deleting the image when post is removed
    imgFileId: {
        type: String,
    },

    //userId is required for creating a post because without user id post cannot be created and it is reference to users collection
    userId:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "userId is required for creating a post"]
    },

    //createdAt is required for creating a post because without createdAt post cannot be created and it is default value is current date and time
    createdAt:{
        type:Date,
        default:Date.now
    }

})

//post model
const postModel = mongoose.model("posts", postSchema)

//export the post model
module.exports = postModel