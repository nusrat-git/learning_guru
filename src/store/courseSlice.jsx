import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, set, push, get, update } from "firebase/database";
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
      const data = snapshot.val();
      return data;
    } else {
      return null;
    }
  }
);

// Update student course status based on id
export const updateStudentCourseStatus = createAsyncThunk(
  "courses/updateStudentCourseStatus",
  async ({ courseId, studentId }, { rejectWithValue }) => {
    const db = getDatabase(app);
    const studentRef = ref(
      db,
      `learningGuru/courses/${courseId}/students/${studentId}`
    );

    try {
      await update(studentRef, {
        status: "Completed",
      });

      return { courseId, studentId, status: "Completed" };
    } catch (error) {
      console.error("Error updating student course status: ", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const handleStudentEnroll = createAsyncThunk(
  "courses/handleStudentEnroll",
  async ({ courseId, data }, { rejectWithValue }) => {
    const db = getDatabase(app);

    const newData = {
      ...data,
      status: "In progress",
      enrollDate: new Date().toISOString(),
    };

    try {
      const newDocRef = push(
        ref(db, `learningGuru/courses/${courseId}/students`)
      );

      await set(newDocRef, newData);

      return { courseId, newData };
    } catch (error) {
      console.error("Enrollment failed: " + error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Handle course like
export const handleCourseLike = createAsyncThunk(
  "courses/handleCourseLike",
  async ({ courseId, email, like }, { rejectWithValue }) => {
    const db = getDatabase(app);

    console.log(courseId, email, like);

    try {
      const courseLikesRef = ref(db, `learningGuru/courses/${courseId}/likers`);

      const snapshot = await get(courseLikesRef);
      let likers = snapshot.exists() ? snapshot.val() : [];

      if (like) {
        if (!likers.includes(email)) {
          likers.push(email);
        } else {
          console.error("You have already liked this course.");
          return rejectWithValue("You have already liked this course.");
        }
      } else {
        if (likers.includes(email)) {
          likers = likers.filter((likerEmail) => likerEmail !== email);
        } else {
          console.error("Cannot unlike a course you haven't liked.");
          return rejectWithValue("Cannot unlike a course you haven't liked.");
        }
      }

      await set(courseLikesRef, likers);

      return { courseId, likers, likesCount: likers.length };
    } catch (error) {
      console.error("Like handling failed: " + error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCourseLikers = createAsyncThunk(
  "courses/fetchCourseLikers",
  async (courseId, { rejectWithValue }) => {
    const db = getDatabase(app);
    const courseLikesRef = ref(db, `learningGuru/courses/${courseId}/likers`);

    try {
      const snapshot = await get(courseLikesRef);
      const likers = snapshot.exists() ? snapshot.val() : [];
      return { courseId, likers };
    } catch (error) {
      console.error("Fetching likers failed: " + error.message);
      return rejectWithValue(error.message);
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
      })
      .addCase(handleStudentEnroll.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleStudentEnroll.fulfilled, (state, action) => {
        state.loading = false;
        const { courseId, data } = action.payload;
        const course = state.entities.find((course) => course.id === courseId);
        if (course) {
          course.students = [...(course.students || []), data];
        }
      })
      .addCase(handleStudentEnroll.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateStudentCourseStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudentCourseStatus.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(updateStudentCourseStatus.rejected, (state, action) => {
        state.loading = false;
        console.error("Error updating student course status:", action.payload);
      })
      .addCase(handleCourseLike.pending, (state) => {
        state.loading = false;
      })
      .addCase(handleCourseLike.fulfilled, (state, action) => {
        state.loading = false;
        const { courseId, likers, likesCount } = action.payload;
        const course = state.entities.find((course) => course.id === courseId);
        if (course) {
          course.likers = likers;
          course.likesCount = likesCount; // Update the likes count
        }
      })
      .addCase(handleCourseLike.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchCourseLikers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseLikers.fulfilled, (state, action) => {
        state.loading = false;
        const { courseId, likers } = action.payload;
        const course = state.entities.find((course) => course.id === courseId);
        if (course) {
          course.likers = likers;
          course.likersCount = likers.length;
        }
      })
      .addCase(fetchCourseLikers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSearchQuery, syllabusToggleDropdown, preToggleDropdown } =
  courseSlice.actions;

export default courseSlice.reducer;
