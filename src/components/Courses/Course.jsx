import React from "react";

const Course = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-2 rounded-lg p-2">
        <img
          src="https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=20"
          height={400}
          width={400}
          alt=""
          className="rounded-md h-40 w-full"
        />
        <h4 className="font-bold text-sm">Lorem, ipsum dolor sit ame</h4>
      </div>
    </div>
  );
};

export default Course;
