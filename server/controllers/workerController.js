const { Op } = require("sequelize");
const { WorkerProfile, Job, User, ManufacturerProfile, JobApplication } = require("../models");
const sequelize = require("../utils/db-connection");

const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


exports.saveProfile = async (req, res) => {
  try {
    const { skills, workType, location, phoneNumber, experience } = req.body;
    let profile = await WorkerProfile.findOne({ where: { userId: req.user.id } });

    if (profile) {
      profile.skills = skills || profile.skills;
      profile.workType = workType || profile.workType;
      profile.location = location || profile.location;
      profile.phoneNumber = phoneNumber || profile.phoneNumber;
      profile.experience = experience || profile.experience;
      await profile.save();
      return res.json({ created: true, data: profile, message: "Profile updated successfully" });
    }

    profile = await WorkerProfile.create({ userId: req.user.id, skills, workType, location, phoneNumber, experience });
    res.status(201).json({ created: true, data: profile, message: "Profile created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ created: false, data: null, message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await WorkerProfile.findOne({ where: { userId: req.user.id } });
    if (!profile) return res.json({ created: false, data: null, message: "Profile not created" });
    res.json({ created: true, data: profile, message: "Profile fetched successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ created: false, data: null, message: "Server error" });
  }
};


exports.getAllJobs = async (req, res) => {
  try {
    const appliedJobs = await JobApplication.findAll({ where: { workerId: req.user.id }, attributes: ["jobId"] });
    const appliedJobIds = appliedJobs.map((j) => j.jobId);

    const jobs = await Job.findAll({
      where: { isActive: true, id: { [Op.notIn]: appliedJobIds } },
      attributes: ["id", "title", "workersNeeded", "duration", "paymentPerDay"],
      include: [
        {
          model: User,
          as: "manufacturer",
          attributes: ["id", "email"],
          include: [{ model: ManufacturerProfile, attributes: ["factoryName", "location", "phone"] }],
        },
      ],
    });

    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      workersNeeded: job.workersNeeded,
      duration: job.duration,
      paymentPerDay: job.paymentPerDay,
      factoryName: job.manufacturer?.ManufacturerProfile?.factoryName || "",
      location: job.manufacturer?.ManufacturerProfile?.location || "",
      phone: job.manufacturer?.ManufacturerProfile?.phone || "",
    }));

    res.json({ jobs: formattedJobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ jobs: [], message: "Server error" });
  }
};


exports.applyJob = async (req, res) => {
  const t = await sequelize.transaction(); // start transaction
  try {
    const { jobId } = req.body;
    const workerId = req.user.id;

    const existing = await JobApplication.findOne({ where: { workerId, jobId }, transaction: t });
    if (existing) {
      await t.rollback();
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const job = await Job.findByPk(jobId, {
      include: [
        {
          model: User,
          as: "manufacturer",
          include: [{ model: ManufacturerProfile }]
        }
      ],
      transaction: t
    });

    const worker = await User.findByPk(workerId, { transaction: t });

    if (job.manufacturer?.ManufacturerProfile?.phone) {
      await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:+919652213187`, 
      body: `Hello ${job.manufacturer?.ManufacturerProfile?.factoryName || job.manufacturer.email},

    ${worker.name || worker.email} has applied for your job posting:

     Job Title: ${job.title}
     Duration: ${job.duration} days
     Payment per day: ₹${job.paymentPerDay}

    Please review the application in your dashboard.`
    });


    }

    const application = await JobApplication.create(
      { workerId, jobId, status: "Pending" },
      { transaction: t }
    );

    await t.commit(); 
    res.json({ message: "Applied successfully", application });
  } catch (err) {
    await t.rollback(); 
    console.error("Error in applyJob:", err);
    res.status(500).json({ message: "Error applying for job" });
  }
};


exports.getAppliedJobs = async (req, res) => {
  try {
    const applications = await JobApplication.findAll({
      where: { workerId: req.user.id },
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "duration", "paymentPerDay"],
          include: [
            {
              model: User,
              as: "manufacturer",
              attributes: ["id", "email"],
              include: [{ model: ManufacturerProfile, attributes: ["factoryName", "location", "phone"] }],
            },
          ],
        },
      ],
    });

    const appliedJobs = applications.map((app) => ({
      id: app.job?.id,
      title: app.job?.title,
      duration: app.job?.duration,
      paymentPerDay: app.job?.paymentPerDay,
      factoryName: app.job?.manufacturer?.ManufacturerProfile?.factoryName || "",
      location: app.job?.manufacturer?.ManufacturerProfile?.location || "",
      phone: app.job?.manufacturer?.ManufacturerProfile?.phone || "",
      status: app.status,
    }));

    res.json({ appliedJobs });
  } catch (err) {
    console.error("Error in getAppliedJobs:", err);
    res.status(500).json({ appliedJobs: [] });
  }
};
