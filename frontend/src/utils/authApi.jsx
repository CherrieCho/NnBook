import axios from "axios";

const authApi = axios.create({
  /// baseURL: "https://nnbook-production-863f.up.railway.app/api",
  baseURL: "http://localhost:5050/api",
  timeout: 5000,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default authApi;
