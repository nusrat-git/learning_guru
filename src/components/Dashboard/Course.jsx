import React from "react";

const Course = ({ course }) => {
  return (
    <div className="grid grid-cols-4 gap-8 bg-slate-400 rounded-md p-5">
      <img src={course.thumbnail} alt="" className="rounded-xl col-span-1" />
      <div className="col-span-3">
        <h1 className="font-bold mb-3 tracking-tight leading-none text-2xl text-white">
          {course.name}
        </h1>
        <p className="mb-2 font-light text-gray-200 md:text-lg">
          <span className="font-semibold">Instructor:</span> {course.instructor}
        </p>
        <p className="mb-2 font-light text-gray-200 md:text-lg">
          <span className="font-semibold">Due:</span> 4 weeks
        </p>
        <div>
          <div class="flex justify-between mb-1">
            <span class="text-base font-medium text-blue-300">Completed</span>
            <span class="text-sm font-medium text-blue-300">45%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
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
