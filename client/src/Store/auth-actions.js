"use client"
import { toast } from "react-toastify";

import axios from "./api"; // axios instance with baseURL
import { authActions } from "./authSlice";

// ✅ Signup
export const signUpUser = ({ name, email, password, role }, router) => {
  return async () => {
    try {
      const response = await axios.post("/auth/signup", { name, email, password, role });

      toast.success(response.data.message || "Account created successfully!");
      
      // Navigate after a short delay so toast is visible
      setTimeout(() => {
        router.push(`/login/${role}`);
      }, 1500);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed!";
      toast.error(errorMessage);
    }
  };
};

// ✅ Login
export const loginUser = ({ email, password, role, navigate }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/auth/login", { email, password, role });

      const { token, role: userRole ,name} = response.data;

      dispatch(authActions.login({ token, role: userRole, email,name }));

      if (userRole === "worker") {
        navigate("/worker/dashboard");
      } else {
        navigate("/manufacturer/dashboard");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
    }
  };
};

export const logoutUser = (navigate) => {
  return (dispatch) => {
    dispatch(authActions.logout());
    navigate("/login");
  };
};
