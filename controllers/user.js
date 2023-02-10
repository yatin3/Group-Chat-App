const User = require('../models/user');
const bcrypt = require('bcrypt');

function isStringInvalid(s){

    if(s.length===0 || s == null){
        return true;
    }
    return false;
}

exports.postUser = (req,res,next)=>{

    const user = req.body.user;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    try{
        if(isStringInvalid(user)||isStringInvalid(email)||isStringInvalid(phone)||isStringInvalid(password)){
            return res.status(400).json({error: "bad Parameter: something went wrong"});
        }

       bcrypt.hash(password,10,async(err,hash)=>{
const response = await User.create({
            name:user,
            email:email,
            phone:phone,
            password:hash
         })
         
          res.status(201).json({message: "Successfully created new user"});
       })

    }
    catch(error){
        console.log(err);
      res.status(404).json({message:'user already exist'});
    };


};
