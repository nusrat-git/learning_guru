import React, { useEffect } from "react";
import Course from "./Course";
import {
  fetchCourses,
  handleCourseLike,
} from "../../redux/thunks/courseThunks";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Courses = ({ title, limit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, loading, searchQuery } = useSelector(
    (state) => state.courses
  );
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Filter courses based on searchQuery in both course name and instructor name
  const filteredCourses = courses?.filter(
    (course) =>
      course?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course?.instructor?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // limit how many courses to display
  const displayedCourses = limit
    ? filteredCourses.slice(0, limit && limit)
    : filteredCourses;

  const handleLike = (like, courseId) => {
    if (!user) {
      toast.error("You need to be logged in to like a course.");
      navigate("/login");
      return;
    }

    dispatch(handleCourseLike({ courseId, email, like }))
      .unwrap()
      .then(() => {
        toast.success(like ? "Course liked!" : "Course unliked!");
      })
      .catch((error) => {
        console.error("Like failed:", error);
        toast.error("Like failed: " + error);
      });
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div>
      <div className="mx-20">
        {displayedCourses?.length > 0 ? (
          <div>
            <h3 className="font-bold text-center text-2xl py-5">{title}</h3>
            <div className="grid grid-cols-3 gap-6">
              {displayedCourses?.map((course, i) => (
                <Course
                  course={course}
                  key={i}
                  email={email}
                  handleLike={handleLike}
                />
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
