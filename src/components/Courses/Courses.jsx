import React, { useEffect } from "react";
import Course from "./Course";
import { fetchCourses } from "../../store/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import app from "../../firebase/firebaseConfig";
import { getDatabase, push, ref, set } from "firebase/database";

const Courses = ({ title }) => {
  const dispatch = useDispatch();
  const { entities, loading, searchQuery } = useSelector(
    (state) => state.courses
  );

  // Filter courses based on searchQuery in both course name and instructor name
  const filteredCourses = entities.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div>
      <div className="mx-20">
        {filteredCourses.length > 0 ? (
          <div>
            <h3 className="font-bold text-center text-2xl py-5">{title}</h3>
            <div className="grid grid-cols-3 gap-6">
              {filteredCourses.map((course, i) => (
                <Course course={course} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <h3 className="font-bold text-center text-2xl py-5">
            No courses found
          </h3>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Courses;
