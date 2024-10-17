import React, { useEffect, useRef, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between   border-b py-2 border-gray-400">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera />
          </span>
          <p>{subSec?.title}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseSubSectionAccordion;
