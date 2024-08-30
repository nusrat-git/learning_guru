import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/checkAuthState/fulfilled",
          "auth/signIn/fulfilled",
        ],
        ignoredPaths: ["auth.user"],
      },
    }),
});

export default store;
