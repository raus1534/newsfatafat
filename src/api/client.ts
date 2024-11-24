import axios, { InternalAxiosRequestConfig } from "axios";
import { handleAxiosError } from "../utils/helper";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  baseURLOverride?: string;
}

const client = axios.create();

client.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    if (config.baseURLOverride) {
      config.baseURL = config.baseURLOverride;
    } else {
      config.baseURL =
        process.env.REACT_APP_BASEURL || "https://newsapi.org/v2";
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
client.interceptors.response.use(
  (response) => {
    // Successful response
    return response;
  },
  (error) => {
    // Global error handler
    return handleAxiosError(error);
  }
);

export default client;
