const jwt = require('jsonwebtoken');
User = require('../model/user');

const verifyToken =async (req,res,next)=>{
    const authHeader = await req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, accessTokenSecret, (err, user)=>{
            if (err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}


module.exports = verifyToken;