"use client";
import React, { useState } from "react";
import HighlightText from "./HighlightText";

import CourseCard from "./CourseCard";
import { HomePageExplore } from "@/data/homepage-explore";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourse] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value: string) => {
    setCurrentTab(value);
    const filteredCourse = HomePageExplore.filter(
      (course) => course.tag === value
    );
    setCourse(filteredCourse[0].courses);
    setCurrentCard(filteredCourse[0].courses[0].heading);
  };

  return (
    <div className=" w-11/12 max-w-maxContent  mx-auto">
      {/* Explore more section */}
      <div>
        <div className="text-3xl md:text-4xl font-semibold text-center my-4 lg:my-8">
          Unlock the
          <HighlightText text={"Power of Code"} />
          <p className="text-center text-gray-500 text-lg font-semibold mt-1">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="lg:my-5 my-3 overflow-x-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center  gap-2 md:gap-5 justify-center bg-gray-800 text-gray-700 px-6 py-4 lg:rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]   lg:w-[80%] xl:w-[65%] mx-auto">
        {tabsName.map((ele, index) => (
          <div
            key={index}
            className={`cursor-pointer text-center text-xm md:text-sm  flex items-center py-2 px-2 lg:px-3 lg:rounded-full justify-center hover:bg-gray-700 hover:text-gray-100 transition-all ease-linear duration-300 ${
              currentTab === ele ? "bg-gray-950 text-gray-50 " : "text-gray-200"
            }`}
            onClick={() => setMyCards(ele)}
          >
            <h1>{ele}</h1>
          </div>
        ))}
      </div>
      <div className="hidden md:block lg:h-[50px]"></div>

      {/* Courses Section */}
      <div className="    lg:-mt-2 gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full   text-black lg:mb-0 mb-7 lg:px-0">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
      <div className="hidden md:block lg:h-[50px]"></div>
    </div>
  );
};

export default ExploreMore;
