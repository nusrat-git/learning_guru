import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set, push, get, update } from "firebase/database";
import app from "../../firebase/firebaseConfig";

const db = getDatabase(app);

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (limit = null) => {
    const dbRef = ref(db, "learningGuru/courses");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      // Convert the data to an array of courses with their keys
      const coursesArray = Object.entries(data).map(([key, value]) => ({
        key,
        ...value,
      }));

      const sortedCourses = coursesArray.sort(
        (a, b) => (b.likers?.length || 0) - (a.likers?.length || 0)
      );

      if (limit) {
        return sortedCourses.slice(0, limit);
      }

      return sortedCourses;
    } else {
      return [];
    }
  }
);

// fetch courses by user email
export const fetchCoursesByEmail = createAsyncThunk(
  "courses/fetchCoursesByEmail",
  async ({ email, filterParam = "in_progress" }) => {
    const dbRef = ref(db, "learningGuru/courses");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const courses = Object.entries(data).map(([key, value]) => ({
        key,
        ...value,
      }));

      const coursesByEmail = courses
        .filter((course) => {
          if (filterParam === "liked") {
            return true;
          }

          const studentsArray = Object.values(course?.students || {});
          return studentsArray.some((student) => student.email === email);
        })
        .map((course) => {
          const studentsArray = Object.entries(course?.students || {});
          const [studentKey, student] = studentsArray.find(
            ([, student]) => student.email === email
          ) || [null, {}];

          const { students, ...rest } = course;
          const completeStatus = student?.status || null;

          return { ...rest, completeStatus, studentKey };
        })
        .filter((course) => {
          if (filterParam === "liked") {
            return course.likers?.includes(email);
          } else if (filterParam === "completed") {
            return course.completeStatus === "Completed";
          }

          return course.completeStatus !== "Completed";
        });

      return { coursesByEmail, active: filterParam };
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
  async ({ courseId, studentId, email }, { rejectWithValue }) => {
    const studentRef = ref(
      db,
      `learningGuru/courses/${courseId}/students/${studentId}`
    );

    try {
      await update(studentRef, {
        status: "Completed",
      });

      return { courseId, email, status: "Completed" };
    } catch (error) {
      console.error("Error updating student course status: ", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// send student data based on course id
export const handleStudentEnroll = createAsyncThunk(
  "courses/handleStudentEnroll",
  async ({ courseId, data }, { rejectWithValue }) => {
    const newData = {
      ...data,
      status: "In progress",
      enrollDate: new Date().toISOString(),
    };

    try {
      const courseRef = ref(db, `learningGuru/courses/${courseId}/students`);

      const snapshot = await get(courseRef);
      const currentStudents = snapshot.exists() ? snapshot.val() : [];

      const studentsArray = Object.values(currentStudents);
      const studentAlreadyEnrolled = studentsArray.some(
        (student) => student.email === data.email
      );

      if (studentAlreadyEnrolled) {
        return rejectWithValue("Student is already enrolled in this course.");
      }

      const newDocRef = push(courseRef);
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

      return { courseId, likers };
    } catch (error) {
      console.error("Like handling failed: " + error.message);
      return rejectWithValue(error.message);
    }
  }
);
