import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ACCOUNT_TYPE } from "@/utils/roles";
import { addToCart } from "@/redux/slices/cartSlice";
import Image from "next/image";

function CourseDetailsCard({
  course,
  setConfirmationModal,
  handleBuyCourse,
}: {
  course: any;
  setConfirmationModal: any;
  handleBuyCourse: any;
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (user) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => router.push("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-gray-700 p-4 text-gray-300`}
      >
        {/* Course Image */}
        <Image
          width={400}
          height={300}
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold text-gray-100">
            USD. {CurrentPrice}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="text-gray-900 bg-yellow-400  py-2 rounded-md font-semibold  hover:scale-95 transition-all duration-300 ease-in-out"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => router.push("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button
                onClick={handleAddToCart}
                className="bg-gray-950 text-yellow-400  py-2 rounded-md font-semibold  hover:scale-95 transition-all duration-300 ease-in-out "
              >
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-gray-400">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
            <p className={`my-2 text-xl font-semibold text-gray-300`}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-[#7ae7e4]">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2 items-center`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                );
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-400 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetailsCard;
