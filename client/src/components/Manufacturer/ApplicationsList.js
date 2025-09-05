"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplications, changeApplicationStatus } from "../../Store/manufacturer-actions";

export default function Applications() {
  const dispatch = useDispatch();
  const { applications, loading } = useSelector((state) => state.manufacturer);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Job Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.applicationId} // ✅ unique key
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{app.jobTitle}</h3>
                <p>Worker: {app.workerName}</p>
                <p>Skills: {app.workerSkills}</p>
                <p>Phone: {app.workerPhone}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      app.status === "Accepted"
                        ? "text-green-600"
                        : app.status === "Rejected"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>
              </div>

              {/* Show buttons only for Pending applications */}
              {app.status === "Pending" && (
                <div className="space-x-2">
                  <button
                    onClick={() =>
                      dispatch(changeApplicationStatus(app.applicationId, "Accepted"))
                    }
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      dispatch(changeApplicationStatus(app.applicationId, "Rejected"))
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
