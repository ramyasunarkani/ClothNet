"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWorkerProfile, saveOrUpdateWorkerProfile } from "@/Store/workerActions";
import { setProfile } from "@/Store/workerSlice";
import { toast } from "react-toastify";

export default function WorkerProfileForm() {
  const dispatch = useDispatch();
  const { profile, created } = useSelector((state) => state.worker);

  useEffect(() => {
    dispatch(fetchWorkerProfile());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setProfile({ ...profile, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!profile.skills || !profile.workType || !profile.location || !profile.phoneNumber || !profile.experience) {
      toast.error("Please fill all fields");
      return;
    }

    dispatch(saveOrUpdateWorkerProfile(profile));
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded shadow-md bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Worker Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="skills"
          value={profile.skills || ""}
          onChange={handleChange}
          placeholder="Skills (e.g., stitching, sewing)"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="workType"
          value={profile.workType || ""}
          onChange={handleChange}
          placeholder="Work Type (e.g., part-time, full-time)"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={profile.location || ""}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          value={profile.phoneNumber || ""}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="experience"
          value={profile.experience || ""}
          onChange={handleChange}
          placeholder="Experience (in years)"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          {created ? "Update Profile" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
