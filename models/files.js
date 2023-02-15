const Sequelize = require('sequelize');

const sequelize = require('../util/database'); 

const File = sequelize.define('File',{
   
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    files:Sequelize.STRING
});

module.exports = File;