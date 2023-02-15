const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');

const router = express.Router();

const fileController = require('../controllers/file');

const userAuthentication = require('../middleware/auth');

let upload = multer({
    limits: 1024 * 1024 * 5,
    fileFilter: function(req,file,done){
    //  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    //      done(null,true)
    //  }else{
    //      done("multer error - file type is not supported",false);
    //  }
    done(null,true)
    }
 });

router.post('/upload',userAuthentication.authenticate,upload.single("image"),fileController.uploadFile);

router.get('/getFiles',userAuthentication.authenticate,fileController.getFiles);

router.post('/uploadGroupFile',userAuthentication.authenticate,upload.single("image"),fileController.uploadGroupFile);

router.get('/getAllFiles',userAuthentication.authenticate,fileController.getAllFiles);

module.exports = router;
