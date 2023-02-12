const { resolve } = require('path/win32');
const Chat = require('../models/chat');

const { Op } = require("sequelize");

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

// exports.getAllChats = async (req,res,next)=>{
   
//     try{

//         const id = req.query.getFrom;
//         const Chats = await req.user.getChats({where:{
//             id:{
//                 [Op.gt]:id
//             }
//         }
//     });

//     console.log(Chats);
        
//         res.status(201).json(Chats);

//     }
//     catch(error){
//         res.status(404).json(error);
//     }
// };

exports.getAllChats = async (req,res,next)=>{
   
    try{

        const Chats = await req.user.getChats();

    console.log(Chats);
        
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


exports.postGroupChat = async(req,res,next)=>{
   
    try{
        const id = req.query.id;
       const chat = req.body.chat;

        const chats = await req.user.createChat({
            message:chat,
            GroupId:id
        })

        res.status(201).json(chats);
    }
    catch(error){
        res.status(404).json(error);
    }
};