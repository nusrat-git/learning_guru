import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthState,
  emailPasswordSignUp,
  logOut,
  popUpSignIn,
  signIn,
  updateUserProfile,
} from "../thunks/authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
    toggle: false,
  },
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(popUpSignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(popUpSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(popUpSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(emailPasswordSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(emailPasswordSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(emailPasswordSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.displayName = action.payload.name;
          state.user.photoURL = action.payload.photo;
        }
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export const { setToggle } = authSlice.actions;

export default authSlice.reducer;
