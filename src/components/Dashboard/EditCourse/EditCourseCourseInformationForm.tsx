import axios from "axios";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import RequirementsField from "../AddCourse/RequirementField";
import Upload from "../AddCourse/Upload";
import ChipInput from "../AddCourse/ChipInput";
import toast from "react-hot-toast";
import { setStep } from "@/redux/slices/courseSlice";

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

const EditCourseCourseInformationForm = () => {
  const { courseId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<CourseFormData>();

  const dispatch = useDispatch();

  const [course, setCourse] = useState<Course | null>(null);
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
        const formData = new FormData();
        formData.append("courseId", String(courseId));
        const resposneForCourse = await axios.post(
          `/api/single-course`,
          formData
        );
        if (resposneForCourse.data.data) {
          setCourse(resposneForCourse.data.data);
          setValue("courseTitle", resposneForCourse.data.data.courseName);
          setValue(
            "courseShortDesc",
            resposneForCourse.data.data.courseDescription
          );
          setValue("coursePrice", resposneForCourse.data.data.price);
          setValue(
            "courseBenefits",
            resposneForCourse.data.data.whatYouWillLearn
          );
          setValue("courseCategory", resposneForCourse.data.data.category._id);
          setValue("courseTags", resposneForCourse.data.data.tag);
          setValue(
            "courseRequirements",
            resposneForCourse.data.data.instructions
          );
          setValue("courseImage", resposneForCourse.data.data.thumbnail);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);
  const onSubmit = async (data: CourseFormData) => {
    const formData = new FormData();

    // Build FormData for the updates
    const buildFormData = () => {
      formData.append("courseId", String(courseId)); // Ensure courseId is included
      formData.append(
        "updates",
        JSON.stringify({
          courseName: data.courseTitle,
          courseDescription: data.courseShortDesc,
          price: data.coursePrice.toString(), // Convert to string
          tag: JSON.stringify(data.courseTags), // Convert tags to JSON string
          whatYouWillLearn: data.courseBenefits,
          category: data.courseCategory,
          instructions: JSON.stringify(data.courseRequirements), // Convert requirements to JSON string
        })
      );

      // Include thumbnail image if it exists and is a File
      if (data.courseImage instanceof File) {
        formData.append("thumbnail", data.courseImage);
      }
    };

    try {
      setLoading(true);

      // Build the FormData
      buildFormData();

      // Send the PUT request to update the course
      const result = await axios.put("/api/update-course", formData);
      console.log("result", result);

      // Check if the response status is OK
      console.log("Result Data", result.data.data);
      if (result.data.success) {
        dispatch(setStep(2));
        toast.success("Course Information Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("An error occurred while updating the course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
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
          defaultData={course?.tag}
          setValue={setValue}
          //   getValues={getValues}
        />
        {/* Course Thumbnail Image */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={course?.thumbnail} // this is the thumbnail image of the course which is already uploaded comming from the database
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
          defaultData={course?.instructions}
        />
        {/* Next Button */}
        <div className="flex justify-end gap-x-2">
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
    </div>
  );
};

export default EditCourseCourseInformationForm;
