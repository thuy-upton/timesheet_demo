import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import { useUser } from "../UserContext";

function JobCard({ job }) {
  const { currentUser } = useUser();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const appliedJobs = currentUser.applications;
      setApplied(appliedJobs.includes(job.id));
    }
  }, [currentUser, job.id]);

  async function handleApply() {
    if (!applied) {
      await JoblyApi.applyToJob(job.id);
      setApplied(true);
      // Update the current user's applications in the context
      currentUser.applications.push(job.id);
    }
  }

  return (
    <div>
      <h3>{job.title}</h3>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
