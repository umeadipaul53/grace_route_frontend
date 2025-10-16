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

const messageSlice = createSlice({
  name: "message",
  initialState: {
    returnMessage: null, // message
    loading: false,
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

      // Schedule tour
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
      });
  },
});

export default messageSlice.reducer;
