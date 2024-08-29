import React from "react";
import Course from "./Course";
import { Link } from "react-router-dom";

const Courses = ({ title }) => {
  return (
    <div>
      <div className="mx-20">
        <h3 className="font-bold text-center text-2xl py-5">{title}</h3>
        <div className="grid grid-cols-5 gap-2">
          <Course />
          <Course />
          <Course />
          <Course />
          <Course />
          <Course />
          <Course />
          <Course />
        </div>
      </div>
    </div>
  );
};

export default Courses;
