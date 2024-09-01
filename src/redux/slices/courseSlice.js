import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCourseDetails,
  fetchCourses,
  fetchCoursesByEmail,
  handleCourseLike,
  handleStudentEnroll,
  updateStudentCourseStatus,
} from "../thunks/courseThunks";

export const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    coursesByEmail: [],
    courseId: null,
    courseDetails: null,
    loading: true,
    searchQuery: "",
    syllabusToggle: false,
    preToggle: false,
    activeDashboard: "in_progress",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload;
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
        const newcourses = action.payload;
        const existingIds = new Set(state.courses.map((course) => course.id));
        state.courses = [
          ...state.courses,
          ...newcourses.filter((course) => !existingIds.has(course.id)),
        ];
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchCoursesByEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoursesByEmail.fulfilled, (state, action) => {
        state.loading = false;
        const { coursesByEmail, active } = action.payload;
        state.coursesByEmail = coursesByEmail;
        state.activeDashboard = active;
      })
      .addCase(fetchCoursesByEmail.rejected, (state) => {
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
        const course = state.courses.find((course) => course.id === courseId);
        if (course) {
          course.students = [...(course.students || []), data];
        }
      })
      .addCase(handleStudentEnroll.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateStudentCourseStatus.pending, (state) => {
        state.loading = false;
      })
      .addCase(updateStudentCourseStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { courseId, email, status } = action.payload;
        const course = state?.courses?.find(
          (course) => course?.key === courseId
        );
        if (course) {
          const student = course?.students?.find(
            (student) => student.email === email
          );
          if (student) {
            student.status = status;
          }
        }
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
        const { courseId, likers } = action.payload;
        const course = state.courses.find((course) => course?.key === courseId);
        if (course) {
          course.likers = likers;
        }
      })
      .addCase(handleCourseLike.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSearchQuery,
  setCourseId,
  syllabusToggleDropdown,
  preToggleDropdown,
} = courseSlice.actions;

export default courseSlice.reducer;
