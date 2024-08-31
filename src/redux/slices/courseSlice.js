import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCourseDetails,
  fetchCourseLikers,
  fetchCourses,
  handleCourseLike,
  handleStudentEnroll,
  updateStudentCourseStatus,
} from "../thunks/courseThunks";

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
