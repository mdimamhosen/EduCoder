import React from "react";

const Stats = [
  { count: "10K+", label: "Students Enrolled" },
  { count: "500+", label: "Courses Offered" },
  { count: "200K+", label: "Assignments Completed" },
  { count: "100+", label: "Instructors Available" },
];

const StatsComponent = () => {
  return (
    <div className="  py-10">
      {/* Stats */}
      <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-gray-200 mx-auto">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
          {Stats.map((data, index) => {
            return (
              <div
                className="flex flex-col py-6 border-b md:border-b-0"
                key={index}
              >
                <h1 className="text-[24px] md:text-[30px] font-bold  ">
                  {data.count}
                </h1>
                <h2 className="font-semibold text-[14px] md:text-[16px]  ">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
