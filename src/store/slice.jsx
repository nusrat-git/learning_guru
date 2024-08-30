import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from "../firebase/firebaseConfig";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "learningGuru/courses");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([key, value]) => ({ key, ...value }));
    } else {
      return [];
    }
  }
);

// Fetch course details based on id
export const fetchCourseDetails = createAsyncThunk(
  "courses/fetchCourseDetails",
  async (courseId) => {
    const db = getDatabase(app);
    const dbRef = ref(db, `learningGuru/courses/${courseId}`);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }
);

export const courseSlice = createSlice({
  name: "courses",
  initialState: {
    entities: [],
    courseDetails: null,
    loading: true,
    searchQuery: "",
    syllabusToggle: false,
    preToggle: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    syllabusToggleDropdown: (state) => {
      state.syllabusToggle = !state.syllabusToggle;
    },
    preToggleDropdown: (state) => {
      state.preToggle = !state.preToggle;
    },
  },
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
      })
      .addCase(fetchCourseDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.courseDetails = action.payload;
      })
      .addCase(fetchCourseDetails.rejected, (state) => {
        state.loading = false;
        state.courseDetails = null;
      });
  },
});

export const { setSearchQuery, syllabusToggleDropdown, preToggleDropdown } =
  courseSlice.actions;

export default courseSlice.reducer;
