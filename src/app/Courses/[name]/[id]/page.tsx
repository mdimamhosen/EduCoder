"use client";

import Course_Card from "@/components/Course/Course_Card";
import CourseSlider from "@/components/Course/CourseSlider";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CatalogPage = () => {
  const { name, id } = useParams();
  const catalogName = name;

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState([]);
  const [catalogPageDataTopCourse, setCatalogPageDataTopCourse] = useState([]);

  const getCourseWithCategory = async () => {
    try {
      const response = await axios.post(`/api/course-with-category`, {
        id: id,
      });

      if (response.data.success) {
        const allCourses = response.data.data;

        // Filter courses where studentsEnrolled is greater than 0
        const topCourses = allCourses.filter(
          (course) => course.studentsEnrolled.length > 0
        );

        // Filter courses where studentsEnrolled is empty or 0
        const otherCourses = allCourses.filter(
          (course) => course.studentsEnrolled.length === 0
        );

        setCatalogPageData(otherCourses);
        setCatalogPageDataTopCourse(topCourses);
        setCategory(response.data.category);
      } else {
        console.error("Failed to fetch course data", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCourseWithCategory();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex justify-center items-center bg-slate-800 text-gray-200">
        <div>Loading...</div>
      </div>
    );
  }

  // if (!catalogPageData.length && !catalogPageDataTopCourse.length) {
  //   return (
  //     <div className="grid min-h-[calc(100vh-3.5rem)] bg-slate-800 place-items-center">
  //       <p className="text-xl text-gray-300">No Data Found</p>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-950">
      {/* Hero Section */}
      <div className="box-content bg-gray-800 px-4 mx-auto">
        <div className="mx-auto flex min-h-[260px] flex-col justify-center gap-4 py-16 w-11/12 max-w-maxContent">
          <p className="text-lg text-gray-50">
            {`Home / Catalog / `}
            <span className="text-yellow-400">{name}</span>
          </p>
          <p className="text-3xl text-gray-400">{name}</p>
          <p className="max-w-[870px] text-gray-400">
            {!loading && category?.description}
          </p>
        </div>
      </div>

      {/* Section 1: Other Courses */}
      <div className="mx-auto box-content px-4 py-16 w-11/12 max-w-maxContent">
        <div className="text-gray-50 text-4xl font-bold">
          Courses to get you started
        </div>
        <div className="my-4 flex border-b border-b-gray-500 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-400 text-yellow-400"
                : "text-gray-300"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Our Courses
          </p>
        </div>
        <div>
          <CourseSlider Courses={catalogPageData} />
        </div>
      </div>

      {/* Section 2: Top Courses */}
      <div className="mx-auto box-content px-4 py-16 w-11/12 max-w-maxContent">
        <div className="text-gray-50 text-4xl font-bold">
          Our Top Selling Courses in {name}
        </div>
        <div className="my-4 flex border-b border-b-gray-500 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-400 text-yellow-400"
                : "text-gray-300"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Top Courses
          </p>
        </div>
        {catalogPageDataTopCourse.length > 0 && (
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Top courses in {name}</div>
            <div className="py-8">
              <CourseSlider Courses={catalogPageDataTopCourse} />
            </div>
          </div>
        )}
        {catalogPageDataTopCourse.length === 0 && (
          <div>
            <p className="text-xl text-gray-300">
              No Top Courses Found on {name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
