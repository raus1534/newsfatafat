import axios from "axios";
import { handleAxiosError } from "../utils/helper";

// Axios instance
const client = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

// Request interceptor (optional, for modifying requests globally)
client.interceptors.request.use(
  (config) => {
    // Modify request if needed (no token required here)
    // You can still set default params or headers
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
    // successful
    return response;
  },
  (error) => {
    // Global error handler
    return handleAxiosError(error);
  }
);

export default client;
