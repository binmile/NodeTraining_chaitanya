const { Sequelize } = require('sequelize');
const {database,user,password,host,dialect} = require('../config/config');


const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: dialect,
  });


  sequelize.sync().then(function(){
    console.log('DB connection sucessful.');
  }, function(err){
    console.log(err);
  });
  
global.sequelize= sequelize; 
module.exports = sequelize;