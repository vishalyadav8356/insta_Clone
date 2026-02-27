const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        require:[true, "post id is require for creating a like"]
    },
    user:{
        type:String,
        require:[true, "username is require for creating a like"]
    }
}, {
    timestamps: true
})

likeSchema.index({post: 1, user: 1}, {unique: true})

const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel