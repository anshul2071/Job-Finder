import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs } from "../api/jobApi";

export const getJobs = createAsyncThunk("jobs/getJobs", async (searchTerm = "") => {
  const data = await fetchJobs(searchTerm);
  return data.jobs;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobList: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobList = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
