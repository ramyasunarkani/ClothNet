"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../Store/auth-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm({ role }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role || "worker",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: role || "worker" }));
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUser(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
        router
      )
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md"
    >
      <h2 className="text-xl mb-4">Create {formData.role} Account</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-2"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Register
      </button>

      <p className="mt-2 text-sm text-center">
        Already have an account?{" "}
        <Link
          href={`/login/${formData.role}`}
          className="text-indigo-600 underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
