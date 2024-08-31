import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentCourseStatus } from "../../redux/thunks/courseThunks";
import toast from "react-hot-toast";

const Course = ({ course }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function getKeyByEmail(students, targetEmail) {
    for (let key in students) {
      if (students[key].email === targetEmail) {
        return key;
      }
    }
    return null;
  }

  const courseId = course?.key;
  const studentId = getKeyByEmail(course?.students, user?.email);

  const handleComplete = () => {
    dispatch(updateStudentCourseStatus({ courseId, studentId }))
      .unwrap()
      .then((response) => {
        toast.success("Course Completed");
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
          <span className="font-semibold">Due:</span> 4 weeks
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
