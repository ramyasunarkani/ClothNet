"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createJob } from "@/Store/manufacturer-actions"; 

export default function AddJobForm() {
  const dispatch = useDispatch();
  const created = useSelector((state) => state.manufacturer.created); 

  const [form, setForm] = useState({
    title: "",
    workersNeeded: "",
    duration: "",
    paymentPerDay: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!created) {
      toast.info("Please create your profile first!");
      return;
    }

    dispatch(
      createJob({
        title: form.title,
        workersNeeded: parseInt(form.workersNeeded),
        duration: parseInt(form.duration),
        paymentPerDay: parseFloat(form.paymentPerDay),
      })
    );

    setForm({ title: "", workersNeeded: "", duration: "", paymentPerDay: "" });
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-50 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Create a Job</h2>
      <p className="mb-4 text-gray-600">Add a new job for workers</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job title"
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="workersNeeded"
          value={form.workersNeeded}
          onChange={handleChange}
          placeholder="Number of workers"
          required
          min={1}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (days)"
          required
          min={1}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="paymentPerDay"
          value={form.paymentPerDay}
          onChange={handleChange}
          placeholder="Payment per day (₹)"
          required
          min={1}
          step={0.01}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
}
