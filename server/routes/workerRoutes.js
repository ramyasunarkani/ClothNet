const express = require("express");
const router = express.Router();
const { Authenticate, Authorize } = require("../middleware/auth");
const {
  getProfile,
  saveProfile,
  getAllJobs,
  applyJob,
  getAppliedJobs,
} = require("../controllers/workerController");

router.use(Authenticate);
router.use(Authorize(["worker"]));

router.get("/profile", getProfile);
router.post("/profile", saveProfile);

router.get("/jobs", getAllJobs);
router.post("/jobs/apply", applyJob);
router.get("/jobs/applied", getAppliedJobs);

module.exports = router;
