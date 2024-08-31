import React, { useEffect } from "react";
import { fetchCourses } from "../../store/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Course from "./Course";
import { FaSpinner } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.courses);

  const active = true;

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="mx-56">
      <h3 className="font-bold text-center text-2xl py-5">
        Welcome to your dashboard
      </h3>
      <div className="bg-gray-600 mt-6 rounded-md flex gap-6 p-3">
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            active
              ? "font-bold bg-gray-50 text-blue-800 py-2 px-4 rounded-md"
              : "fontsemibold"
          }`}
        >
          <FaSpinner />
          {""}In Progress
        </div>
        <div className="flex items-center gap-2 cursor-pointer font-semibold">
          <FaRegHeart />
          {""}Liked
        </div>
        <div className="flex items-center gap-2 cursor-pointer font-semibold">
          <IoCheckmarkDone />
          {""}Completed
        </div>
      </div>
      <div>
        <div>
          {entities.length > 0 ? (
            <div className="my-10">
              <div className="grid grid-cols-1 gap-10">
                {entities.map((course, i) => (
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
