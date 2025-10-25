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

//--- LIST A PROPERTY ----
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

//--- ADMIN LIST A PROPERTY ----
export const adminListProperty = createAsyncThunk(
  "property/adminListProperty",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("admin/upload-property", formData, {
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

// ✅ get all approved listed properties
export const getAllProperties = createAsyncThunk(
  "property/getAllProperties",
  async ({ status, page }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/view-all-property-listing", {
        withCredentials: true,
        params: {
          status,
          page,
        },
      });

      const { count, pagination, data } = response.data;
      return { status, count, pagination, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch property details"
      );
    }
  }
);

//--- APPROVE PROPERTY LISTING ---
export const approvePropertyListing = createAsyncThunk(
  "property/approvePropertyListing",
  async ({ status, id }, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `/admin/update-property-listing/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

      const { message, data } = response.data;
      return { message, data };
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "failed to approve property"
      );
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyDetail: {}, //property details object
    comparableProperties: [], //array of property objects
    available: {
      items: [],
      count: 0,
      loading: false,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    },
    sold: {
      items: [],
      count: 0,
      loading: false,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    },
    pending: {
      items: [],
      count: 0,
      loading: false,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalResults: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    },
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

      //--- List a Property ----
      .addCase(listProperty.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(listProperty.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(listProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //--- Admin List a Property ----
      .addCase(adminListProperty.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(adminListProperty.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(adminListProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //--- GET ALL PROPERTIES ----
      .addCase(getAllProperties.pending, (state, action) => {
        const { status } = action.meta.arg; // ✅ Correct destructure
        if (state[status]) state[status].loading = true;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        const { status, data, count, pagination } = action.payload;
        if (state[status]) {
          state[status].loading = false;
          state[status].items = data;
          state[status].count = count;
          state[status].pagination = pagination;
        }
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        const { status } = action.meta.arg;
        if (state[status]) state[status].loading = false;
        state.error = action.payload;
      })

      //--- APPROVE PROPERTY LISTING ----
      .addCase(approvePropertyListing.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(approvePropertyListing.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(approvePropertyListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
