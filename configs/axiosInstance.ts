import axios from "axios";
import config from "./config";
export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      const header: any = {
        ...config.headers,
        "x-access-token": `${accessToken}`,
      };
      config.headers = header;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
