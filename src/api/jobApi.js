import axios from "axios";

const JOB_API_URL = "https://remotive.com/api/remote-jobs";
const LOCAL_API_URL = "http://localhost:5000/api/jobs";

export const fetchJobs = async (search = "") => {
  const response = await axios.get(`${JOB_API_URL}?search=${search}`);
  return response.data;
};

export const saveJobs = async (job) => {
  return await axios.post(LOCAL_API_URL, job);
};

export const deleteJob = async (jobId) => {
  return await axios.delete(`${LOCAL_API_URL}/${jobId}`);
};

export const fetchSavedJobs = async () => {
  const response = await axios.get(LOCAL_API_URL);
  return response.data;
};



