const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Job = sequelize.define("Job", {

  taskName: DataTypes.STRING,
  payload: DataTypes.JSON,
  priority: DataTypes.STRING,
  status: DataTypes.STRING

});

sequelize.sync();

module.exports = Job;
