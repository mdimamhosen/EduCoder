import Link from "next/link";
import React from "react";
import HighlightText from "./Core/HighlightText";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Core/CTAButton";
import CodeBlocks from "./Core/CodeBlocks";
import ExploreMore from "./Core/ExploreMore";
import CompanyShowCase from "./CompanyShowCase";
import CourseSliderForHomePage from "./CourseSliderForHomePage";

const Banner = () => {
  return (
    <div className="bg-[#0A111D]   text-gray-200">
      <div className="relative  mx-auto flex  flex-col items-center justify-between gap-6   w-11/12 max-w-maxContent">
        <Link href={"/register"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-gray-800 p-1 font-bold text-gray-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all ease-linear duration-400  hover:drop-shadow-lg hover:bg-gray-900">
            <div className="flex hover:scale-95 flex-row items-center gap-2 rounded-full px-6 py-2  ease-linear  transition-all duration-400 group-hover:bg-black group-hover:text-white md:px-6 md:py-3 ">
              <p className="text-sm md:text-base lg:text-lg">
                Become an Instructor
              </p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        {/* Heading */}
        <div className="text-center  text-4xl font-semibold md:text-3xl lg:text-4xl">
          <span className="text-gray-200">Empower Your Future with</span>
          <HighlightText text={"EduCoder"} />
        </div>

        {/* Sub Heading */}
        <div className=" mx-auto w-full lg:w-11/12 text-balance text-center text-xs  font-semibold text-gray-300  md:text-sm   ">
          Our online coding courses allow you to learn at your own pace, from
          any location globally. Gain access to comprehensive resources,
          including hands-on projects, quizzes, and personalized feedback from
          experienced instructors.
        </div>
        {/* Common Buttons */}
        <div className=" mt-4 lg:mt-4 flex justify-center items-center flex-row gap-4 lg:gap-7">
          <CTAButton active={true} linkto={"/register"}>
            Learn More <FaArrowRight />
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Watch a Demo <FaArrowRight />
          </CTAButton>
        </div>

        <div className="mx-2 lg:-mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="w-full h-auto shadow-[10px_10px_rgba(245,245,245)]"
            muted
            loop
            autoPlay
            // controls
            controlsList="nodownload"
            preload="auto"
          >
            <source src={`/Assets/Video/banner.mp4`} type="video/mp4" />
          </video>
        </div>

        <div>
          <div>
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className="text-4xl font-semibold">
                  Enhance your
                  <HighlightText text={"coding skills"} /> with our expert-led
                  courses.
                </div>
              }
              subheading={
                "Our meticulously crafted courses, led by industry veterans, provide you with the tools and knowledge to excel in your coding journey."
              }
              ctabtn1={{
                btnText: "Get Started",
                link: "/register",
                active: true,
              }}
              ctabtn2={{
                btnText: "Discover More",
                link: "/learn-more",
                active: false,
              }}
              codeColor={"text-yellow-300"}
              codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>EduCoder/title>\n</head>\n<body>\n<h1><a href="/"> Welcome You</a></h1>\n<nav> <p>A Online EdTech Platform</p>\n <a href="/educoder">Learn more</a> \n</nav>\n</body>`}
              backgroundGradient={<div className="codeblock1 absolute "></div>}
            />
          </div>

          <div>
            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                  Start
                  <HighlightText text={"coding in seconds"} />
                </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you&apos;ll be writing real code from your very first lesson."
              }
              ctabtn1={{
                btnText: "Continue Lesson",
                link: "/register",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                link: "/register",
                active: false,
              }}
              codeColor={"text-gray-200"}
              codeblock={`import React from "react";\nimport {Router, Route} from "react-router-dom";\nimport Home from "./Home";\nimport About from "./About"; \nconst App = () => {\n  return (\n    <Router>\n            <Route exact path="/" component={Home} />\n        <Route path="/about" component={About} />\n          </Router>   )};\nexport default App;`}
              backgroundGradient={<div className="codeblock2 absolute "></div>}
            />
          </div>
        </div>
      </div>
      <div className="  mx-auto mb-16   w-11/12 max-w-maxContent">
        {/* course slider section */}
        <h1 className="lg:text-4xl text-xl my-10">
          Popular Courses <HighlightText text={"For You"} />
        </h1>

        <CourseSliderForHomePage />
      </div>
      <div className="border-b-8 border-red-700">
        <ExploreMore />
      </div>
      <div className="bg-white -mt-44">
        <CompanyShowCase />
      </div>
    </div>
  );
};

export default Banner;
