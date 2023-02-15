const AWS = require('aws-sdk');
const multer = require('multer');
const User = require('../models/user');
const File = require('../models/files');
const userFile = require('../models/userFile');
const groupFile = require('../models/groupFile');
const Group = require('../models/group');


let S3;

exports.uploadFile = async (req,res,next)=>{
    
   console.log(req.file);
    // console.log(req.image);
    const awsConfig = {

        accessKeyId:process.env.ACCESS_KEY,
        secretAccessKey:process.env.SECRET_KEY,
        region:process.env.REGION
    
    }
    
         S3 = new AWS.S3(awsConfig);
        
   if(req.file){
      
    const result = await uploadToS3(req.file.buffer);

    const file = await File.create({
        files:result.Location
    })

    await userFile.create({
       
        UserId:req.user.id,
        FileId: file.id
    })

    return res.json({
            message: "uploaded successfully",
            imageUrl: result.Location

    })

   }


} 

const uploadToS3 = (fileData,file)=>{

    return new Promise((resolve,reject)=>{

        let params;

        if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ){
             params = {
                Bucket :process.env.BUCKET_NAME,
                Key:`${Date.now().toString()}.jpg`,
                Body:fileData,
                ACL: 'public-read'
            }
    
        }
        else if(file.mimetype === 'application/pdf'){
            params = {
                Bucket :process.env.BUCKET_NAME,
                Key:`${Date.now().toString()}.pdf`,
                Body:fileData,
                ACL: 'public-read'
            }
        }
        else{
             params = {
                Bucket :process.env.BUCKET_NAME,
                Key:`${Date.now().toString()}.mp4`,
                Body:fileData,
                ACL: 'public-read'
            }
        }

        S3.upload(params,(err,data)=>{

            if(err){
                console.log(err)
                reject(err)
            }

            console.log(data)
            return resolve(data)
        })
    })
}

exports.getFiles = async(req,res,next)=>{
  
    try{
        const files = await req.user.getFiles();
        res.status(200).json(files);
    }
    catch(error){
         res.status(404).json(error);
    }
};

exports.uploadGroupFile = async(req,res,next)=>{
  
    console.log(req.file);

   
    const awsConfig = {

        accessKeyId:process.env.ACCESS_KEY,
        secretAccessKey:process.env.SECRET_KEY,
        region:process.env.REGION
    
    }
    
         S3 = new AWS.S3(awsConfig);

         if(req.file){
        
            const result = await uploadToS3(req.file.buffer,req.file);

    const file = await File.create({
        files:result.Location
    })

    await groupFile.create({
       
        GroupId:req.query.id,
        FileId: file.id
    })

    return res.json({
            message: "uploaded successfully",
            imageUrl: result.Location

    })

   }
};

exports.getAllFiles = async(req,res,next)=>{

    try{
      
        const id = req.query.groupId;

        const group = await Group.findByPk(id);

        console.log(group);

       const groupFiles = await group.getFiles();

       console.log(groupFiles);

        res.status(201).json(groupFiles);

    }
    catch(error){
        console.log(error);
        res.status(404).json(error);
    }
}


