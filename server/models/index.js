const User = require("./User");
const WorkerProfile = require("./workerProfile");
const ManufacturerProfile = require("./Manufacturer");
const Job = require("./Job");
const JobApplication = require("./JobApplication");

// WorkerProfile association
User.hasOne(WorkerProfile, { foreignKey: "userId", onDelete: "CASCADE" });
WorkerProfile.belongsTo(User, { foreignKey: "userId" });

// ManufacturerProfile association
User.hasOne(ManufacturerProfile, { foreignKey: "userId", onDelete: "CASCADE" });
ManufacturerProfile.belongsTo(User, { foreignKey: "userId" });

// Job association (many jobs per manufacturer)
User.hasMany(Job, { foreignKey: "userId", as: "jobs" });
Job.belongsTo(User, { foreignKey: "userId", as: "manufacturer" });

// JobApplication associations
User.hasMany(JobApplication, { foreignKey: "workerId", as: "applications" });
JobApplication.belongsTo(User, { foreignKey: "workerId", as: "worker" });

Job.hasMany(JobApplication, { foreignKey: "jobId", as: "applications" });
JobApplication.belongsTo(Job, { foreignKey: "jobId", as: "job" });

module.exports = { 
  User, 
  WorkerProfile, 
  ManufacturerProfile, 
  Job, 
  JobApplication 
};
