// Axios is used for HTTP requests
import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {"Content-Type": "application/json"}
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) { config.headers.Authorization = `Bearer ${token}`; }

    return config;
});

// Login request
export const login = (username, password) => {
    return api.post("/auth/login", { username, password });
};

// Register request
export const register = (username, password) => {
    return api.post("/auth/register", { username, password });
};

// Protected request
export const getProtectedData = () => {
    return api.post("/protected");
};

export default api;