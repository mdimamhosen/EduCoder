"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules"; // Correct module imports
import Course_Card from "./Course/Course_Card";
import axios from "axios";

const CourseSliderForHomePage = () => {
  const [Courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(`/api/all-courses`);
        if (response.data.success) {
          setCourses(response.data.data);
        } else {
          console.error("Failed to fetch course data", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching courses", error);
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-[10vh] items-center   text-gray-200">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          //   pagination={{ clickable: true }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-lg text-center my-5 lg:text-xl text-gray-300">
          No Course Found
        </p>
      )}
    </div>
  );
};

export default CourseSliderForHomePage;
