import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center flex-1 min-h-screen text-white bg-black">
      {/* Main Content Wrapper */}
      <div className="flex flex-col items-center gap-8 p-8 rounded-lg  shadow-lg max-w-[500px] w-full mx-4 md:mx-0">
        {/* Error Message */}
        <h1 className="text-4xl font-bold text-center md:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="text-sm text-center text-gray-400 md:text-base">
          Oops! It seems like the page you&rsquo;re looking for doesn&rsquo;t
          exist. But don&rsquo;t worry, you can explore more about{" "}
          <span className="font-bold text-white">EduCoder</span>, our
          interactive learning platform for future coders and developers!
        </p>

        {/* Platform Info */}
        <div className="bg-[#333] p-4 rounded-md">
          <h2 className="text-lg font-semibold">About EduCoder</h2>
          <p className="text-sm text-gray-300 mt-2">
            EduCoder is an EdTech platform designed to help students learn
            coding interactively with hands-on projects, quizzes, and real-time
            feedback from experienced instructors. Start your learning journey
            today!
          </p>
        </div>

        {/* Personal Info */}
        <div className="bg-[#444] p-4 rounded-md">
          <h2 className="text-lg font-semibold">About the Developer</h2>
          <p className="text-sm text-gray-300 mt-2">
            Hi, I&rsquo;m{" "}
            <span className="font-bold text-white">Md Imam Hosen</span>, a
            passionate Frontend Developer with expertise in React, Next.js, and
            Tailwind CSS. Let&rsquo;s build the future of EdTech together!
          </p>
        </div>

        {/* Button */}
        <Link href="/" passHref>
          <button className="text-black bg-white py-3 px-6 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition-all duration-300">
            <FaArrowLeft className="my-1" />
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
