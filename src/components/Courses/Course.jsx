import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { handleCourseLike } from "../../redux/thunks/courseThunks";
import toast from "react-hot-toast";

const Course = ({ course }) => {
  const { key } = course;
  const { user } = useSelector((state) => state.auth);

  const courseId = key;
  const email = user && user.email;

  let liked = course.likers && course.likers.includes(email);
  let likesCount = course.likesCount || course.likers?.length || 0;

  const dispatch = useDispatch();

  const handleLike = (like) => {
    if (!user) {
      toast.info("You need to be logged in to like a course.");
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
          <Link to={`/courses/${course.key}`}>
            <button className="bg-black relative z-10 text-white px-4 py-2 mt-2 rounded-md font-bold text-sm">
              View Details
            </button>
          </Link>
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-full">
            {liked ? (
              <div className="flex items-center gap-2 absolute bottom-4 right-4 text-xl ">
                <FaHeart
                  className="cursor-pointer text-red-500"
                  type="button"
                  onClick={() => handleLike(false)}
                />
                {likesCount}
              </div>
            ) : (
              <div className="flex items-center gap-2 absolute bottom-4 right-4 text-xl ">
                <FaRegHeart
                  className="cursor-pointer text-red-500"
                  type="button"
                  onClick={() => handleLike(true)}
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
