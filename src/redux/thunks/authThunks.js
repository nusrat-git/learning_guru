import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebaseConfig";

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
