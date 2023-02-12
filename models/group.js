const Sequelize = require('sequelize');

const sequelize = require('../util/database'); 

const Group = sequelize.define('Group',{
    
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    groupName:Sequelize.STRING
});

module.exports = Group;