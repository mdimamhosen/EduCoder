import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules"; // Ensure correct module imports
import Course_Card from "./Course_Card";
import { useParams } from "next/navigation";
// import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {
  const { name, id } = useParams();
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]} // Use imported modules here
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              {/* Replace with your Course_Card component */}
              <Course_Card course={course} Height={"h-[250px]"} />
              <div className="course-card">Course {i + 1}</div>{" "}
              {/* Placeholder */}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className=" text-lg lg:text-xl text-gray-300">
          No Course Found on {name}
        </p>
      )}
    </>
  );
};

export default CourseSlider;
