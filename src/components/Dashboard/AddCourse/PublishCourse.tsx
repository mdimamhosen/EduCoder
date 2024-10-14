import IconBtn from "@/components/common/IconBtn";
import { RootState } from "@/redux/reducer";
import { resetCourseState, setStep } from "@/redux/slices/courseSlice";
import { COURSE_STATUS } from "@/utils/roles";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const dispatch = useDispatch();
  //   const navigate = useNavigate()
  const router = useRouter();
  //   const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state: RootState) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    router.push("/dashboard/my-courses");
  };
  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses();
      return;
    }

    if (!course?._id) {
      toast.error("Course ID is missing.");
      console.error("Course ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);

    // If the status needs to be updated
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("updates", JSON.stringify({ status: courseStatus }));

    setLoading(true);

    try {
      const result = await axios.put("/api/update-course", formData);
      if (result.data.success) {
        toast.success("Course updated successfully.");
        goToCourses();
      } else {
        toast.error(result.data.message || "Course update failed.");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update the course.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: any) => {
    handleCoursePublish();
  };

  return (
    <div className="rounded-md border-[1px] border-gray-600 bg-gray-800 p-6">
      <p className="text-2xl font-semibold text-gray-400">Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-gray-600 text-gray-200 focus:ring-2 focus:ring-gray-500"
            />
            <span className="ml-2 text-gray-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-900 py-[8px] px-[20px] font-semibold text-gray-300"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
}
