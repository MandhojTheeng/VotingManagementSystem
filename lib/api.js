import axios from "axios";
import { getToken } from "./auth";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const API = axios.create({ baseURL });

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

export default API;
