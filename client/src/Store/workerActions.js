import axios from "./api";
import { toast } from "react-toastify";

import {
  setProfile,
  setCreated,
  setAllJobs,
  setAppliedJobs,
  addAppliedJob,
  setLoading,
  setError,
} from "./workerSlice";

// Fetch worker profile
export const fetchWorkerProfile = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/worker/profile", {
      headers: { Authorization: token },
    });
    dispatch(setProfile(res.data.data || {}));
    dispatch(setCreated(res.data.created));
  } catch (err) {
    dispatch(setProfile({}));
    dispatch(setCreated(false));
    console.log("Profile not found");
  } finally {
    dispatch(setLoading(false));
  }
};

// Save or update profile
export const saveOrUpdateWorkerProfile = (profileData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("/worker/profile", profileData, {
      headers: { Authorization: token },
    });
    dispatch(setProfile(res.data.data || {}));
    dispatch(setCreated(true));
    toast.success(res.data.message || "Profile saved successfully!");
  } catch (err) {
    toast.error(err.response?.data?.message || "Error saving profile");
  }
};

// Fetch all jobs
export const fetchAllJobs = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/worker/jobs", {
      headers: { Authorization: token },
    });

    dispatch(setAllJobs(res.data.jobs || []));
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Error fetching jobs");
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch applied jobs
export const fetchAppliedJobs = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/worker/jobs/applied", {
      headers: { Authorization: token },
    });

    dispatch(setAppliedJobs(res.data.appliedJobs || []));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Apply for a job → immediately mark as Pending
export const applyForJob = (jobId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "/worker/jobs/apply",
      { jobId },
      { headers: { Authorization: token } }
    );

    // ✅ Immediately mark job as Pending
    dispatch(addAppliedJob({ jobId, status: "Pending" }));

    toast.success(res.data.message || "Applied successfully");

    // Optionally: sync with backend later
    // dispatch(fetchAppliedJobs());
  } catch (err) {
    toast.error(err.response?.data?.message || "Error applying for job");
  }
};
