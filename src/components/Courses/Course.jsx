import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Course = ({ course, handleLike, email }) => {
  const liked = course.likers && course.likers.includes(email);
  const likesCount = course.likers?.length || 0;

  return (
    <div className="text-center">
      <div className="relative">
        <img src={course.thumbnail} alt="" className="w-full rounded-xl h-72" />
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center h-full">
          <div className=" max-w-72 text-white text-lg font-bold px-4 py-2 bg-black opacity-55 rounded-md">
            {course.name} <br />
          </div>
          <div className="bg-black opacity-55 mt-2 px-4 py-1">
            by {course.instructor}
          </div>
          <Link to={`/courses/${course.key}`}>
            <button className="bg-black relative z-10 text-white px-4 py-2 mt-2 rounded-md font-bold text-sm">
              View Details
            </button>
          </Link>
          <div className="absolute -top-2 left-0 right-1 md:top-0 md:right-0 flex items-center justify-center h-full">
            {liked ? (
              <div className="flex items-center gap-2 absolute bottom-4 right-4 text-xl ">
                <FaHeart
                  className="cursor-pointer text-red-500"
                  type="button"
                  onClick={() => handleLike(false, course?.key, course)}
                />
                {likesCount}
              </div>
            ) : (
              <div className="flex items-center gap-2 absolute bottom-4 right-4 text-xl ">
                <FaRegHeart
                  className="cursor-pointer text-red-500"
                  type="button"
                  onClick={() => handleLike(true, course?.key, course)}
                />
                {likesCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
