const Sequelize = require("sequelize");
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.db,
   process.env.user, 
   process.env.passwd, {

  host: process.env.host,
  dialect: process.env.dialect ,
});

module.exports = sequelize;