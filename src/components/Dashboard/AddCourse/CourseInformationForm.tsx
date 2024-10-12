import React, { useState } from "react";
import ChipInput from "./ChipInput";
import { COURSE_STATUS } from "@/utils/roles";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import IconBtn from "@/components/common/IconBtn";

// Define the interface for form data
interface CourseFormData {
  courseTitle: string;
  courseShortDesc: string;
  coursePrice: number;
  courseTags: string[];
  courseBenefits: string;
  courseCategory: string;
  courseRequirements: string[];
  courseImage: string;
}

// Define the interface for errors
interface FormErrors {
  courseTitle?: string;
  courseShortDesc?: string;
  coursePrice?: string;
  courseCategory?: string;
  courseBenefits?: string;
  courseTags?: string;
}

export default function CourseInformationForm(): JSX.Element {
  const [formData, setFormData] = useState<CourseFormData>({
    courseTitle: "",
    courseShortDesc: "",
    coursePrice: 0,
    courseTags: [],
    courseBenefits: "",
    courseCategory: "",
    courseRequirements: [],
    courseImage: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    courseTitle: "",
    courseShortDesc: "",
    coursePrice: "",
    courseCategory: "",
    courseBenefits: "",
    courseTags: "",
  });

  const [loading, setLoading] = useState(false);
  const [courseCategories] = useState([
    { _id: 1, name: "Development" },
    { _id: 2, name: "Business" },
    { _id: 3, name: "Finance" },
    { _id: 4, name: "Design" },
  ]);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.courseTitle)
      newErrors.courseTitle = "Course title is required";
    if (!formData.courseShortDesc)
      newErrors.courseShortDesc = "Course description is required";
    if (!formData.coursePrice)
      newErrors.coursePrice = "Course price is required";
    if (!formData.courseCategory)
      newErrors.courseCategory = "Course category is required";
    if (!formData.courseBenefits)
      newErrors.courseBenefits = "Benefits of the course are required";
    if (formData.courseTags.length === 0)
      newErrors.courseTags = "Tags are required";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({
      ...prev,
      courseTags: tags,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submittedFormData = new FormData();
    submittedFormData.append("courseName", formData.courseTitle);
    submittedFormData.append("courseDescription", formData.courseShortDesc);
    submittedFormData.append("price", formData.coursePrice.toString());
    submittedFormData.append("tag", JSON.stringify(formData.courseTags));
    submittedFormData.append("whatYouWillLearn", formData.courseBenefits);
    submittedFormData.append("category", formData.courseCategory);
    submittedFormData.append("status", COURSE_STATUS.DRAFT);
    submittedFormData.append(
      "instructions",
      JSON.stringify(formData.courseRequirements)
    );
    submittedFormData.append("thumbnailImage", formData.courseImage);

    setLoading(true);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-md border-[1px] border-gray-600 bg-gray-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm lable-style" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          name="courseTitle"
          placeholder="Enter Course Title"
          value={formData.courseTitle}
          onChange={handleChange}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.courseTitle}
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
          name="courseShortDesc"
          placeholder="Enter Description"
          value={formData.courseShortDesc}
          onChange={handleChange}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.courseShortDesc}
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
            name="coursePrice"
            type="number"
            placeholder="Enter Course Price"
            value={formData.coursePrice}
            onChange={handleChange}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-gray-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.coursePrice}
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm lable-style" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          name="courseCategory"
          value={formData.courseCategory}
          onChange={handleChange}
          className="form-style w-full"
        >
          <option value="">Select Course Category</option>
          {courseCategories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.courseCategory}
          </span>
        )}
      </div>

      {/* Course Benefits */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm lable-style" htmlFor="courseBenefits">
          What You Will Learn <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          name="courseBenefits"
          placeholder="What You Will Learn"
          value={formData.courseBenefits}
          onChange={handleChange}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.courseBenefits}
          </span>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        tags={formData.courseTags}
        errors={errors as { [key: string]: string | undefined }}
        onChange={handleTagsChange}
      />

      {/* Course Thumbnail Image */}
      {/* <Upload
        name="courseImage"
        label="Course Thumbnail"
        setValue={(value) =>
          setFormData((prev) => ({ ...prev, courseImage: value }))
        }
        editData={editCourse ? course?.thumbnail : null}
      /> */}

      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm lable-style" htmlFor="courseBenefits">
          Benefits of the Course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          name="courseBenefits"
          placeholder="What will students learn?"
          value={formData.courseBenefits}
          onChange={handleChange}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {errors.courseBenefits}
          </span>
        )}
      </div>

      {/* Course Requirements */}
      {/* <RequirementsField
        requirements={formData?.courseRequirements}
        onChange={handleRequirementsChange}
      /> */}

      <div className="flex w-full justify-end">
        <IconBtn
          text={loading ? "Loading..." : "Next"}
          type="submit"
          disabled={loading}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
