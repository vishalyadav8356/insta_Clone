const jwt = require('jsonwebtoken');

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


    // expose auth data in a consistent shape for all controllers
     req.user = decoded

    //call the next middleware
    next();

}

module.exports = identifyUser
