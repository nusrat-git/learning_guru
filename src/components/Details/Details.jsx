import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchCourseDetails,
  preToggleDropdown,
  syllabusToggleDropdown,
} from "../../store/slice";
import Dropdown from "./Dropdown";

const Details = () => {
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const { courseDetails, loading, syllabusToggle, preToggle } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(fetchCourseDetails(courseId));
  }, [dispatch, courseId]);

  const handleSyllabusDropdown = () => {
    dispatch(syllabusToggleDropdown());
  };

  const handlePreDropdown = () => {
    dispatch(preToggleDropdown());
  };

  if (loading || !courseDetails) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div>
      <section className="">
        <div className="grid px-4 mx-20 gap-12 py-16 grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-6">
            <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-5xl">
              {courseDetails.name}
            </h1>
            <p className="max-w-2xl mb-6 font-semibold text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              By {courseDetails.instructor}
            </p>
            <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-7 md:text-xl">
              {courseDetails.description}
            </p>
            <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-3 md:text-lg">
              <span className="font-semibold">Schedule:</span>{" "}
              {courseDetails.schedule}
            </p>
            <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-3 md:text-lg"></p>
            <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-3 md:text-lg">
              <span className="font-semibold">Duration:</span>{" "}
              {courseDetails.duration}
            </p>
            <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-3 md:text-lg">
              <span className="font-semibold">Location:</span>{" "}
              {courseDetails.location}
            </p>
            <div className="grid grid-cols-2 gap-5 mb-5">
              <Dropdown
                dropdownData={courseDetails.syllabus}
                title={"Syllabus"}
                toggle={syllabusToggle}
                handleDropdown={handleSyllabusDropdown}
              />
              <Dropdown
                dropdownData={courseDetails.prerequisites}
                title={"Pre-requisites"}
                toggle={preToggle}
                handleDropdown={handlePreDropdown}
              />
            </div>

            {courseDetails.enrollmentStatus === "Open" ? (
              <Link
                to={`/enroll/${courseId}`}
                className="inline-flex items-center justify-center hover:px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-gray-300 focus:ring-4 underline hover:no-underline"
              >
                Registration is Open, Enroll Now
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            ) : (
              <div className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                {courseDetails.enrollmentStatus === "Closed"
                  ? "Registration is closed"
                  : courseDetails.enrollmentStatus}
              </div>
            )}
          </div>
          <div className="col-span-6">
            <img
              src={courseDetails.thumbnail}
              alt="mockup"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
