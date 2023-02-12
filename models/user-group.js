const Sequelize = require('sequelize');

const sequelize = require('../util/database'); 

const userGroup = sequelize.define('UserGroup',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
});

module.exports = userGroup;

