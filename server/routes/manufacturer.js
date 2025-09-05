const express = require("express");
const router = express.Router();
const { Authenticate, Authorize } = require("../middleware/auth");
const manufacturerController = require("../controllers/manufacturerController");

router.use(Authenticate);
router.use(Authorize(["manufacturer"]));

router.get("/profile", manufacturerController.getProfile);
router.post("/profile", manufacturerController.saveProfile);

router.get("/jobs", manufacturerController.getJobs);

router.get("/applications", manufacturerController.getJobApplications);

router.put("/applications/:applicationId", manufacturerController.updateApplicationStatus);
router.post("/jobs", manufacturerController.createJob);
router.put("/jobs/:id", manufacturerController.editJob);
router.delete("/jobs/:id", manufacturerController.removeJob);


module.exports = router;
