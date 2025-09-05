const { DataTypes } = require("sequelize");
const db = require("../utils/db-connection");

const ManufacturerProfile = db.define("ManufacturerProfile", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  factoryName: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  machinery: { type: DataTypes.STRING },
  dailyCapacity: { type: DataTypes.INTEGER },
  phone: { type: DataTypes.STRING }, 
});

module.exports = ManufacturerProfile;
