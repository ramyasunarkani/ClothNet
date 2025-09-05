const { DataTypes } = require("sequelize");
const db = require("../utils/db-connection");


const JobApplication = db.define("JobApplication", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: { 
  type: DataTypes.ENUM("Pending", "Accepted", "Rejected"), 
  defaultValue: "Pending" 
},

});


module.exports = JobApplication;
