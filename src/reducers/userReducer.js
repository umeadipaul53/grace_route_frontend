// src/reducers/userReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

//--Create User ---
export const createUserAccount = createAsyncThunk(
  "user/createUserAccount",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", credentials, {
        withCredentials: true,
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      console.error(
        "❌ Create user account error response:",
        error.response?.data
      );

      // Extract the most descriptive message possible
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      // ✅ Prevent React from seeing an unhandled rejection
      return rejectWithValue(message);
    }
  }
);

//--- VERIFY USER ACCOUNT CREATED ----
export const VerifyAccount = createAsyncThunk(
  "user/verifyAccount",
  async (token, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/auth/verify-user-account?token=${token}`,
        {
          withCredentials: true,
        }
      );

      const { newToken, message } = response.data;
      return { newToken, message };
    } catch (error) {
      // Extract the most descriptive message possible
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      // ✅ Prevent React from seeing an unhandled rejection
      return rejectWithValue(message);
    }
  }
);

// --- LOGIN USER ---
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("🔹 Sending to:", `${API.defaults.baseURL}/auth/login`);
      const res = await API.post("/auth/login", credentials, {
        withCredentials: true,
      });
      console.log("✅ Login response received:", res);
      // ✅ Expect backend shape { accessToken, data: user }
      const { accessToken, data } = res.data;

      // Store in localStorage
      if (accessToken) {
        localStorage.setItem("token", accessToken); // ✅ THIS IS CRUCIAL
        localStorage.setItem("user", JSON.stringify(data));
      }

      console.log("✅ Login successful:", data);

      return { token: accessToken, user: data };
    } catch (error) {
      console.error("❌ Login error response:", error.response?.data);

      // Extract the most descriptive message possible
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      // ✅ Prevent React from seeing an unhandled rejection
      return rejectWithValue(message);
    }
  }
);

//--FORGOT PASSWORD ---
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/forgot-password", credentials, {
        withCredentials: true,
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      console.error("❌ Forgot Password error response:", error.response?.data);

      // Extract the most descriptive message possible
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      // ✅ Prevent React from seeing an unhandled rejection
      return rejectWithValue(message);
    }
  }
);

//--RECOVER PASSWORD ---
export const recoverPassword = createAsyncThunk(
  "user/recoverPassword",
  async ({ token, newPassword, confirmPass }, { rejectWithValue }) => {
    try {
      const response = await API.put(
        "/auth/change-password",
        {
          token,
          newPassword,
          confirmPass,
        },
        {
          withCredentials: true,
        }
      );

      const { message } = response.data;
      return { message, data };
    } catch (error) {
      console.error("❌ Change Password error response:", error.response?.data);

      // Extract the most descriptive message possible
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      // ✅ Prevent React from seeing an unhandled rejection
      return rejectWithValue(message);
    }
  }
);

//---CHECK CHANGE PASSWORD TOKEN ----
export const checkToken = createAsyncThunk(
  "user/checkToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/change-password?token=${token}`, {
        withCredentials: true,
      });

      const { valid, message } = response.data;
      return { valid, message };
    } catch (error) {
      // Extract the most descriptive message possible
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      // ✅ Prevent React from seeing an unhandled rejection
      return rejectWithValue(message);
    }
  }
);

// --- FETCH LOGGED-IN USER PROFILE ---
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/user/profile");
      const { data } = res.data;
      return { data };
    } catch (error) {
      return rejectWithValue("Failed to fetch user profile");
    }
  }
);

// --- UPLOAD PROFILE PICTURE ---
export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/user/profile-image", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { message, imageURL } = response.data; // match your backend response
      return { message, imageURL };
    } catch (error) {
      return rejectWithValue("Upload failed");
    }
  }
);

// --- REPLACE PROFILE PICTURE ---
export const replaceProfilePicture = createAsyncThunk(
  "user/replaceProfilePicture",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.put("/user/profile-image", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { message, imageURL } = response.data;
      return { message, imageURL };
    } catch (error) {
      return rejectWithValue("Upload failed");
    }
  }
);

// --- REMOVE PROFILE PICTURE ---
export const removeProfilePicture = createAsyncThunk(
  "user/removeProfilePicture",
  async (_, { rejectWithValue }) => {
    try {
      await API.delete("/user/delete-profile-image");
      return null;
    } catch (error) {
      return rejectWithValue("Failed to remove picture");
    }
  }
);

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.patch("/user/profile-update", credentials, {
        withCredentials: true,
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      console.error("❌ edit profile error:", {
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        response: error.response?.data || "No response received",
      });
      // Extract the most descriptive message possible
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      // ✅ Prevent React from seeing an unhandled rejection
      return rejectWithValue(message);
    }
  }
);

