import axios from "./api";
import { toast } from "react-toastify";
import {
  setProfile,
  setCreated,
  setJobs,
  addJob,
  updateJob,
  deleteJob,
  setApplications,
  setLoading,
  setError,
  updateApplicationStatus,
} from "./manufacturerSlice";

export const fetchManufacturerProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/manufacturer/profile", {
      headers: { Authorization: token },
    });
    dispatch(setProfile(res.data.data || {}));
    dispatch(setCreated(res.data.created));
  } catch (err) {
    console.log("Profile not found");
    dispatch(
      setProfile({
        factoryName: "",
        location: "",
        machinery: "",
        dailyCapacity: "",
        phone: "",
      })
    );
    dispatch(setCreated(false));
  }
};

export const saveOrUpdateManufacturerProfile =
  (profileData, router) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/manufacturer/profile", profileData, {
        headers: { Authorization: token },
      });

      toast.success(res.data.message || "Profile saved successfully!");
      dispatch(setProfile(res.data.data || {}));
      dispatch(setCreated(true));

      setTimeout(() => {
        router.push("/manufacturer/dashboard");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving profile");
    }
  };

export const fetchJobs = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/manufacturer/jobs", {
      headers: { Authorization: token },
    });
    dispatch(setJobs(res.data.jobs || []));
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Error fetching jobs");
  } finally {
    dispatch(setLoading(false));
  }
};

export const createJob = (jobData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("/manufacturer/jobs", jobData, {
      headers: { Authorization: token },
    });
    dispatch(addJob(res.data.job));
    toast.success("Job created successfully");
  } catch (err) {
    toast.error("Error creating job");
  }
};

export const editJob = (id, jobData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`/manufacturer/jobs/${id}`, jobData, {
      headers: { Authorization: token },
    });
    dispatch(updateJob(res.data.job));
    toast.success("Job updated successfully");
  } catch (err) {
    toast.error("Error updating job");
  }
};

export const removeJob = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`/manufacturer/jobs/${id}`, {
      headers: { Authorization: token },
    });
    dispatch(deleteJob(id));
    toast.success("Job deleted successfully");
  } catch (err) {
    toast.error("Error deleting job");
  }
};

export const fetchApplications = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/manufacturer/applications", {
      headers: { Authorization: token },
    });
    dispatch(setApplications(res.data.applications || []));
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Error fetching applications");
  } finally {
    dispatch(setLoading(false));
  }
};

export const changeApplicationStatus = (applicationId, status) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await axios.put(
      `/manufacturer/applications/${applicationId}`,
      { status },
      { headers: { Authorization: token } }
    );

    dispatch(updateApplicationStatus({ applicationId, status }));
    toast.success("Status updated");
  } catch (err) {
    toast.error("Error updating status");
  }
};
