import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import usersReducer from "../reducers/usersReducer";
import favouritesReducer from "../reducers/favouriteReducer";
import propertyReducer from "../reducers/propertyReducer";
import messageReducer from "../reducers/messageReducer";
import ordersReducer from "../reducers/ordersReducer";
import newsReducer from "../reducers/newsReducer";
import estateReducer from "../reducers/estateReducer";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  favourites: favouritesReducer,
  property: propertyReducer,
  message: messageReducer,
  orders: ordersReducer,
  news: newsReducer,
  estate: estateReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], //persist login state % profile image
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
