"use client";
import { createSlice } from "@reduxjs/toolkit";

let initialToken = null;
let initialRole = null;
let initialEmail = null;
let initialName = null;

if (typeof window !== "undefined") {
  initialToken = localStorage.getItem("token");
  initialRole = localStorage.getItem("role");
  initialEmail = localStorage.getItem("email");
  initialName = localStorage.getItem("name");
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialToken,
    role: initialRole,
    email: initialEmail,
    name: initialName,
    isLoggedIn: !!initialToken,
  },
  reducers: {
    login(state, action) {
      const { token, role, email, name } = action.payload;
      state.token = token;
      state.role = role;
      state.email = email;
      state.name = name;
      state.isLoggedIn = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
        localStorage.setItem("name", name); 
      }
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.email = null;
      state.name = null; 
      state.isLoggedIn = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name"); 
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
