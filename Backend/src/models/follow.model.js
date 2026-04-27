const mongoose = require("mongoose")

//follow schema
const followSchema = new mongoose.Schema({
    //follower is required for creating a follow record because without follower follow record cannot be created and it is reference to users collection
    follower:{
       type:String,
    },

    //following is required for creating a follow record because without following follow record cannot be created and it is reference to users collection
    following:{
       type:String,
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["accepted","pending","rejected"],
            message:"status can only be accepted, pending or rejected"
        }
    }
},{
    timestamps:true
})

//to avoid duplicate follow record from same user on same user we will create a unique index on follower and following fields
followSchema.index({follower:1, following:1}, {unique:true})

//follow model
const followModel = mongoose.model("follows", followSchema)

//export the follow model
module.exports = followModel