// // reducers/propertyReducer.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../api/api";

// // Example async thunk to fetch properties
// export const searchProperty = createAsyncThunk(
//   "property/searchProperty",
//   async (filters, { rejectWithValue }) => {
//     try {
//       const response = await API.get("/property/search", {
//         params: filters,
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to fetch properties";
//       return rejectWithValue(message);
//     }
//   }
// );

// const propertySlice = createSlice({
//   name: "property",
//   initialState: {
//     propertyData: [],
//     pagination: {},
//     filters: {
//       selectedLocation: "",
//       homeType: "",
//       propertyType: "",
//       priceRange: { min: 0, max: 100000000 },
//     },
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setFilters: (state, action) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },
//     clearFilters: (state) => {
//       state.filters = {
//         selectedLocation: "",
//         homeType: "",
//         propertyType: "",
//         priceRange: { min: 0, max: 100000000 },
//       };
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(searchProperty.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(searchProperty.fulfilled, (state, action) => {
//         state.loading = false;
//         state.propertyData = action.payload.properties || [];
//         state.pagination = action.payload.pagination || {};
//       })
//       .addCase(searchProperty.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setFilters, clearFilters } = propertySlice.actions;
// export default propertySlice.reducer;

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import userReducer from "../reducers/userReducer";
// import favouritesReducer from "../reducers/favouriteReducer";
// import propertyReducer from "../reducers/propertyReducer";
// import storage from "redux-persist/lib/storage";
// import { persistStore, persistReducer } from "redux-persist";

// // ✅ persist only filters inside property
// const propertyPersistConfig = {
//   key: "property",
//   storage,
//   whitelist: ["filters"], // only persist filters, not entire propertyData
// };

// const rootReducer = combineReducers({
//   user: userReducer,
//   favourites: favouritesReducer,
//   property: persistReducer(propertyPersistConfig, propertyReducer),
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user", "favourites"], // main slices
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);
