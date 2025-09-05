"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, allowedRole }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
      return;
    }

    if (allowedRole && role !== allowedRole) {
      if (role === "worker") {
        router.push("/worker/dashboard");
      } else if (role === "manufacturer") {
        router.push("/manufacturer/dashboard");
      }
    }
  }, [router, allowedRole]);

  return <>{children}</>;
}
