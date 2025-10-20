import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ get Property Details
export const getPropertyDetails = createAsyncThunk(
  "property/getPropertyDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/view-property-listing/${id}`, {
        withCredentials: true,
      });

      const { message, data } = response.data;
      return { message, data }; // { action: "added" | "removed", data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch property details"
      );
    }
  }
);

// ✅ get comparable properties
export const getComparableProperties = createAsyncThunk(
  "property/getComparableProperties",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/comparable-listing/${id}`, {
        withCredentials: true,
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch property details"
      );
    }
  }
);

export const listProperty = createAsyncThunk(
  "property/listProperty",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("user/upload-property", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to list a property"
      );
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyDetail: {}, //property details object
    comparableProperties: [], //array of property objects
    items: [], // array of property objects
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET property details
      .addCase(getPropertyDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyDetail = action.payload.data;
      })
      .addCase(getPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET comparable property details
      .addCase(getComparableProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComparableProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.comparableProperties = action.payload.data;
      })
      .addCase(getComparableProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(listProperty.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listProperty.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(listProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
