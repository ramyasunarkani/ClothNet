import { createSlice } from "@reduxjs/toolkit";

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState: {
    profile: {},
    created: false,
    jobs: [], // ✅ store manufacturer jobs
    applications: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setCreated: (state, action) => {
      state.created = action.payload;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action) => {
      const idx = state.jobs.findIndex((j) => j.id === action.payload.id);
      if (idx !== -1) {
        state.jobs[idx] = action.payload;
      }
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((j) => j.id !== action.payload);
    },
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    updateApplicationStatus: (state, action) => {
      const { applicationId, status } = action.payload;
      const app = state.applications.find((a) => a.applicationId === applicationId);
      if (app) app.status = status;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProfile,
  setCreated,
  setJobs,
  addJob,
  updateJob,
  deleteJob,
  setApplications,
  updateApplicationStatus,
  setLoading,
  setError,
} = manufacturerSlice.actions;

export default manufacturerSlice.reducer;
