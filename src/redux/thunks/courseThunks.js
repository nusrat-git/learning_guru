import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, push, get, update } from "firebase/database";
import app from "../../firebase/firebaseConfig";

const db = getDatabase(app);

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
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
