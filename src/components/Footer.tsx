"use client";
import Link from "next/link";
import React from "react";

import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink } from "../../public/FooterLinks";
import { usePathname } from "next/navigation";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms of Service"];
const Resources = [
  "Course Categories",
  "Latest Courses",
  "Popular Courses",
  "Course Reviews",
  "FAQs",
  "Help Center",
  "Enrollment Info",
  "Refunds & Exchanges",
];
const Plans = ["Membership Plans", "Student Discounts", "Loyalty Program"];
const Community = ["Student Forums", "Course Reviews", "Events & Promotions"];

const Footer = () => {
  const pathname = usePathname();
  const isAuthPage =
    pathname.includes("login") ||
    pathname.includes("register") ||
    pathname.includes("dashboard");
  if (isAuthPage) return null;
  return (
    <div className="bg-[#161D29] ">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-gray-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-gray-700">
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-gray-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-gray-300 font-semibold text-2xl lg:text-4xl hover:scale-105 transition-all duration-300 ease-linear">
                EduCoder
              </h1>
              <div className="flex flex-col gap-2">
                {["About Us", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-gray-300 transition-all duration-200"
                    >
                      <Link
                        className="pointer-events-none"
                        href={ele.split(" ").join("-").toLowerCase()}
                      >
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-lg">
                <FaFacebook className="cursor-pointer hover:scale-105 hover:text-blue-500 transition-all ease-linear duration-300" />
                <FaGoogle className="cursor-pointer hover:scale-105 hover:text-orange-500 transition-all ease-linear duration-300" />
                <FaTwitter className="cursor-pointer hover:scale-105 hover:text-blue-500 transition-all ease-linear duration-300" />
                <FaYoutube className="cursor-pointer hover:scale-105 hover:text-red-500 transition-all ease-linear duration-300" />
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-gray-300 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer ease-linear hover:text-gray-200 transition-all duration-200"
                    >
                      <Link
                        className="pointer-events-none"
                        href={ele.split(" ").join("-").toLowerCase()}
                      >
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-gray-300 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-gray-200 transition-all duration-200 mt-2">
                <Link className="pointer-events-none" href={"/help-center"}>
                  Help Center
                </Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%]  mb-7 lg:pl-0">
              <div>
                <h1 className="text-gray-300 font-semibold text-[16px]">
                  Plans
                </h1>

                <div className="flex flex-col gap-2 mt-2">
                  {Plans.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-gray-200 ease-linear transition-all duration-200"
                      >
                        <Link
                          className="pointer-events-none"
                          href={ele.split(" ").join("-").toLowerCase()}
                        >
                          {ele}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h1 className="text-gray-300 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-gray-200 transition-all duration-200"
                    >
                      <Link
                        className="pointer-events-none"
                        href={ele.split(" ").join("-").toLowerCase()}
                      >
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5  gap-2 lg:gap-3">
            {FooterLink.map((ele: any, i: any) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-gray-300 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-gray-200 transition-all duration-200"
                        >
                          <Link
                            className="pointer-events-none"
                            href={link.link}
                          >
                            {link.title}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-gray-400 mx-auto  pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-gray-700 cursor-pointer hover:text-gray-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link
                    className="pointer-events-none"
                    href={ele.split(" ").join("-").toLowerCase()}
                  >
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            EduCoder © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
