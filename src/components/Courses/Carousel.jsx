import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCourses } from "../../redux/thunks/courseThunks";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";

export default function Carousel() {
  function prev() {
    document.getElementById("slider-container").scrollLeft -= 270;
  }

  function next() {
    document.getElementById("slider-container").scrollLeft += 270;
  }

  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const displayedCourses = courses.slice(0, 10);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div>
      <h3 className="font-bold text-center text-2xl py-5">
        Our top 10 courses of the week
      </h3>
      <div
        id="slider-container"
        className="slider relative mx-5 md:mx-12 lg:mx-20"
      >
        {displayedCourses.map((item, index) => (
          <div className="slide relative" key={index}>
            <img
              src={item.thumbnail}
              alt=""
              className="w-10 md:w-full md:h-auto"
            />
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-full">
              <div className="absolute bottom-16 right-5 lg:bottom-14 lg:right-4 text-white text-lg font-bold px-4 py-2 bg-black opacity-55 rounded-md">
                {item.name}
              </div>

              <Link to={`/courses/${item.key}`}>
                <button className="absolute bottom-6 right-5 lg:bottom-4 lg:right-4 bg-black text-white px-4 py-2 rounded-md font-bold text-sm">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-72 flex justify-between w-screen px-2 md:pr-4">
        <div onClick={prev} className="text-6xl cursor-pointer">
          <IoMdArrowDropleftCircle />
        </div>
        <div onClick={next} className="text-6xl cursor-pointer">
          <IoMdArrowDroprightCircle />
        </div>
      </div>
    </div>
  );
}
