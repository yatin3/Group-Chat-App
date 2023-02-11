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

exports.getAllChats = async (req,res,next)=>{
   
    try{
        const Chats = await Chat.findAll();
        
        res.status(201).json(Chats);

    }
    catch(error){
        res.status(404).json(error);
    }
};

exports.getCounts = async (req,res,next)=>{
  
    try{
      
        const counts = await Chat.count();
        res.status(201).json(counts);
    }
    catch(error){
        res.status(404).json(error);
    }
};