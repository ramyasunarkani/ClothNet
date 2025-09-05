"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import manufactureReducer from './manufacturerSlice'
import workerReducer from './workerSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    manufacturer:manufactureReducer,
    worker:workerReducer
  },
});
