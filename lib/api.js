// lib/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // THIS IS THE MAGIC FIX
  // When sending FormData (images), we MUST let the browser set the Content-Type with boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export default API;