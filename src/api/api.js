import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://grace-route-real-estate-company.onrender.com/api"
      : "http://localhost:3300/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // allow refreshToken cookie
});

// ✅ Function to check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;
    const currentTime = Date.now() / 1000; // seconds
    return decoded.exp < currentTime;
  } catch (err) {
    console.error("Invalid token:", err);
    return true;
  }
};

// ✅ Function to refresh access token using HttpOnly refresh cookie
const refreshAccessToken = async () => {
  try {
    const res = await axios.post(
      `${API.defaults.baseURL}/auth/refresh-token`,
      {},
      { withCredentials: true }
    );

    const { accessToken } = res.data;
    if (accessToken) {
      localStorage.setItem("token", accessToken);
      return accessToken;
    }

    throw new Error("No access token returned from refresh endpoint");
  } catch (error) {
    console.warn(
      "❌ Token refresh failed:",
      error.response?.data || error.message
    );
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return null;
  }
};

let isRefreshing = false;
let refreshQueue = [];

// ✅ Helper to queue requests while refreshing
const processRefreshQueue = (error, newToken = null) => {
  refreshQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(newToken);
  });
  refreshQueue = [];
};

// ✅ Request Interceptor
API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        console.warn("Access token expired — attempting refresh...");

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newToken = await refreshAccessToken();
            processRefreshQueue(null, newToken);
            config.headers.Authorization = `Bearer ${newToken}`;
          } catch (error) {
            processRefreshQueue(error, null);
            throw error;
          } finally {
            isRefreshing = false;
          }
        } else {
          // Wait for the current refresh to finish
          const newToken = await new Promise((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
          });
          config.headers.Authorization = `Bearer ${newToken}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip redirect for login/register/forgot-password routes
    const isAuthRoute =
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register") ||
      originalRequest.url.includes("/auth/forgot-password");

    // If request failed with 401 due to expired access token
    if (error.response && error.response.status === 401 && !isAuthRoute) {
      // Avoid infinite retry loop
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return API(originalRequest); // retry the original request
          }
        } catch (err) {
          console.warn("❌ Refresh failed, forcing logout");
        }
      }

      // If refresh fails completely → logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
