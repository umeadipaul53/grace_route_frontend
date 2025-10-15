import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ Toggle favourite (server request)
export const toggleFavourite = createAsyncThunk(
  "favourites/toggleFavourite",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/user/toggle-favourite",
        { propertyId },
        { withCredentials: true }
      );
      return response.data; // { action: "added" | "removed", data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle favourite"
      );
    }
  }
);

// ✅ Get all favourites
export const getFavourites = createAsyncThunk(
  "favourites/getFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/get-favourites", {
        withCredentials: true,
      });
      return response.data.data; // array of property objects
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load favourites"
      );
    }
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    items: [], // array of property objects
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // TOGGLE
      .addCase(toggleFavourite.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        state.loading = false;
        const { action: toggleAction, data } = action.payload;

        // ✅ The backend now returns `data` = updated property array
        state.items = data || [];
      })
      .addCase(toggleFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET
      .addCase(getFavourites.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favouritesSlice.reducer;
