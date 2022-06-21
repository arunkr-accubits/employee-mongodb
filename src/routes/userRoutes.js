const express = require('express');
const userDetails = require('../model/user');
const verifyToken = require('../middlewares/authJWT');
const { signup, signin } = require ('../controllers/auth.controller');

const router = express.Router();

router.post('/register', signup);
router.post('/login', signin);

router.get('/users', async(req, res)=>{
    const user= await userDetails.find({});
    try{
        res.send(user);
    } catch (error){
        res.status(500).send(error);
    }
});


router.get('/hiddencontent', verifyToken, async(req, res)=>{
    try{
    if (!user) {
        res.status(403)
        .send({ 
            message: 'Invalid JWT token' 
        });
    }
    if(req.user == 'admin'){ 
        res.status(200)
        .send({ 
            message: 'Congratulations! but there is no hidden content' 
        });

    } else {
        res.status(403)
        .send({ 
            message: 'Unauthorised access'
        });
    }
} catch (error){
    res.status(500).send(error);
}
});

module.exports=router;

