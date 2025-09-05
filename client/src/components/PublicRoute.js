"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PublicRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "worker") {
        router.push("/worker/dashboard");
      } else if (role === "manufacturer") {
        router.push("/manufacturer/dashboard");
      }
    }
  }, [router]);

  return <>{children}</>;
}
