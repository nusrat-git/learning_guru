import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoursesByEmail,
  updateStudentCourseStatus,
} from "../../redux/thunks/courseThunks";
import toast from "react-hot-toast";

const Course = ({ course }) => {
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const courseId = course?.key;
  const studentId = course?.studentKey;
  const email = user?.email;

  function getFormattedEndDate(enrollmentDateStr, courseDurationStr) {
    const enrollmentDate = new Date(enrollmentDateStr);
    const numberOfWeeks = parseInt(courseDurationStr.split(" ")[0], 10);
    const courseDurationInDays = numberOfWeeks * 7;

    const endDate = new Date(enrollmentDate);
    endDate.setDate(enrollmentDate.getDate() + courseDurationInDays);

    const options = { day: "numeric", month: "long", year: "numeric" };
    return endDate.toLocaleDateString("en-GB", options);
  }

  const handleComplete = () => {
    dispatch(updateStudentCourseStatus({ courseId, studentId, email }))
      .unwrap()
      .then((response) => {
        dispatch(fetchCoursesByEmail({ email }));
        if (!loading) {
          toast.success("Course Completed");
        }
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  return (
    <div className="grid grid-cols-4 gap-8 bg-slate-400 rounded-md p-5">
      <img src={course.thumbnail} alt="" className="rounded-xl col-span-1" />
      <div className="col-span-3">
        <div className="flex items-center justify-between">
          <h1 className="font-bold mb-3 tracking-tight leading-none text-2xl text-white">
            {course.name}
          </h1>
          <button onClick={handleComplete}>Complete</button>
        </div>
        <p className="mb-2 font-light text-gray-200 md:text-lg">
          <span className="font-semibold">Instructor:</span> {course.instructor}
        </p>
        <p className="mb-2 font-light text-gray-200 md:text-lg">
          <span className="font-semibold">Due date:</span>{" "}
          {getFormattedEndDate(course?.enrollDate, course?.duration)}
        </p>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-300">
              Completed
            </span>
            <span className="text-sm font-medium text-blue-300">45%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-300 h-2.5 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
