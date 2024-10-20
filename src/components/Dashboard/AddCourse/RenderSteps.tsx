"use client";

import React from "react";

import { RootState } from "@/redux/reducer";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformationForm";
import CourseBuilderForm from "./CourseBuilderForm";
import PublishCourse from "./PublishCourse";

export default function RenderSteps() {
  const { step } = useSelector((state: RootState) => state.course);

  // let step = 3;
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="relative mb-2  flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div className="flex flex-col items-center " key={item.id}>
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-gray-400 bg-gray-700 text-gray-300"
                    : "border-gray-600 bg-gray-800 text-gray-300"
                } ${step > item.id && "bg-yellow-400 text-gray-900"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-gray-400" />
                ) : (
                  item.id
                )}
              </button>{" "}
              *
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[10%] sm:w-[20%] md:w-[33%]  border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-400" : "border-gray-600"
                  } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-16   flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex md:min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              <p
                className={`text-sm ${
                  step >= item.id ? "text-gray-300" : "text-gray-400"
                }`}
              >
                {item.title}
              </p>
            </div>
          </>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
