import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({
  cardData,
  currentCard,
  setCurrentCard,
}: {
  cardData: any;
  currentCard: any;
  setCurrentCard: any;
}) => {
  return (
    <div
      className={` lg:w-[30%] ${
        currentCard === cardData?.heading
          ? "bg-slate-50 shadow-[12px_12px_0_0] shadow-yellow-400"
          : "bg-gray-800"
      }  text-gray-500 h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-gray-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            currentCard === cardData?.heading && "text-gray-800"
          } font-semibold text-[20px] text-gray-300`}
        >
          {cardData?.heading}
        </div>

        <div
          className={`${
            currentCard === cardData?.heading
              ? "text-gray-600"
              : "text-gray-400"
          }`}
        >
          {cardData?.description}
        </div>
      </div>

      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-500" : "text-gray-300"
        } px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
