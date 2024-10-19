import { RootState } from "@/redux/reducer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import IconBtn from "../common/IconBtn";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function CourseReviewModal({ setReviewModal }) {
  const { data: session, status } = useSession();
  const token = session?.user;
  const { user } = useSelector((state: RootState) => state.profile);

  const { courseEntireData } = useSelector(
    (state: RootState) => state.viewCourse
  );
  const { courseId, sectionId, subSectionId } = useParams();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    // await createRating(
    //   {
    //     courseId: courseEntireData._id,
    //     rating: data.courseRating,
    //     review: data.courseExperience,
    //   },
    //   token
    // )

    try {
      setLoading(true);
      const response = await axios.post("/api/addReview", {
        courseId: courseId,
        userId: token._id,
        rating: data.courseRating,
        review: data.courseExperience,
      });
      if (response.data.success) {
        console.log("Review Added Successfully");
        toast.success("Review Added Successfully");
        setReviewModal(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to add review:", error);
      setReviewModal(false);
      toast.error("Failed to add review");
      setLoading(false);
    }

    console.log(data);
  };
  if (loading) {
    return toast.loading("Adding Review...");
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-gray-400 bg-gray-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-900 p-5">
          <p className="text-xl font-semibold text-gray-200">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-gray-200" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <Image
              width={50}
              height={50}
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-gray-300">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-400">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">
              <label className="text-sm lable-style" htmlFor="courseExperience">
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-900 py-[8px] px-[20px] font-semibold text-gray-100 hover:scale-95 transition-all duration-300 ease-in-out`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-400 py-[8px] px-[20px] font-semibold text-gray-950 hover:scale-95 transition-all duration-300 ease-in-out`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
