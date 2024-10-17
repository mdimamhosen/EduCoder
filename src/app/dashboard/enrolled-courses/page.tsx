"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";
import { FiEye } from "react-icons/fi";

// Helper function to generate random durations
const generateRandomDurations = () => {
  const durations = [];
  for (let i = 0; i < 30; i++) {
    const hours = Math.floor(Math.random() * 10) + 1; // Random hours between 1 and 10
    const minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
    durations.push(`${hours}h ${minutes}m`);
  }
  return durations;
};

const EnrolledCourses = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?._id;
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [randomDurations, setRandomDurations] = useState([]);
  const router = useRouter();

  const getEnrolledCourses = async () => {
    try {
      const res = await axios.post(`/api/enrolled-courses`, {
        userId: userId,
      });

      // Set enrolled courses from the response correctly
      console.log(res.data.data.courses); // Verify the structure of courses in response
      setEnrolledCourses(res.data.data.courses || []); // Ensure it sets to an empty array if no courses
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getEnrolledCourses();
    }
  }, [userId]);

  // Generate random durations on component mount
  useEffect(() => {
    setRandomDurations(generateRandomDurations());
  }, []);

  return (
    <>
      <div className="text-3xl text-gray-100 my-7">Enrolled Courses</div>
      {status === "loading" || !enrolledCourses ? (
        <div className="  min-h-[calc(100vh-3.5rem)] bg-gray-800 text-gray-300 flex justify-center items-center">
          Loading...
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-gray-300">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8   ">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-gray-700 text-gray-200 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex bg-gray-800 items-center border border-gray-600 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={course._id}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  router.push(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <Image
                  width={56}
                  height={56}
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold flex justify-center items-center">
                    {course.courseName}

                    <FiEye className="inline-block ml-2 text-gray-300" />
                  </p>
                  <p className="text-xs text-gray-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">
                {randomDurations[i % randomDurations.length] || "N/A"}
              </div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course?.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course?.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EnrolledCourses;
