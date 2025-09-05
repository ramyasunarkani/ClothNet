"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { fetchManufacturerProfile } from "@/Store/manufacturer-actions";
import { authActions } from "@/Store/authSlice";

import Profile from "@/components/Manufacturer/ProfileForm";
import Jobs from "@/components/Manufacturer/MyJobs";
import Applications from "@/components/Manufacturer/ApplicationsList";
import AddJobForm from "@/components/Manufacturer/AddJob";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activePage, setActivePage] = useState("jobs"); 
  const [mounted, setMounted] = useState(false);

  const authName = useSelector((state) => state.auth.name);

  useEffect(() => {
    setMounted(true);
    dispatch(fetchManufacturerProfile());
  }, [dispatch]);

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <Profile />;
      case "jobs":
        return <Jobs />;
      case "addJob":
        return <AddJobForm />;
      case "applications":
        return <Applications />;
      default:
        return <Jobs />;
    }
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    router.push("/");
  };

  if (!mounted) return null;

  return (
    <ProtectedRoute allowedRole="manufacturer">
      <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-white shadow flex flex-col justify-between">
        <div>
          <div className="p-4 text-xl font-bold border-b">
            Welcome, {authName || "Manufacturer"}
          </div>

          <ul className="flex flex-col mt-4 space-y-2">
            <li
              className={`p-3 cursor-pointer ${activePage === "jobs" ? "bg-gray-200" : ""}`}
              onClick={() => setActivePage("jobs")}
            >
              My Jobs
            </li>
            <li
              className={`p-3 cursor-pointer ${activePage === "addJob" ? "bg-gray-200" : ""}`}
              onClick={() => setActivePage("addJob")}
            >
              Add Job
            </li>
            <li
              className={`p-3 cursor-pointer ${activePage === "applications" ? "bg-gray-200" : ""}`}
              onClick={() => setActivePage("applications")}
            >
              Applications
            </li>
            <li
              className={`p-3 cursor-pointer ${activePage === "profile" ? "bg-gray-200" : ""}`}
              onClick={() => setActivePage("profile")}
            >
              Profile
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 m-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-4">{renderPage()}</div>
    </div>
    </ProtectedRoute>
  );
}
