import React from "react";
import CTAButton from "../Core/CTAButton";

const LearningGridArray = [
  {
    order: -1,
    heading: "Innovative Learning Solutions for",
    highliteText: "Every Student, Every Goal",
    description:
      "EduCoder partners with leading educators to offer personalized, user-friendly, and secure learning solutions for students and professionals globally.",
    BtnText: "Explore Courses",
    BtnLink: "/courses",
  },
  {
    order: 1,
    heading: "Tailored Learning Paths",
    description:
      "Save time and enhance your learning experience! EduCoder offers personalized learning paths designed to meet diverse educational needs, ensuring you learn at your own pace.",
  },
  {
    order: 2,
    heading: "Our Teaching Approach",
    description:
      "EduCoder leverages the latest in educational technology to provide a seamless, interactive, and engaging learning experience for all users.",
  },
  {
    order: 3,
    heading: "Secure and Private Learning Environment",
    description:
      "At EduCoder, we prioritize your privacy and security. Our platform ensures the highest level of security for your personal data and learning progress.",
  },
  {
    order: 4,
    heading: "Real-Time Progress Tracking",
    description:
      "EduCoder offers real-time progress tracking and analytics, empowering students to stay informed and motivated throughout their learning journey.",
  },
  {
    order: 5,
    heading: "24/7 Learning Support",
    description:
      "Our dedicated support team is available 24/7 to assist you with any questions or challenges, ensuring you have a smooth learning experience at all times.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-12 pb-8">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
              card.order % 2 === 1
                ? "bg-gray-700 h-[294px]"
                : card.order % 2 === 0
                ? "bg-gray-800 h-[294px]"
                : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                <div className="lg:text-4xl text-2xl text-gray-200 font-semibold ">
                  {card.heading}
                  {/* <HighlightText text={card.heading} /> */}
                </div>
                <p className="text-gray-400 font-medium text-sm">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-gray-200 font-semibold text-lg">
                  {card.heading}
                </h1>

                <p className="text-gray-400 font-medium text-sm ">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
