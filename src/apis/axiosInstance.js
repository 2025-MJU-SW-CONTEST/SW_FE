import axios from "axios";
import useAuth from "@store/useAuth.js";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuth((s) => s.accessToken);
  if(accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
  },
  (error) => {
  return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);