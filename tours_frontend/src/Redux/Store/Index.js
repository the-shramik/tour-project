import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slice/UserSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check globally
    }),
});

export default store;
