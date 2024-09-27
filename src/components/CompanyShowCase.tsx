import React from "react";
import CTAButton from "./Core/CTAButton";
import HighlightText from "./Core/HighlightText";
import { FaArrowRight } from "react-icons/fa";
import TimelineSection from "./Core/TimelineSection";

const CompanyShowCase = () => {
  return (
    <div>
      <div className=" text-gray-300 lg:pt-48">
        <div className="mx-auto  flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row gap-3 md:gap-7 text-white pt-10 pb-6  ">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-2">
                Discover Our Full Catalog
                <FaArrowRight />
              </div>
            </CTAButton>
            <CTAButton active={false} linkto={"/login"}>
              Learn More
            </CTAButton>
          </div>

          <div className="mx-auto flex flex-col space-y-4 md:flex-row justify-between    max-w-maxContent">
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold  w-[70%] lg:w-[40%] text-gray-700   ">
              Gain the Skills Needed for a{" "}
              <HighlightText text={"High-Demand Career"} />
            </div>
            <div className="     flex flex-col gap-4 text-base md:text-lg lg:text-xl text-gray-600  lg:w-[40%]">
              <p className="lg:w-full w-[91%] text-justify">
                In today&apos;s competitive job market, it&apos;s essential to
                have more than just professional expertise. Equip yourself with
                the skills that employers are looking for.
              </p>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Get Started</div>
              </CTAButton>
            </div>
          </div>

          <div className="mt-6">
            <TimelineSection />
            {/*    <LearninLanguageSection /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyShowCase;
