"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJobs } from "@/Store/workerActions";

export default function AppliedJobs() {
  const dispatch = useDispatch();
  const { appliedJobs, loading } = useSelector((state) => state.worker);

  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  if (loading) return <p>Loading applied jobs...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>

      {appliedJobs.length === 0 ? (
        <p>No applied jobs yet</p>
      ) : (
        <div className="space-y-3">
          {appliedJobs.map((job) => (
            <div
              key={job.jobId || job.id}  // ✅ unique key here
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p>Status: {job.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
