"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchManufacturerProfile, saveOrUpdateManufacturerProfile } from "../../Store/manufacturer-actions";
import { setProfile } from "../../Store/manufacturerSlice";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile, created } = useSelector((state) => state.manufacturer);

  useEffect(() => {
    dispatch(fetchManufacturerProfile());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setProfile({ ...profile, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveOrUpdateManufacturerProfile(profile, router));
  };

  const {
    factoryName = "",
    location = "",
    machinery = "",
    dailyCapacity = "",
    phone = "",
  } = profile;

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <input
          name="factoryName"
          placeholder="Factory Name"
          value={factoryName}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="location"
          placeholder="Location"
          value={location}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="machinery"
          placeholder="Machinery"
          value={machinery}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="dailyCapacity"
          placeholder="Daily Capacity"
          type="number"
          value={dailyCapacity || ""}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          type="tel"
          value={phone}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded"
        >
          {created ? "Update Profile" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
