import React from "react";
import HighlightText from "../Core/HighlightText";

const Quote = () => {
  return (
    <div className="text-lg md:text-3xl font-semibold mx-auto py-5 pb-20 text-center text-gray-200">
      We are dedicated to transforming the way you learn and grow in the field
      of coding and web development. Our innovative platform{" "}
      <HighlightText text={"merges technology"} />,{" "}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        {" "}
        creativity
      </span>
      , and community to deliver an
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
        {" "}
        exceptional learning experience.
      </span>
    </div>
  );
};

export default Quote;
