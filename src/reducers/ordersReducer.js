import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ fetch user but orders
export const userBuyOrders = createAsyncThunk(
  "orders/userBuyOrders",
  async ({ status, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/view-user-buy-orders", {
        withCredentials: true,
        params: {
          status,
          page,
          limit,
          sort: "-createdAt", // or user-selected sort order
        },
      });

      const { count, pagination, data } = response.data;
      return { count, pagination, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user order"
      );
    }
  }
);

// ✅ fetch user property listing
export const userPropertyListing = createAsyncThunk(
  "orders/userPropertyListing",
  async ({ status, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/view-my-property-listing", {
        withCredentials: true,
        params: {
          status,
          page,
          limit,
          sort: "-createdAt", // or user-selected sort order
        },
      });

      const { count, pagination, data } = response.data;
      return { count, pagination, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user order"
      );
    }
  }
);

// ✅ fetch all buy orders
export const fetchAllBuyOrders = createAsyncThunk(
  "orders/fetchAllBuyOrders",
  async ({ status, page }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/view-buy-order", {
        withCredentials: true,
        params: {
          status,
          page,
        },
      });

      const { count, pagination, data } = response.data;
      return { count, pagination, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch buy order"
      );
    }
  }
);

//--- SETTLE BUY ORDERS ---
export const settleBuyOrders = createAsyncThunk(
  "orders/settleBuyOrders",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await API.post(
        `/admin/settle-buy-order/${orderId}`,
        {},
        { withCredentials: true }
      );

      const { message, data } = response.data;
      return { message, data };
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "failed to settle buy order"
      );
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // array of property objects
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
      // GET USERS ORDERS
      .addCase(userBuyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(userBuyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
        state.count = action.payload.count || 0;
      })
      .addCase(userBuyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET USERS PROPERTY LISTING
      .addCase(userPropertyListing.pending, (state) => {
        state.loading = true;
      })
      .addCase(userPropertyListing.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
        state.count = action.payload.count || 0;
      })
      .addCase(userPropertyListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //--- GET ALL BUY ORDERS ----
      .addCase(fetchAllBuyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBuyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
        state.count = action.payload.count || 0;
      })
      .addCase(fetchAllBuyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //--- SETTLE BUY ORDERS ----
      .addCase(settleBuyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(settleBuyOrders.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(settleBuyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
