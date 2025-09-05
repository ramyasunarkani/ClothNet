"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../Store/auth-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm({ role }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      loginUser({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        navigate: router.push,
      })
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md"
    >
      <h2 className="text-xl mb-4">Login as {formData.role}</h2>

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

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Login
      </button>

      <p className="mt-2 text-sm text-center">
        Don’t have an account?{" "}
        <Link
          href={`/register/${formData.role}`}
          className="text-indigo-600 underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
