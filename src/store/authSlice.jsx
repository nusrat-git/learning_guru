import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebaseConfig";

// Initialize Firebase Auth
const auth = getAuth(app);

// Async thunk for Google popup sign-in
export const popUpSignIn = createAsyncThunk(
  "auth/popUpSignIn",
  async (googleProvider) => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  }
);

// Async thunk for email/password sign-up
export const emailPasswordSignUp = createAsyncThunk(
  "auth/emailPasswordSignUp",
  async ({ email, password }) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  }
);

// Async thunk for email/password sign-in
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ name, photo = null }) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    return { name, photo };
  }
);

// Async thunk for signing out
export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
  return null;
});

// Async thunk for checking auth state on app load
export const checkAuthState = createAsyncThunk("auth/checkAuthState", () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (currentUser) => {
      resolve(currentUser || null);
    });
  });
});

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
