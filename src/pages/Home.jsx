import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../redux/jobsSlice";
import debounce from "lodash.debounce";
import { TextField, Box, MenuItem, Select, Pagination, Typography } from "@mui/material";
import JobList from "../components/JobList";

const Home = () => {
  const dispatch = useDispatch();
  const { jobList, status, error } = useSelector((state) => state.jobs);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const jobsPerPage = 5;

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(getJobs(query));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return debouncedSearch.cancel;
  }, [searchTerm, debouncedSearch]);

  // Guard around jobList to avoid errors if it's undefined
  const safeJobList = jobList || [];

  const filteredJobs = safeJobList.filter((job) =>
    category ? job.category === category : true
  );

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  return (
    <Box sx={{ m: 2 }}>
      <TextField
        fullWidth
        label="Search Jobs..."
        variant="outlined"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
      />

      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
        <Typography>Filter by Category</Typography>
        <Select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          sx={{ ml: 2 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Software Development">Software Development</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Design">Design</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
        </Select>
      </Box>

      <JobList jobs={paginatedJobs} loading={status === "loading"} error={error} />

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
