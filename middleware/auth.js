const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async(req,res,next)=>{

    try{
        const token = req.header('Authorization');

        console.log(token);
        
        const userIdentity = jwt.verify(token,process.env.TOKEN_KEY);

        const user = await User.findByPk(userIdentity.userId);

        req.user =  user;
        next();

    }
    catch(error){
        return res.status(401).json({message:false});
    }
}