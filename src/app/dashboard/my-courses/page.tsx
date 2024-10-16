"use client";

import CoursesTable from "@/components/Dashboard/CoursesTable ";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";

const MyCourses = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?._id;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("userId", userId);
        const response = await axios.post("/api/courses", formData);
        console.log("response from my courses:", response);

        if (response.data.success && response.data.data.length > 0) {
          setCourses(response.data.data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch courses. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  console.log("courses", courses);

  return (
    <div>
      <div className="my-7 flex items-center justify-between">
        <h1 className=" text-lg md:text-2xl lg:text-3xl font-medium text-gray-300">
          My Courses
        </h1>
        <button
          className={`border border-yellow-400 text-sm   bg-yellow-400 cursor-pointer rounded-md flex justify-center items-center font-semibold text-gray-900 hover:shadow-none hover:scale-95 transition-all duration-300 ease-linear px-2 py-1 md:px-4 md:py-2`}
          onClick={() => router.push("/dashboard/add-course")}
        >
          Add Course
          <VscAdd className="ml-2 text-gray-900" />
        </button>
      </div>

      {loading || status === "loading" ? (
        <div
          className="text-center min-h-[calc(100vh-3.5rem)] w-full
          flex justify-center items-center text-gray-400"
        >
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div
          className="text-center min-h-[calc(100vh-3.5rem)] w-full
          flex justify-center items-center text-red-400"
        >
          <p>{error}</p>
        </div>
      ) : (
        <>
          <CoursesTable
            courses={courses}
            setCourses={setCourses}
            courseLoading={loading}
          />
        </>
      )}
    </div>
  );
};

export default MyCourses;
