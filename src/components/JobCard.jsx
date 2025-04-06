import { useState } from "react";
import { Card, CardContent, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { saveJob, removeJob } from "../redux/savedJobsSlice";
import { saveJobs, deleteJob } from "../api/jobApi";

const JobCard = ({ job, deletable = false }) => {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSave = async () => {
    dispatch(saveJob(job));
    try {
      await saveJobs(job);
      setSnackbar({ open: true, message: "Job saved successfully", severity: "success" });
    } catch (error) {
      if (error.response && error.response.data.message === "Job already exists") {
        setSnackbar({ open: true, message: "Job already saved", severity: "error" });
      } else {
        setSnackbar({ open: true, message: "Error saving job", severity: "error" });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(job.id);
      dispatch(removeJob(job));
      setSnackbar({ open: true, message: "Job deleted successfully", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Error deleting job", severity: "error" });
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Card sx={{ margin: 2 }}>
        <CardContent>
          <Typography variant="h6">{job.title}</Typography>
          <Typography>{job.company_name}</Typography>
          <Typography>{job.category}</Typography>
          {deletable ? (
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          )}
        </CardContent>
      </Card>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default JobCard;
