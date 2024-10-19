"use client";
import InstructorChart from "@/components/Dashboard/InstructorChart";
import { RootState } from "@/redux/reducer";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { data: session, status } = useSession();
  const token = session?.user;
  const { user } = useSelector((state: RootState) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    if (!token?._id) return; // Ensure token is available before making requests

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch instructor data
        const formData = new FormData();
        formData.append("userId", token._id);
        const instructorApiData = await axios.post("/api/user", {
          userId: token._id,
        });
        // Fetch courses data
        const result = await axios.post("/api/courses", formData);
        console.log(instructorApiData.data.data);
        console.log(result.data.data);

        // Calculate total amount and students

        // Set state based on API responses

        setInstructorData(instructorApiData.data.data);
        setCourses(result.data.data || []);
        setTotalAmount(totalIncome);
        setTotalStudents(totalEnrollments);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  const totalIncome = 0;
  const totalEnrollments = 0;

  console.log(instructorData);
  console.log(courses);
  console.log(totalAmount);
  console.log(totalStudents);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)] text-gray-300">
        <p>Loading...</p>
      </div>
    );

  return (
    <div>
      <div className="my-7">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-200">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-gray-400">Let's start something new</p>
        </div>
        {!loading && courses.length > 0 ? (
          <div>
            <div className="my-4 flex h-[450px] space-x-4">
              {/* Render chart / graph */}
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex-1 rounded-md bg-gray-800 p-6">
                  <p className="text-2xl font-bold text-gray-300">Visualize</p>
                  <p className="mt-4 text-xl font-medium text-gray-400">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}

              {/* Statistics section */}
              <div className="flex min-w-[250px] flex-col rounded-md bg-gray-800 p-6">
                <p className="text-4xl  font-bold text-gray-100">Statistics</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className=" text-2xl text-gray-300">Total Courses</p>
                    <p className="text-lg font-semibold text-gray-400">
                      {courses.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl  text-gray-300">Total Students</p>
                    <p className="text-lg font-semibold text-gray-400">
                      {totalStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl text-gray-300">Total Income</p>
                    <p className="text-lg font-semibold text-gray-400">
                      USD. {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses section */}
            <div className="rounded-md bg-gray-800 p-6">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-gray-100">Your Courses</p>
                <Link href="/dashboard/my-courses">
                  <p className="text-lg font-semibold text-yellow-400">
                    View All
                  </p>
                </Link>
              </div>
              <div className="my-4 flex items-start space-x-6">
                {courses.slice(0, 3).map((course) => (
                  <div key={course._id} className="w-1/3  ">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[201px] w-full rounded-md object-cover"
                    />
                    <div className="mt-3 w-full">
                      <p className="text-lg font-medium text-gray-50">
                        {course.courseName}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <p className="text-xs font-medium text-gray-300">
                          {course.studentsEnrolled.length} students
                        </p>
                        <p className="text-xs font-medium text-gray-300">|</p>
                        <p className="text-xs font-medium text-gray-300">
                          USD. {course.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-gray-800 p-6 py-20">
            <p className="text-center text-2xl font-bold text-gray-300">
              You have not created any courses yet
            </p>
            <Link href="/dashboard/add-course">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-400">
                Create a course
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
