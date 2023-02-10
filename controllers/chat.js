const { resolve } = require('path/win32');
const Chat = require('../models/chat');

exports.postChat = async (req,res,next)=>{
    
    try{
    const chat = req.body.chat;
    
    
    const answer = await req.user.createChat({

        message:chat
    })

    res.status(201).json(answer);
    }

    catch(error){
        res.status(500).json(error);
    }

};