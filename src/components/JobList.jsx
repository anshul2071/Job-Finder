import { CircularProgress, Typography } from "@mui/material";

import JobCard from "./JobCard";

const JobList = ({jobs, loading, error}) => {
    if(loading) return <CircularProgress/>
    if(error) return <Typography color="error">{error}</Typography>;

    return (
        <> 
        {jobs && jobs.length >0 ? jobs.map((job) => <JobCard key = {job.id} job={job} />): <Typography sx={{m: 2}}>No Jobs Found </Typography>}
         </>
    );
};


export default JobList;