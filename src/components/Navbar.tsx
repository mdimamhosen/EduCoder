"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  //  const location = useLocation()
  const location = { pathname: "/" };
  return (
    <div
      className={`flex h-12 items-center justify-center border-b-[1px] border-b-gray-300 ${
        location.pathname !== "/" ? "bg-gray-200" : ""
      } transition-all duration-300`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link href="/">EduCOder</Link>
      </div>
    </div>
  );
};

export default Navbar;
