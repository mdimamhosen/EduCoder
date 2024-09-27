import HighlightText from "@/components/Core/HighlightText";

import Image from "next/image";
import React from "react";
import StatsComponenet from "@/components/About/StartsComponent";
import Quote from "@/components/About/Quote";
import LearningGrid from "@/components/About/LearningGrid";

const Page = () => {
  return (
    <div className="bg-slate-800 pt-20  ">
      <section className="lg:-mb-16 -mb-6">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center font-bold">
          <header className="mx-auto text-4xl font-semibold text-gray-200 lg:w-[70%]">
            Revolutionizing E-Learning with
            <HighlightText text={"EduCoder"} />
            <p className="mx-auto mt-3 text-xs lg:text-sm font-medium text-gray-300 lg:w-[85%]">
              EduCoder is revolutionizing the way learners approach coding and
              web development. Our mission is to empower students and
              professionals with cutting-edge educational resources, hands-on
              projects, and an engaging learning experience that fosters
              real-world skills and career growth.
            </p>
          </header>
          <div className="grid w-full max-w-maxContent gap-3 grid-cols-3">
            <Image
              src="https://images.unsplash.com/photo-1607798748738-b15c40d33d57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="ProductPal Platform"
              width={700}
              height={500}
              className="object-cover w-full lg:h-[300px] h-[200px]  "
            />
            <Image
              src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2121&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Innovative Technology"
              width={700}
              height={500}
              className="object-cover w-full lg:h-[300px] h-[200px]  "
            />
            <Image
              src="https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Seamless Shopping Experience"
              width={700}
              height={500}
              className="object-cover w-full lg:h-[300px] h-[200px]  "
            />
          </div>
          {/* <div className="sm:h-[70px] lg:h-[150px]"></div> */}
        </div>
      </section>

      <section className="border-b border-gray-900 bg-[#0A111D]">
        <div className="mx-auto flex w-full text-balance max-w-maxContent flex-col justify-between gap-10 text-gray-300">
          <div className="lg:h-[50px] h-[25px] "></div>
          <Quote />
        </div>
      </section>
      <section className=" bg-[#0A111D]">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-gray-500">
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-gray-300 lg:w-[95%]">
                EduCoder was founded with a singular purpose: to revolutionize
                how learners approach coding and web development. Our journey
                began with a group of passionate educators, developers, and
                innovators who saw the need for a more accessible, interactive,
                and hands-on approach to learning in today’s fast-paced tech
                landscape.
              </p>
              <p className="text-base font-medium text-gray-300 lg:w-[95%]">
                We experienced the challenges of traditional education firsthand
                and were driven by the belief that learning should evolve. Our
                goal is to create an educational platform that empowers students
                and professionals to acquire real-world skills through engaging
                projects and resources tailored to modern demands.
              </p>
            </div>

            <div className="lg:w-[50%] ">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="EduCoder Learning"
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                width={700}
                height={500}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 my-6 lg:my-0 lg:gap-10 lg:flex-row justify-between">
            <div className="lg:my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-gray-300 lg:w-[95%]">
                At EduCoder, our vision is to redefine education through a
                hands-on, project-driven approach. We are committed to building
                a platform that combines advanced technology, expert guidance,
                and a supportive learning community to help learners succeed in
                a rapidly evolving digital world.
              </p>
            </div>
            <div className="lg:my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                Our Mission
              </h1>
              <p className="text-base font-medium text-gray-300 lg:w-[95%]">
                Our mission is to empower learners by providing cutting-edge
                resources, real-world projects, and a collaborative environment
                that fosters skill development and professional growth. Through
                EduCoder, we aim to cultivate a vibrant community where
                students, educators, and industry professionals come together to
                share knowledge and innovate the future of learning.
              </p>
            </div>
          </div>
        </div>
      </section>
      <StatsComponenet />
      <div className=" bg-[#0A111D] pt-4">
        <section className="mx-auto    mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
          <LearningGrid />
        </section>
      </div>
    </div>
  );
};

export default Page;
