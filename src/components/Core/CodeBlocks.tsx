"use client";
import React from "react";
import CTAButton from "./CTAButton";

import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  codeblock,
  ctabtn2,
  backgroundGradient,
  codeColor,
}: {
  position: string;
  heading: React.ReactNode;
  subheading: string;
  ctabtn1: {
    btnText: string;
    link: string;
    active: boolean;
  };
  ctabtn2: {
    btnText: string;
    link: string;
    active: boolean;
  };
  backgroundGradient: React.ReactNode;
  codeColor: string;
  codeblock: string;
}) => {
  return (
    <div
      className={`flex ${position} my-10 justify-between flex-col lg:flex-row lg:gap-10 gap-6`}
    >
      {/* Section 1 */}
      <div className="w-full   lg:w-1/2 flex flex-col gap-4 lg:gap-8">
        {heading}
        <div className="text-gray-400 text-xs md:text-sm sm:text-base font-bold w-full lg:w-4/5 -mt-2 sm:-mt-3">
          {subheading}
        </div>
        {/* Button Group */}
        <div className="flex gap-4 sm:gap-7 mt-3 sm:mt-7">
          <CTAButton active={ctabtn1?.active} linkto={ctabtn1?.link}>
            <div className="flex items-center gap-2">
              {ctabtn1?.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2?.active} linkto={ctabtn2?.link}>
            {ctabtn2?.btnText}
          </CTAButton>
        </div>
      </div>
      {/* Section 2 */}
      <div className="w-full lg:w-[470px] h-fit code-border flex flex-col  text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative">
        {backgroundGradient}
        <div className="flex w-full border border-pure-greys-300  ">
          <div className="w-[10%] select-none text-center text-gray-700 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>
          {/* Codes */}
          <div
            className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor}   `}
          >
            <TypeAnimation
              sequence={[codeblock, 1000, ""]}
              cursor={true}
              repeat={Infinity}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
