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

// --- LOGIN USER ---
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/login", credentials, {
        withCredentials: true,
      });

      // ✅ Expect backend shape { accessToken, data: user }
      const { accessToken, data } = res.data;

      // Store in localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(data));

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

//--FORGOT PASSWORD ---
export const recoverPassword = createAsyncThunk(
  "user/changePassword",
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
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/user/profile");
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user profile");
    }
  }
);

// --- UPLOAD PROFILE PICTURE ---
export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await API.post("/user/upload-profile", formData);
      return data.imageUrl;
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
      await API.delete("/user/remove-profile");
      return null;
    } catch (error) {
      return rejectWithValue("Failed to remove picture");
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
    profileImage: storedUser?.profileImage || null,
    details: null,
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
        state.isAuthenticated = true;
        state.details = action.payload.data;
        state.profileImage = action.payload.profileImage || null;
      })

      // --- UPLOAD PROFILE PICTURE ---
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.profileImage = action.payload;
        if (state.user) state.user.profileImage = action.payload;
      })

      // --- REMOVE PROFILE PICTURE ---
      .addCase(removeProfilePicture.fulfilled, (state) => {
        state.profileImage = null;
        if (state.user) state.user.profileImage = null;
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
        state.successMessage = null;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, clearError, clearSuccessMessage } =
  userSlice.actions;
export default userSlice.reducer;