export const updateGoals = createAsyncThunk(
  "user/updateGoals",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.patch("/user/goals-update", credentials, {
        withCredentials: true,
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      // Extract the most descriptive message possible
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      // ✅ Prevent React from seeing an unhandled rejection
      return rejectWithValue(message);
    }
  }
);

export const searchProperty = createAsyncThunk(
  "user/searchProperty",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/view-all-property-listing", {
        params,
        withCredentials: true,
      });

      const { message, pagination, data, count } = response.data;
      return { message, pagination, data, count };
    } catch (err) {
      if (err.response?.status === 404) {
        // Return empty data to frontend
        return rejectWithValue({ notFound: true });
      }
      return rejectWithValue(
        err.response?.data || { message: "Request failed" }
      );
    }
  }
);

export const buyProperty = createAsyncThunk(
  "user/buyProperty",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `/user/buy-property/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      // Extract the most descriptive message possible
      const errData = error.response?.data;
      const message =
        errData?.details?.[0]?.message || // Joi validation message
        errData?.message || // AppError message
        error.message || // Network or CORS issue
        "An unknown error occurred";

      // ✅ Prevent React from seeing an unhandled rejection
      return rejectWithValue(message);
    }
  }
);

export const findPropertyLocations = createAsyncThunk(
  "user/findPropertyLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/fetch-property-locations");
      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.message ||
        error.message ||
        "Failed to load property locations";
      return rejectWithValue(message);
    }
  }
);

// --- INITIAL STATE ---
const storedToken = localStorage.getItem("token");
let storedUser = null;

try {
  const userData = localStorage.getItem("user");
  storedUser = userData ? JSON.parse(userData) : null;
} catch (err) {
  console.error("Invalid user data in localStorage:", err);
  localStorage.removeItem("user");
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser,
    isAuthenticated: !!storedToken,
    token: storedToken,
    profileImage: null,
    details: null,
    getValue: null,
    goals: null,
    locations: [],
    propertyData: [],
    pagination: {},
    successMessage: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.profileImage = null;
      state.error = null;
      state.details = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- LOGIN USER ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- FETCH PROFILE ---
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload.data;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- UPLOAD PROFILE PICTURE ---
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload.imageURL;
        state.successMessage = action.payload.message;
        if (state.user) {
          state.user.profileImage = action.payload.imageURL;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- REPLACE PROFILE PICTURE ---
      .addCase(replaceProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload.imageURL;
        state.successMessage = action.payload.message;
        if (state.user) {
          state.user.profileImage = action.payload.imageURL;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(replaceProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- REMOVE PROFILE PICTURE ---
      .addCase(removeProfilePicture.fulfilled, (state) => {
        state.profileImage = null;
        if (state.user) state.user.profileImage = null;
      })
      .addCase(removeProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -- Create Account ---
      .addCase(createUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(createUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- VERIFY USER ACCOUNT CRETION ---
      .addCase(VerifyAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(VerifyAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- FORGOT PASSWORD ---
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- CHANGE PASSWORD ---
      .addCase(recoverPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(recoverPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- CHECK RECOVER PASSWORD TOKEN ---
      .addCase(checkToken.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.getValue = null;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.loading = false;
        state.getValue = action.payload.valid;
        state.successMessage = action.payload.message;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.loading = false;
        state.getValue = false;
        state.error = action.payload;
      })

      // --- EDIT PROFILE ---
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload.data;
        state.successMessage = action.payload.message;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- UPDATE GOALS ---
      .addCase(updateGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload.data;
        state.successMessage = action.payload.message;
      })
      .addCase(updateGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- SEARCH PROPERTY ---
      .addCase(searchProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyData = action.payload?.data || [];
        state.pagination = action.payload?.pagination || {};
        state.error = null;
      })
      .addCase(searchProperty.rejected, (state, action) => {
        state.loading = false;
        if (action.payload?.notFound) {
          state.propertyData = []; // ✅ clear previous data
          state.pagination = null;
          state.error = "No property found for your search.";
        } else {
          state.error = action.payload?.message || "Failed to load properties";
        }
      })

      // --- BUY PROPERTY ---
      .addCase(buyProperty.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(buyProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(buyProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- FETCH PROPERTY LOCATIONS---
      .addCase(findPropertyLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(findPropertyLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload.data;
      })
      .addCase(findPropertyLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearError, clearSuccessMessage } =
  userSlice.actions;
export default userSlice.reducer;
