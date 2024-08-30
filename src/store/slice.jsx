import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from "../../.firebase/firebaseConfig";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "learningGuru/courses");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  }
);

export const courseSlice = createSlice({
  name: "courses",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        const newEntities = action.payload;
        const existingIds = new Set(state.entities.map((course) => course.id));
        state.entities = [
          ...state.entities,
          ...newEntities.filter((course) => !existingIds.has(course.id)),
        ];
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const { addToTodos, editTodos, removeFromTodos, changeTodoStatus } =
//   courseSlice.actions;

export default courseSlice.reducer;
