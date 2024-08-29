import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./slice";

const store = configureStore({ reducer: { courses: courseReducer } });

export default store;
