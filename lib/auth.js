// lib/auth.js
import Cookies from "js-cookie";

export const setToken = (token, user = null) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);           // Save token
  if (user) localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export const isLoggedIn = () => !!getToken();
export const isAdmin = () => getUser()?.role === "admin";