import React, { useEffect } from "react";
import { fetchCoursesByEmail } from "../../redux/thunks/courseThunks";
import { useDispatch, useSelector } from "react-redux";
import Course from "./Course";
import { FaSpinner } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { coursesByEmail, activeDashboard, loading } = useSelector(
    (state) => state.courses
  );
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;

  useEffect(() => {
    dispatch(fetchCoursesByEmail({ email }));
  }, [dispatch, email]);

  return (
    <div className="mx-56">
      <h3 className="font-bold text-center text-2xl py-5">
        Welcome to your dashboard
      </h3>
      <div className="bg-gray-600 mt-6 rounded-md flex gap-6 p-3">
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            activeDashboard === "in_progress"
              ? "font-bold bg-gray-50 text-blue-800 py-2 px-4 rounded-md"
              : "fontsemibold"
          }`}
          onClick={() => {
            dispatch(fetchCoursesByEmail({ email }));
          }}
        >
          <FaSpinner />
          {""}In Progress
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            activeDashboard === "liked"
              ? "font-bold bg-gray-50 text-blue-800 py-2 px-4 rounded-md"
              : "fontsemibold"
          }`}
          type="button"
          onClick={() => {
            dispatch(fetchCoursesByEmail({ email, filterParam: "liked" }));
          }}
        >
          <FaRegHeart />
          {""}Liked
        </div>
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            activeDashboard === "completed"
              ? "font-bold bg-gray-50 text-blue-800 py-2 px-4 rounded-md"
              : "fontsemibold"
          }`}
          type="button"
          onClick={() => {
            dispatch(fetchCoursesByEmail({ email, filterParam: "completed" }));
          }}
        >
          <IoCheckmarkDone />
          {""}Completed
        </div>
      </div>
      <div>
        <div>
          {loading ? (
            <div className="text-center mt-5">Loading...</div>
          ) : coursesByEmail.length > 0 ? (
            <div className="my-10">
              <div className="grid grid-cols-1 gap-10">
                {coursesByEmail.map((course, i) => (
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
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Dashboard;
