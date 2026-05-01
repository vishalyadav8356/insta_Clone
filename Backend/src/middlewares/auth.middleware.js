const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model")

async function identifyUser(req, res, next){
    //check if token is provided in cookies
    const token = req.cookies.token;

    //if token is not provided return unauthorized access
    if(!token){
        return res.status(401).send({
            message:"token is not provided unauthorized access"
        })
    }

    //if token is provided verify the token and get the user id from the token
    let decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).send({
            message:"invalid token unauthorized access"
        })
    }

    //find the user in database using user id from token
    const user = await userModel.findById(decoded.id);

    if(!user){
        return res.status(404).json({
            message:"user not found"
        });
    }

    //  FINAL FIX (both support)
    req.user = {
        ...user.toObject(),
        id: user._id
    };


    // expose auth data in a consistent shape for all controllers
    //  req.user = decoded

  

    //call the next middleware
    next();

}

module.exports = identifyUser
