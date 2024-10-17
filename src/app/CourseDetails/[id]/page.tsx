"use client";
import ConfirmationModal from "@/components/Dashboard/ConfirmationModal";
import GetAvgRating from "@/utils/avgRating";
import { formattedDate } from "@/utils/dateFormatter";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";

import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
// Import the components you need
import CourseDetailsCard from "@/components/Course/CourseDetailsCard";
import CourseAccordionBar from "@/components/Course/CourseAccordionBar";
import Image from "next/image";
import RatingStars from "@/utils/RatingStars";
import { BsFillCaretRightFill } from "react-icons/bs";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const { data: session } = useSession();
  const token = session?.user;
  const { id } = useParams();
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("courseId", String(id));
        const response = await axios.post("/api/single-course", formData);
        setResponse(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (response) {
      const count = GetAvgRating(response.ratingAndReviews);
      setAvgReviewCount(count);
      let lectures = 0;
      response.courseContent.forEach((sec) => {
        lectures += sec.subSection.length || 0;
      });
      setTotalNoOfLectures(lectures);
    }
  }, [response]);

  const [isActive, setIsActive] = useState<string[]>([]);

  const handleActive = (id: string) => {
    setIsActive((prevActive) =>
      !prevActive.includes(id)
        ? [...prevActive, id]
        : prevActive.filter((e) => e !== id)
    );
  };

  const handleBuyCourse = async () => {
    if (token) {
      if (token.accountType === "Instructor") {
        setConfirmationModal({
          text1: "You are an Instructor!",
          text2: "You can't buy a course.",
          btn1Text: "Ok",
          btn2Text: "Cancel",
          btn1Handler: () => setConfirmationModal(null),
          btn2Handler: () => setConfirmationModal(null),
        });
        return;
      } else {
        const buyCourse = await axios.post("/api/buy-course", {
          courseId: id,
          userId: token._id,
        });
        if (buyCourse.data.success) {
          toast.success("Course Purchased Successfully");
        }
      }
    } else {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please log in to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => router.push("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  if (loading) {
    return (
      <div className="  min-h-[calc(100vh-3.5rem)] bg-gray-800  flex justify-center items-center text-gray-300">
        Loading...
      </div>
    );
  }

  if (!response) {
    return <div className="text-center">No course found!</div>;
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response;

  return (
    <div>
      <div>
        <div className={`relative w-full bg-gray-800`}>
          {/* Hero Section */}
          <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
            <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
              <div className="relative block max-h-[30rem] lg:hidden">
                <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                <Image
                  width={410}
                  height={230}
                  src={thumbnail}
                  alt="course thumbnail"
                  className="aspect-auto w-full "
                />
              </div>
              <div
                className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-gray-300`}
              >
                <div>
                  <p className="text-4xl font-bold text-gray-100 sm:text-[42px]">
                    {courseName}
                  </p>
                </div>
                <p className={`text-gray-400`}>{courseDescription}</p>
                <div className="text-md flex flex-wrap  items-center gap-2">
                  <span className="text-yellow-400 text-2xl">
                    {avgReviewCount}
                  </span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                  <span className="capitalize">{`(${ratingAndReviews.length} reviews)`}</span>
                  <span className="capitalize">{`${studentsEnrolled.length} students enrolled`}</span>
                </div>
                <div>
                  <p>
                    Created By:{" "}
                    <span className="text-yellow-400 font-semibold">
                      {`${instructor?.firstName || "Unknown"} ${
                        instructor?.lastName || ""
                      }`}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-5 text-lg">
                  <p className="flex items-center gap-2">
                    <BiInfoCircle /> Created at {formattedDate(createdAt)}
                  </p>
                  <p className="flex items-center gap-2">
                    <HiOutlineGlobeAlt /> English
                  </p>
                </div>
              </div>
              <div className="flex  flex-col gap-4  border-y border-y-gray-300 py-4 max-w-maxContentTab w-11/12 mx-auto lg:hidden">
                <p className="space-x-3 pb-4 text-3xl font-semibold text-gray-200">
                  USD. {price}
                </p>
                <button
                  className="text-gray-900 bg-yellow-400  py-2 rounded-md font-semibold  hover:scale-95 transition-all duration-300 ease-in-out "
                  onClick={handleBuyCourse}
                >
                  Buy Now
                </button>
                <button className="bg-gray-950 text-yellow-400  py-2 rounded-md font-semibold  hover:scale-95 transition-all duration-300 ease-in-out ">
                  Add to Cart
                </button>
              </div>
            </div>
            {/* Courses Card */}
            <div className=" right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
              <CourseDetailsCard
                course={response}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
          <div className="bg-gray-950  py-4">
            <div className="mx-auto box-content px-4 text-start text-gray-300   lg:w-[1260px]">
              <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                {/* What will you learn section */}
                <div className="my-8 border border-gray-600 p-8">
                  <p className="text-3xl font-semibold text-gray-100">
                    What you will learn
                  </p>
                  <div className="mt-5 text-sm">{whatYouWillLearn}</div>
                </div>

                {/* Course Content Section */}
                <div className="max-w-[830px]">
                  <div className="flex flex-col gap-3">
                    <p className="text-[28px] font-semibold text-gray-200">
                      Course Content
                    </p>
                    <div className="flex flex-wrap justify-between gap-2 capitalize">
                      <div className="flex gap-2">
                        <span>
                          {courseContent.length} {`section(s)`}
                        </span>
                        <span>
                          {totalNoOfLectures} {`lecture(l)`}
                        </span>
                      </div>
                      <div>
                        <button
                          className="text-yellow-400 capitalize "
                          onClick={() => setIsActive([])}
                        >
                          Collapse all sections
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Course Details Accordion */}
                  <div className="py-4">
                    {courseContent.map((course, index) => (
                      <CourseAccordionBar
                        course={course}
                        key={index}
                        isActive={isActive}
                        handleActive={handleActive}
                      />
                    ))}
                  </div>

                  {/* Author Details */}
                  <div className=" py-4">
                    <p className="text-[28px] font-semibold">Author</p>
                    <div className="flex items-center gap-4 py-4">
                      <Image
                        width={56}
                        height={56}
                        src={
                          instructor?.image
                            ? instructor.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${
                                instructor?.firstName || "John"
                              }`
                        }
                        alt="Instructor"
                        className="h-14 w-14 rounded-full"
                      />
                      <div>
                        <p className="text-xl font-semibold">
                          {`${instructor?.firstName || "Unknown"} ${
                            instructor?.lastName || ""
                          }`}
                        </p>
                        <p>{instructor?.about || "No bio available."}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseDetails;
