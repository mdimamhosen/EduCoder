import React from "react";

const CourseCardForCategory = ({ course }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h3 className="text-xl font-semibold">{course.title}</h3>
      <p className="text-gray-700 mt-2">{course.description}</p>
      <div className="mt-4">
        <span className="text-gray-500">Price:</span>
        <span className="font-bold text-lg ml-2">${course.price}</span>
      </div>
    </div>
  );
};

export default CourseCardForCategory;
