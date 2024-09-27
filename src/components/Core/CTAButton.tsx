import Link from "next/link";
import React from "react";

const CTAButton = ({
  children,
  active,
  linkto,
}: {
  children: React.ReactNode;
  active: boolean;
  linkto: string;
  className?: string;
}) => {
  return (
    <Link href={linkto}>
      <div
        className={`text-center text-sm md:text-base md:px-4 px-2 py-2  md:py-2 sm:px-6 sm:py-3 rounded-md font-bold shadow-md ${
          active ? "bg-yellow-300 text-black " : "bg-gray-800  text-gray-200"
        } hover:shadow-none hover:scale-95 transition-all duration-300  flex justify-center items-center gap-1 w-fit`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
