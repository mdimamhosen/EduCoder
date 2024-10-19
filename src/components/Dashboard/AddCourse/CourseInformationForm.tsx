import React, { useEffect, useState } from "react";
import ChipInput from "./ChipInput";
import { COURSE_STATUS } from "@/utils/roles";
import { HiOutlineCurrencyDollar, HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";

import Upload from "./Upload";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import toast from "react-hot-toast";
import RequirementsField from "./RequirementField";
import { setCourse, setStep } from "@/redux/slices/courseSlice";
import axios from "axios";
import { useSession } from "next-auth/react";

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

interface CourseFormData {
  courseTitle: string;
  courseShortDesc: string;
  coursePrice: number;
  courseTags: string[];
  courseBenefits: string;
  courseCategory: string;
  courseRequirements: string[];
  courseImage: File | string;
}
export interface Course {
  _id?: string;
  courseName: string;
  courseDescription: string;
  whatYouWillLearn: string;
  price: number;
  thumbnail: string;
  tag: string[];
  instructions: string[];
  status: "Draft" | "Published";
  category: Category;
}

export default function CourseInformationForm() {
  const { data: session  } = useSession();
  const userId = session?.user?._id;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CourseFormData>();

  const dispatch = useDispatch();

  const { course, editCourse } = useSelector(
    (state: RootState) => state.course
  );
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState<Category[]>([]);

  useEffect(() => {
    setLoading(true);
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/create-getAll-category");
        console.log("Categories Response: ", response.data.data);
        if (response.data.data.length > 0) {
          setCourseCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category[0]._id);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    setLoading(false);
  }, [
    course.category,
    course.courseDescription,
    course.courseName,
    course.instructions,
    course.price,
    course.tag,
    course.thumbnail,
    course.whatYouWillLearn,
    editCourse,
    setValue,
  ]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  //   handle next button click
  const onSubmit = async (data: CourseFormData) => {
    const formData = new FormData();

    // Helper function to build FormData for course creation
    const buildFormData = () => {
      formData.append("userId", userId);
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice.toString());
      formData.append("tag", JSON.stringify(data.courseTags));
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("status", COURSE_STATUS.DRAFT);
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("thumbnailImage", data.courseImage);
    };

    try {
      setLoading(true);

      if (editCourse) {
        if (isFormUpdated()) {
          buildFormData(); // Call helper function for building data
          formData.append("courseId", course._id ?? "");
        } else {
          toast.error("No changes made to the form");
          return;
        }
      } else {
        buildFormData(); // Call helper function for new course
      }

      const result = await axios.post(
        "/api/create-getAll-deleteA-course",
        formData
      );
      console.log("result", result);
      if (result?.status === 200) {
        dispatch(setCourse(result.data.data));
        console.log("course data:", course);
        dispatch(setStep(2));
        toast.success("Course Information Saved Successfully");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("An error occurred while creating the course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-gray-600 bg-gray-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm lable-style" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm lable-style" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm lable-style" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            type="number"
            {...register("coursePrice", {
              required: "Price is required",
              valueAsNumber: true,
              validate: (value) => {
                return value > 0 || "Price must be a positive number";
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyDollar className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm lable-style" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {" "}
                {category?.name}
              </option>
            ))}
        </select>

        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm lable-style" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-600 py-[8px] px-[20px] font-semibold text-gray-200`}
          >
            Continue Without Saving
          </button>
        )}

        <button
          disabled={loading}
          type="submit"
          className={`flex items-center bg-yellow-400 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-gray-900 hover:shadow-none hover:scale-95 transition-all duration-300   ease-linear`}
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              <span>Next</span> <MdNavigateNext />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
