import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const reportsPath = localStorage.getItem("reportsPath");
    if (reportsPath) {
        config.headers["X-Report-Path"] = reportsPath;
    }
    return config;
});

export default api;