const ManufacturerProfile = require("../models/Manufacturer");
const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");
const User = require("../models/User");
const WorkerProfile = require("../models/workerProfile");

exports.saveProfile = async (req, res) => {
  try {
    const { factoryName, location, machinery, dailyCapacity, phone } = req.body;

    let profile = await ManufacturerProfile.findOne({ where: { userId: req.user.id } });

    if (profile) {
      profile.factoryName = factoryName || profile.factoryName;
      profile.location = location || profile.location;
      profile.machinery = machinery || profile.machinery;
      profile.dailyCapacity = dailyCapacity || profile.dailyCapacity;
      profile.phone = phone || profile.phone;
      await profile.save();

      return res.json({
        created: true,
        data: profile,
        message: "Profile updated successfully",
      });
    }

    profile = await ManufacturerProfile.create({
      userId: req.user.id,
      factoryName,
      location,
      machinery,
      dailyCapacity,
      phone,
    });

    res.status(201).json({
      created: true,
      data: profile,
      message: "Profile created successfully",
    });
  } catch (err) {
    console.error("Error saving manufacturer profile:", err);
    res.status(500).json({ created: false, data: null, message: "Server error" });
  }
};

// Fetch profile
exports.getProfile = async (req, res) => {
  try {
    const profile = await ManufacturerProfile.findOne({ where: { userId: req.user.id } });

    if (!profile) {
      return res.json({
        created: false,
        data: null,
        message: "Profile not created",
      });
    }

    res.json({
      created: true,
      data: profile,
      message: "Profile fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching manufacturer profile:", err);
    res.status(500).json({ created: false, data: null, message: "Server error" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { userId: req.user.id },
    });
    res.json({ jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getJobApplications = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: JobApplication,
          as: "applications",
          include: [
            {
              model: User,
              as: "worker",
              include: [
                {
                  model: WorkerProfile,
                  as: "WorkerProfile",
                },
              ],
            },
          ],
        },
      ],
    });

    const applications = jobs.flatMap((job) =>
      job.applications.map((app) => ({
        applicationId: app.id,
        status: app.status,
        jobId: job.id,
        jobTitle: job.title,
        duration: job.duration,
        paymentPerDay: job.paymentPerDay,
        workerName: app.worker?.name,
        workerSkills: app.worker?.WorkerProfile?.skills || "",
        workerPhone: app.worker?.WorkerProfile?.phone || "",
      }))
    );

    res.json({ applications });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await JobApplication.findByPk(applicationId, {
      include: [
        {
          model: Job,
          as: "job",
        },
      ],
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.job.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.json({ message: "Application status updated", application });
  } catch (err) {
    console.error("Error updating application status:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.createJob = async (req, res) => {
  try {
    const { title, workersNeeded, duration, paymentPerDay, isActive } = req.body;

    const job = await Job.create({
      userId: req.user.id,
      title,
      workersNeeded,
      duration,
      paymentPerDay,
      isActive: isActive ?? true,
    });

    res.status(201).json({ message: "Job created successfully", job });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.editJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, workersNeeded, duration, paymentPerDay, isActive } = req.body;

    const job = await Job.findByPk(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.userId !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    job.title = title ?? job.title;
    job.workersNeeded = workersNeeded ?? job.workersNeeded;
    job.duration = duration ?? job.duration;
    job.paymentPerDay = paymentPerDay ?? job.paymentPerDay;
    job.isActive = isActive ?? job.isActive;

    await job.save();
    res.json({ message: "Job updated successfully", job });
  } catch (err) {
    console.error("Error editing job:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByPk(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.userId !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    await job.destroy();
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ message: "Server error" });
  }
};

