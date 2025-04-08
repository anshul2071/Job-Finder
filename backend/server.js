import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "db.json");

const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return { jobs: [] };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing db.json:", error);
  }
};

app.get("/", (req, res) => {
  res.send("Backend is Running");
});

app.get("/api/jobs", (req, res) => {
  const db = readDB();
  res.json(db.jobs);
});

app.post("/api/jobs", (req, res) => {
  const newJob = req.body;
  const db = readDB();
  if (db.jobs.some((job) => job.id.toString() === newJob.id.toString())) {
    return res.status(400).json({ message: "Job already exists" });
  }
  db.jobs.push(newJob);
  writeDB(db);
  res.status(201).json(newJob);
});

app.delete("/api/jobs/:id", (req, res) => {
  const jobId = req.params.id.toString();
  const db = readDB();
  if (!db.jobs.some((job) => job.id.toString() === jobId)) {
    return res.status(404).json({ message: "Job not found" });
    
  }

  

  db.jobs = db.jobs.filter((job) => job.id.toString() !== jobId);
  writeDB(db);
  res.json({ message: "Job deleted successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
