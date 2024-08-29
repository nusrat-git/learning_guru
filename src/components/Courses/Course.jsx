import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  console.log(course);
  return (
    <div className="text-center">
      <div className="slide relative">
        <img src={course.thumbnail} alt="" className="w-full h-auto" />
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center h-full">
          <div className="text-white text-lg font-bold px-4 py-2 bg-black opacity-55 rounded-md">
            {course.name} <br />
          </div>
          <div className="bg-black opacity-55 mt-2 px-4 py-1">
            by {course.instructor}
          </div>
          <Link to="/details">
            <button className="bg-black text-white px-4 py-2 mt-2 rounded-md font-bold text-sm">
              View Details
            </button>
          </Link>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2 rounded-lg p-2">
        <img
          src={course.thumbnail}
          height={400}
          width={400}
          alt=""
          className="rounded-md h-40 w-full"
        />
        <h4 className="font-bold text-sm">{course.name}</h4>
      </div> */}
    </div>
  );
};

export default Course;
