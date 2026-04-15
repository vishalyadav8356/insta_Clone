const postModel = require("../models/post.model")
// For image upload to imagekit required
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imageKit = new ImageKit({
    //privatekey is required for uploading image to imagekit
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
    console.log(req.body)

    const token = req.cookies.token

    if(!token){
        return res.status(401).send({
            message:"token is not provided unauthorized access"
        })
    }

    let decoded = null ;

    try{
         decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).send({
            message:"invalid token unauthorized access"
        })
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "insta-clone-posts"
    })


    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        userId: decoded.id
    })

    res.status(201).send({
        message: "post created successfully",
        post
    })
}

module.exports = {
    createPostController
}