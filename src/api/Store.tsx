import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../api/authSlice";
import blogApi from "../api/blogApi";
import themeReducer from "../api/themeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
