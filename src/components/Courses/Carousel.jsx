import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCourses } from "../../redux/thunks/courseThunks";

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
      <div id="slider-container" className="slider mx-20">
        {displayedCourses.map((item, index) => (
          <div className="slide relative" key={index}>
            <img src={item.thumbnail} alt="" className="w-full h-auto" />
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-full">
              <div className="absolute bottom-14 right-4 text-white text-lg font-bold px-4 py-2 bg-black opacity-55 rounded-md">
                {item.name}
              </div>

              <Link to={`/courses/${item.key}`}>
                <button className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-md font-bold text-sm">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
        <div onClick={prev} className="control-prev-btn">
          <i className="fas fa-arrow-left"></i>
        </div>
        <div onClick={next} className="control-next-btn">
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
}
