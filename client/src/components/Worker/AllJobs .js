"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs, fetchAppliedJobs, applyForJob } from "../../Store/workerActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllJobs() {
  const dispatch = useDispatch();
  const { allJobs, appliedJobs, loading, created } = useSelector((state) => state.worker);

  useEffect(() => {
    dispatch(fetchAllJobs());
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  const handleApply = (jobId) => {
    if (!created) {
      toast.info("Please create your profile first!");
      return;
    }
    dispatch(applyForJob(jobId));
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Jobs</h2>

      {allJobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <div className="space-y-3">
          {allJobs.map((job) => {
            const applied = appliedJobs.find((aj) => aj.jobId === job.id);

            return (
              <div
                key={job.id}
                className="p-4 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p>Pay: ₹{job.paymentPerDay}/day</p>
                  <p>Duration: {job.duration} days</p>
                  <p>Factory: {job.factoryName}</p>
                  <p>Location: {job.location}</p>
                  <p>Phone: {job.phone}</p>
                </div>

                {applied ? (
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      applied.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : applied.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {applied.status}
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(job.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Apply
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
