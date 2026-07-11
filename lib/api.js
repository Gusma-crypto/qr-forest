// lib/api.js
import axios from "axios";

const apiOrigin = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");
const baseURL = apiOrigin.endsWith("/api") ? apiOrigin : `${apiOrigin}/api`;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk auth
API.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  if (apiKey) {
    config.headers.set?.("x-api-key", apiKey) ?? (config.headers["x-api-key"] = apiKey);
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.set?.("Authorization", `Bearer ${token}`) ?? (config.headers.Authorization = `Bearer ${token}`);
  }
  return config;
});

export default API;
