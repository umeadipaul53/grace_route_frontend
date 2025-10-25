import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ get Property Details
export const secheduleTour = createAsyncThunk(
  "message/secheduleTour",
  async (credentials, { rejectWithValue, getState }) => {
    try {
      const { user } = getState().user;
      let endpoint = "";
      let payload = {};

      if (user) {
        endpoint = "/user/request-tour";
        // Logged-in users only need property, date, time
        payload = {
          property: credentials.property,
          date: credentials.date,
          time: credentials.time,
        };
      } else {
        endpoint = "/auth/request-tour";
        // Guests must send all fields
        payload = credentials;
      }

      const response = await API.post(endpoint, payload, {
        withCredentials: true,
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to schedule tour"
      );
    }
  }
);

//--Send Contact Message ---
export const sendContactMessage = createAsyncThunk(
  "message/sendContactMessage",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/contact-us", credentials, {
        withCredentials: true,
      });

      const { message } = response.data;
      return { message };
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

//--Send Contact Message ---
export const sendAdminMessage = createAsyncThunk(
  "message/sendAdminMessage",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/admin/send-email", credentials, {
        withCredentials: true,
      });

      const { message } = response.data;
      return { message };
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

//--- FETCH ALL TOUR REQUESTS
export const getAllTourRequests = createAsyncThunk(
  "message/getAllTourRequests",
  async ({ status, page }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/view-all-tour-request", {
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
        error.response?.data?.message || "Failed to fetch tour requests"
      );
    }
  }
);

//--- SETTLE TOUR REQUEST ---
export const settleTourRequest = createAsyncThunk(
  "message/settleTourRequest",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `/admin/settle-tour-request/${id}`,
        {},
        { withCredentials: true }
      );

      const { message } = response.data;
      return { message }; // { action: "added" | "removed", data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle favourite"
      );
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    returnMessage: null, // message
    loading: false,
    items: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    },
    count: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Schedule tour
      .addCase(secheduleTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(secheduleTour.fulfilled, (state, action) => {
        state.loading = false;
        state.returnMessage = action.payload.message;
      })
      .addCase(secheduleTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Contact Message
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.returnMessage = action.payload.message;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Admin Message
      .addCase(sendAdminMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendAdminMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.returnMessage = action.payload.message;
      })
      .addCase(sendAdminMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //--- GET TOUR REQUESTS ---
      .addCase(getAllTourRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTourRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
        state.count = action.payload.count;
      })
      .addCase(getAllTourRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- SETTLE TOURS---
      .addCase(settleTourRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(settleTourRequest.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(settleTourRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messageSlice.reducer;
