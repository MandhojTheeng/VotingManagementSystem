// lib/auth.js
import Cookies from "js-cookie";

export const setToken = (token) => {
  if (typeof window !== "undefined") {
    Cookies.set("token", token, { expires: 7, sameSite: "lax" });
  }
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return Cookies.get("token") || null;
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    Cookies.remove("token");
  }
};

export const isLoggedIn = () => {
  return !!getToken();
};