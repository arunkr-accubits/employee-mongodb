const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');


//SIGNUP
exports.signup = async (req, res)=> {
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password,8)
    });

    try {
        await user.save();
        res.status(200)
        .send({ 
            user:{
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }, 
            message: 'User Registered Successfully '});
    } catch (error) {
        res.status(500).send(error);
    }
}

//SIGNIN


exports.signin= async (req, res)=>{
    
    let user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.status(404)
        .send({
            message: 'User Not Found'
        });
    }

    //Comparing Password
    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
    //checking if password was valid and send response accordingly
    if(!passwordIsValid){
        return res.status(401)
        .send({
            accessToken: null,
            message: 'Invalid Password'
        });
    }
    //signing token with user id
    let  token = jwt.sign({ id:user.id }, process.env.API_SECRET, { expiresIn: 86400 });
        
    //responding to client requests with user profile success message and access token
    res.status(200)
    .send({
        user:{
            id: user._id,
            email:user.email,
            fullName: user.fullName,
        },
        message: 'Login successful',
        accessToken: token,
    }); 
}
