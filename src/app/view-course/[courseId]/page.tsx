"use client";
import { useParams } from "next/navigation";
import React from "react";

const ViewCourse = () => {
  const { courseId  } = useParams();
  return (
    <div>
      <h1>View Course</h1>
      <p>Course ID: {courseId}</p>

    </div>
  );
};

export default ViewCourse;
