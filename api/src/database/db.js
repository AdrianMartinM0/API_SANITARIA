const Sequelize = require("sequelize");

const sequelize = new Sequelize("dbsanitaria", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;