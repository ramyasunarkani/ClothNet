import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    name: "",
    skills: "",
    experience: "",
    phone: "",
  },
  created: false,
  allJobs: [],
  appliedJobs: [],
  loading: false,
  error: null,
};

const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setCreated(state, action) {
      state.created = action.payload;
    },
    clearProfile(state) {
      state.profile = { name: "", skills: "", experience: "", phone: "" };
      state.created = false;
    },

    setAllJobs(state, action) {
      state.allJobs = action.payload;
    },
    setAppliedJobs(state, action) {
      state.appliedJobs = action.payload;
    },
    addAppliedJob(state, action) {
      state.appliedJobs.push(action.payload);
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setProfile,
  setCreated,
  clearProfile,
  setAllJobs,
  setAppliedJobs,
  addAppliedJob,
  setLoading,
  setError,
} = workerSlice.actions;

export default workerSlice.reducer;
