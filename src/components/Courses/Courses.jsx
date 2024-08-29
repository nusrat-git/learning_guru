import React, { useEffect } from "react";
import Course from "./Course";
import { fetchCourses } from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";

const Courses = ({ title }) => {
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div>
      <div className="mx-20">
        {loading ? (
          <h4 className="text-center my-20">"loading..."</h4>
        ) : entities.length > 0 ? (
          <div>
            <h3 className="font-bold text-center text-2xl py-5">{title}</h3>
            <div className="grid grid-cols-3 gap-2">
              {entities.map((course, i) => (
                <Course course={course} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <h3 className="font-bold text-center text-2xl py-5">
            No courses available
          </h3>
        )}
      </div>
    </div>
  );
};

export default Courses;
