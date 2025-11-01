import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ Get all news
export const getNews = createAsyncThunk(
  "news/getNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/view-all-news", {
        withCredentials: true,
      });
      return response.data.data; // array of news objects
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load news"
      );
    }
  }
);

// ✅ Get all news FOR ADMIN
export const getNewsAdmin = createAsyncThunk(
  "news/getNewsAdmin",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await API.get("/admin/view-news", {
        withCredentials: true,
        params: {
          page,
        },
      });
      const { pagination, data } = response.data;
      return { pagination, data }; // array of news objects
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load news"
      );
    }
  }
);

//--- CREATE NEWS ----
export const createNews = createAsyncThunk(
  "news/createNews",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("admin/create-news", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "failed to create a news"
      );
    }
  }
);

//--- DELETE NEWS ---
export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(
        `/admin/delete-news/${id}`,
        {},
        { withCredentials: true }
      );

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete news"
      );
    }
  }
);

// ✅ get single news details
export const getSingleNews = createAsyncThunk(
  "news/getSingleNews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/view-one-news/${id}`, {
        withCredentials: true,
      });

      const { message, data } = response.data;
      return { message, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch news details"
      );
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    items: [], // array of news objects
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    },
    news: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL NEWS
      .addCase(getNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL ADMIN NEWS
      .addCase(getNewsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(getNewsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //--- CREATE A NEWS ----
      .addCase(createNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- DELETE NEWS---
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SINGLE NEWS DETAILS
      .addCase(getSingleNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload.data || {};
      })
      .addCase(getSingleNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
