import Image from "next/image";
import React from "react";
import image1 from "../../../public/Assets/Images/Logo1.svg";
import image2 from "../../../public/Assets/Images/Logo2.svg";
import image3 from "../../../public/Assets/Images/Logo3.svg";
import image4 from "../../../public/Assets/Images/Logo4.svg";

const TimeLine = [
  {
    Logo: image1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: image2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: image3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: image4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center mt-14">
        <div className="lg:w-[45%] flex flex-col ">
          {TimeLine.map((element, i) => {
            return (
              <div className="flex flex-col lg:gap-3  " key={i}>
                <div className="flex gap-6 ">
                  <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                    <Image
                      src={element.Logo}
                      alt={element.Heading}
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[18px] text-gray-700">
                      {element.Heading}
                    </h2>
                    <p className="  text-gray-500 text-sm">
                      {element.Description}
                    </p>
                  </div>
                </div>
                {i !== TimeLine.length - 1 && (
                  <div className="h-14 border-dotted  border-r border-gray-500 bg-gray-500/0 w-[26px]"></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-green-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
            {/* Section 1 */}
            <div className="flex gap-5 items-center lg:border-r border-green-700  px-7 lg:px-14">
              <h1 className="text-3xl font-bold w-[75px]">10</h1>
              <h1 className="text-gray-300 text-sm w-[75px]">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex gap-5 items-center lg:px-14 px-7">
              <h1 className="text-3xl font-bold w-[75px]">190</h1>
              <h1 className="text-gray-300 text-sm w-[75px]">
                types of courses
              </h1>
            </div>
          </div>
          <Image
            src={
              "https://images.unsplash.com/photo-1542744173-b3cd6377db95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="timelineImage"
            width={500}
            height={500}
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
