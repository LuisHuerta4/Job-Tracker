import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    withCredentials: true,
    timeout: 15000,
});

api.interceptors.request.use((config) => {
    const authState = JSON.parse(localStorage.getItem("authState"));
    if (authState?.token) {
        config.headers.Authorization = `Bearer ${authState.token}`;
    }
    return config;
});

// Global response interceptor to handle 401 Unauthorized errors
// Ex. if the user's session expires, they will be logged out and redirected to the login page
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("authState");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;