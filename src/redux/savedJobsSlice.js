import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSavedJobs = createAsyncThunk(
  "savedJobs/fetchSavedJobs",
  async () => {
    const response = await axios.get("http://localhost:5000/api/jobs");
    return response.data;
  }
);

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState: {
    jobs: [],
    status: "idle",
    error: null,
  },
  reducers: {
    saveJob: (state, action) => {
      const job = action.payload;
      if (!state.jobs.find((j) => j.id.toString() === job.id.toString())) {
        state.jobs.push(job);
      }
    },
    removeJob: (state, action) => {
      const job = action.payload;
      state.jobs = state.jobs.filter((j) => j.id.toString() !== job.id.toString());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { saveJob, removeJob } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
