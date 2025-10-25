import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ fetch all users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/view-all-users", {
        withCredentials: true,
        params: {
          page,
        },
      });

      const { count, pagination, data } = response.data;
      return { count, pagination, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all users"
      );
    }
  }
);

//--- DELETE USER ---
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/admin/delete-user-account/${id}`,
        {},
        { withCredentials: true }
      );

      const { message, data } = response.data;
      return { message, data }; // { action: "added" | "removed", data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle favourite"
      );
    }
  }
);

//--- CHANGE ADMIN PASSWORD ---
export const changeAdminPassword = createAsyncThunk(
  "users/changeAdminPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        "/admin/change-admin-password",
        formData,
        {
          withCredentials: true,
        }
      );

      const { message } = response.data;
      return { message }; //
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change admin password"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // array of property objects
    loading: false,
    count: 0,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- FETCH ALL USERS---
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.count = action.payload.count;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- DELETE USER---
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- CHANGE ADMIN PASSWORD ---
      .addCase(changeAdminPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changeAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
