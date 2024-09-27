import React from "react";

const HighlightText = ({ text }: { text: string }) => {
  return (
    <span className="bg-gradient-to-b from-[#f8c829] via-[#40adc9] to-[#02da5c] text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
