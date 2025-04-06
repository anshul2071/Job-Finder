import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress } from "@mui/material";
import JobCard from "../components/JobCard";
import { fetchSavedJobs } from "../redux/savedJobsSlice";

const Saved = () => {
  const dispatch = useDispatch();
  // Destructure the jobs property from the savedJobs state
  const { jobs, status, error } = useSelector((state) => state.savedJobs);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSavedJobs());
    }
  }, [dispatch, status]);

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Saved Jobs
      </Typography>
      {status === "loading" && <CircularProgress />}
      {status === "failed" && <Typography color="error">{error}</Typography>}
      {jobs && jobs.length === 0 ? (
        <Typography>No saved jobs yet.</Typography>
      ) : (
        jobs && jobs.map((job) => (
          <JobCard key={job.id} job={job} deletable />
        ))
      )}
    </Box>
  );
};

export default Saved;
