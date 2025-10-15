import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://grace-route-real-estate-company.onrender.com/api"
      : "http://localhost:3300/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // for refreshToken cookie
});

// ✅ Check if token expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    console.error("Invalid token:", err);
    return true;
  }
};

// ✅ Refresh token using HttpOnly cookie
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

const processRefreshQueue = (error, newToken = null) => {
  refreshQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(newToken);
  });
  refreshQueue = [];
};

// ✅ Request Interceptor
API.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    console.log("🟡 Outgoing request:", config.url);
    console.log("🟡 Token attached:", token ? "YES" : "NO");
    // Attach token if available
    if (token) {
      // Check expiration
      if (isTokenExpired(token)) {
        console.warn("⏳ Access token expired — refreshing...");

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newToken = await refreshAccessToken();
            processRefreshQueue(null, newToken);
            token = newToken;
          } catch (error) {
            processRefreshQueue(error, null);
            throw error;
          } finally {
            isRefreshing = false;
          }
        } else {
          // Wait for refresh to complete
          token = await new Promise((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
          });
        }
      }

      if (token) {
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
    const originalRequest = error.config || {};
    const url = originalRequest.url || "";

    // Ignore auth-related routes
    if (
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/forgot-password") ||
      url.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    // Handle expired or invalid token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return API(originalRequest);
        }
      } catch (err) {
        console.warn("❌ Refresh failed, logging out...");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
