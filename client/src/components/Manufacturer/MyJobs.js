"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, editJob, removeJob } from "@/Store/manufacturer-actions"; // use manufacturer-actions
import { toast } from "react-toastify";

export default function Jobs() {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.manufacturer);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleToggleActive = (job) => {
    dispatch(editJob(job.id, { isActive: !job.isActive }));
  };

  const handleDelete = (jobId) => {
    if (confirm("Are you sure you want to delete this job?")) {
      dispatch(removeJob(jobId));
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (!jobs.length) return <p>No jobs posted yet.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Jobs</h2>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="p-4 border rounded-md flex justify-between items-center bg-gray-50"
        >
          <div>
            <h3 className="font-semibold">{job.title}</h3>
            <p>
              Workers Needed: {job.workersNeeded} | Duration: {job.duration} days | ₹
              {job.paymentPerDay}/day
            </p>
            <p>Status: {job.isActive ? "Active" : "Inactive"}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleToggleActive(job)}
              className={`py-1 px-3 rounded ${
                job.isActive ? "bg-yellow-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              {job.isActive ? "Deactivate" : "Activate"}
            </button>
            <button
              onClick={() => handleDelete(job.id)}
              className="py-1 px-3 rounded bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
