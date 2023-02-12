const Group = require('../models/group');
const userGroup = require('../models/user-group');
const Chat = require('../models/chat');

exports.createGroup = async(req,res)=>{
    
    try{
        const groupName = req.body.group;

       const group =  await Group.create({
            groupName:groupName
        })

        const usergroup =  await userGroup.create({
            UserId:req.user.id,
            GroupId:group.id
        })
    
        res.status(201).json({message:"successfully created group",group,usergroup});
    
    }
    catch(error){
        res.status(500).json({error});
    };
   
};

exports.getGroup = async(req,res)=>{
  
    try{
      
       const response =  await req.user.getGroups();
       //console.log(response);
       
       res.status(200).json(response);
    }
    catch(error){
        res.status(500).json({error});
    }
};

exports.getMessages = async(req,res)=>{
  
    try{
        
        const groupId = req.query.groupId;

        console.log(groupId);
        
       const chats = await Chat.findAll({where:{GroupId:groupId}});

        res.status(200).json(chats);

    }
    catch(error){
        res.status(500).json({error});
    }
};

exports.joinGroup = async(req,res)=>{

    try{
       
        const id = req.body.id;
       const group =  await userGroup.create({
            UserId:req.user.id,
            GroupId:id
        })

        res.status(201).json(group);
    }
    catch(error){
     res.status(500).json(error);
    }
};

exports.getAllGroups = async(req,res)=>{

    try{ 
     
        const groups = await Group.findAll();

        res.status(200).json(groups);
    }
    catch(error){
        res.status(500).json(error);
    }
}