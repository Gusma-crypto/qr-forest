// lib/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL||'http://localhost:3001/api', // GANTI dengan baseURL backend kamu
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk auth
API.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;