const { DataTypes } = require("sequelize");
const db = require("../utils/db-connection");

const Job = db.define("Job", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  workersNeeded: { type: DataTypes.INTEGER, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  paymentPerDay: { type: DataTypes.FLOAT, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Job;
