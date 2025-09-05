"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import WorkerProfileForm from "@/components/Worker/WorkerProfileForm ";
import AllJobs from "@/components/Worker/AllJobs ";
import AppliedJobs from "@/components/Worker/AppliedJobs ";

import { fetchWorkerProfile } from "@/Store/workerActions";
import { authActions } from "@/Store/authSlice";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function WorkerDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activePage, setActivePage] = useState("allJobs");
  const [mounted, setMounted] = useState(false);

  const created = useSelector((state) => state.worker.created);
  const authName = useSelector((state) => state.auth.name);

  useEffect(() => {
    setMounted(true);
    dispatch(fetchWorkerProfile());
  }, [dispatch]);

  const handleNavigation = (page) => {
    if (!created && page !== "profile") {
      toast.info("Please create your profile first!");
      setActivePage("profile");
      return;
    }
    setActivePage(page);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    router.push("/");
  };

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <WorkerProfileForm />;
      case "allJobs":
        return <AllJobs />;
      case "appliedJobs":
        return <AppliedJobs/>;
      default:
        return <AllJobs />;
    }
  };

  if (!mounted) return null; 

  return (
    <ProtectedRoute allowedRole="worker">
      <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-white shadow flex flex-col justify-between">
        <div>
          <div className="p-4 text-xl font-bold border-b">
            Welcome, {authName || "Worker"}
          </div>

          <ul className="flex flex-col mt-4 space-y-2">
            <li
              className={`p-3 cursor-pointer ${
                activePage === "allJobs" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleNavigation("allJobs")}
            >
              All Jobs
            </li>
            <li
              className={`p-3 cursor-pointer ${
                activePage === "appliedJobs" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleNavigation("appliedJobs")}
            >
              Applied Jobs
            </li>
            <li
              className={`p-3 cursor-pointer ${
                activePage === "profile" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleNavigation("profile")}
            >
              Profile
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 m-4 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-4">{renderPage()}</div>
    </div>
    </ProtectedRoute>
  );
}
