import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ Get all estate
export const getEstates = createAsyncThunk(
  "estate/getEstates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/view-all-estates", {
        withCredentials: true,
      });
      return response.data.data; // array of property objects
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load estates"
      );
    }
  }
);

// ✅ Get all estate FOR ADMIN
export const getEstatesAdmin = createAsyncThunk(
  "estate/getEstatesAdmin",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/view-estates", {
        withCredentials: true,
        params: {
          page,
        },
      });
      const { pagination, data } = response.data;
      return { pagination, data }; // array of estates objects
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load estates"
      );
    }
  }
);

//--- CREATE ESTATE ----
export const createEstate = createAsyncThunk(
  "estate/createEstate",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("admin/create-estate", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors || "failed to create an estate"
      );
    }
  }
);

//--- DELETE ESTATE ---
export const deleteEstate = createAsyncThunk(
  "estate/deleteEstate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/admin/delete-estate/${id}`,
        {},
        { withCredentials: true }
      );

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete estate"
      );
    }
  }
);

const estateSlice = createSlice({
  name: "estate",
  initialState: {
    items: [], // array of estates objects
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL ESTATES
      .addCase(getEstates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEstates.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(getEstates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL ADMIN ESTATES
      .addCase(getEstatesAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEstatesAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(getEstatesAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //--- CREATE AN ESTATE ----
      .addCase(createEstate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createEstate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createEstate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- DELETE ESTATE---
      .addCase(deleteEstate.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEstate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEstate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default estateSlice.reducer;
