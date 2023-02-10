const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

function generateAccessToken(id){
   
    return jwt.sign({userId:id},process.env.TOKEN_KEY);
}

exports.checkUser = async (req,res,next)=>{

    const email = req.body.email;
    const password = req.body.password;

    try{
        if(isStringInvalid(email) || isStringInvalid(password)){
            return res.status(400).json({message: "bad Parameter: something is Missing",success:false});
        }

        const user = await User.findOne({where:{email:email}});

        if(user!== null){

            bcrypt.compare(password,user.dataValues.password,(err,result) => {

                if(err){
                    throw new error("Something went wrong");
                }
                if(result === true){
                     return res.status(201).json({message:"User LoggedIn Successfully",token:generateAccessToken(user.id)})
                }
                else{
                    return res.status(401).json({message:"User not Authorized",success:false});
                }
            })
        }
        else{
            return res.status(404).json({message:"user not found",success:"false"});
        }
    }
    catch(error){
        return res.status(500).json(err);
    }
};
