import React from "react";
import Carousel from "../Courses/Carousel";
import Reviews from "../Review/Reviews";
import Courses from "../Courses/Courses";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Carousel />
      <div className="my-20">
        <Courses title={"Explore our courses"} limit={4} />
        <div className=" w-fit mx-auto">
          <Link to="/courses">
            <button className="font-bold flex mx-auto my-5 text-white">
              Explore
            </button>
          </Link>
        </div>
      </div>
      {/* <Reviews /> */}
    </div>
  );
};

export default Home;
