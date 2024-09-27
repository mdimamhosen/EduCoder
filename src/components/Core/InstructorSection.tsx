import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const InstructorSection = () => {
  return (
    <div className="bg-[#000814]">
      <div className="w-11/12 mx-auto max-w-maxContent py-20">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-[50%]">
            <Image
              src={
                "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt=""
              width={500}
              height={500}
              className="shadow-gray-200 shadow-[-10px_-10px_0_0]"
            />
          </div>
          <div className="lg:w-[50%] flex gap-10 flex-col">
            <h1 className="lg:w-[50%] text-4xl font-semibold text-gray-200">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-[16px] text-justify w-[90%] text-gray-300">
              Instructors from around the world teach millions of students on
              EduCoder. We provide the tools and skills to teach what you love.
            </p>

            <div className="w-fit">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
