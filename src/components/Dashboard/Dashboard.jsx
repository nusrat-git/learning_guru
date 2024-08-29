import React from "react";
import Course from "../Courses/Course";

const Dashboard = () => {
  return (
    <div>
      <div className="mx-20">
        <h3 className="font-bold text-center text-2xl py-5">
          Welcome to your dashboard
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <Course />
          <Course />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
