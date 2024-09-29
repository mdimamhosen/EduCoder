import React from "react";

const Tab = ({
  tabData,
  field,
  setField,
}: {
  tabData: any;
  field: any;
  setField: any;
}) => {
  return (
    <div>
      <div
        style={{
          boxShadow: "inset 0px -2px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="flex bg-gray-950 p-2 gap-x-1 my-6 rounded-full max-w-max"
      >
        {tabData.map((tab: any) => (
          <button
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`${
              field === tab.type
                ? "bg-gray-400 text-gray-700"
                : "bg-transparent text-gray-400 hover:text-gray-300 transition-all duration-300 ease-linear"
            } py-2 px-5 rounded-full transition-all duration-200`}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tab;
