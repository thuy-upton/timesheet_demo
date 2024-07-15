// src/components/JobList.js
import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      <div>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
