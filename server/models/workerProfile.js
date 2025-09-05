const { DataTypes } = require("sequelize");
const db = require("../utils/db-connection");

const WorkerProfile = db.define("WorkerProfile", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  skills: { type: DataTypes.STRING },
  workType: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  phoneNumber: { type: DataTypes.STRING },
    experience: { type: DataTypes.INTEGER }, 

});

module.exports = WorkerProfile;
