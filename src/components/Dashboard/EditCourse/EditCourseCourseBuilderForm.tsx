import React, { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import IconBtn from "@/components/common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCourse, setEditCourse, setStep } from "@/redux/slices/courseSlice";
import { useSession } from "next-auth/react";
import axios from "axios";
import NestedViewEditPage from "./NestedViewEditPage";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

interface FormData {
  sectionName: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface Course {
  _id?: string;
  courseName: string;
  courseDescription: string;
  price: number;
  tag: string[];
  courseContent: Section[];
  status: "Draft" | "Published";
  category: Category;
}

interface Section {
  _id: string;
  sectionName: string;
  subSection: SubSection[];
}

interface SubSection {
  _id: string;
  title: string;
  timeDuration: string;
  description: string;
  videoUrl: string;
}

export default function EditCourseCourseBuilderForm() {
  const { courseId } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?._id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState<string | null>(null);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("courseId", String(courseId));
        const response = await axios.post(`/api/single-course`, formData);
        if (response.data.success) {
          setCourse(response.data.data);
        } else {
          toast.error("Failed to fetch course details.");
        }
      } catch (error) {
        toast.error("Error fetching course details");
      } finally {
        setLoading(false);
      }
    };

    getCourseDetails();
  }, [courseId]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const sectionData = {
        sectionName: data.sectionName,
        sectionId: editSectionName || undefined,
        courseId: course?._id,
      };

      let result;
      if (editSectionName) {
        // Update existing section
        result = await axios.put("/api/section", sectionData);
        toast.success("Section updated successfully!");
      } else {
        // Create a new section
        result = await axios.post("/api/section", sectionData);
        toast.success("Section created successfully!");
      }

      if (result.data.success) {
        setEditSectionName(null);
        setValue("sectionName", "");
        setCourse(result.data.data); // Update course with the new/updated section
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const handleChangeEditSectionName = (
    sectionId: string,
    sectionName: string
  ) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const goToNext = async () => {
    if (!course || course.courseContent.length === 0) {
      toast.error("Please add at least one section.");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least one lecture in each section.");
      return;
    }
    dispatch(setStep(3));
  };

  //   const goBack = () => {
  //     dispatch(setStep(1));
  //     dispatch(setEditCourse(true));
  //   };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-gray-600 bg-gray-800 p-6">
      <p className="text-2xl font-semibold text-gray-300">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm label-style" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses="bg-gray-900 text-gray-300"
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-yellow-400 underline cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-gray-400">Loading course content...</p>
      ) : (
        course?.courseContent &&
        course.courseContent.length > 0 && (
          <NestedViewEditPage
            handleChangeEditSectionName={handleChangeEditSectionName}
            courseId={course._id!}
            defaultData={course.courseContent}
          />
        )
      )}

      {course && course.courseContent.length === 0 && (
        <p className="text-gray-400">
          No sections available. Please add sections.
        </p>
      )}

      <div className="flex justify-end gap-x-3">
        {/* <button
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-900 py-[8px] px-[20px] font-semibold text-gray-300 hover:scale-95 transition-all duration-300 ease-linear"
        >
          <MdNavigateBefore />
          Back
        </button> */}
        <button
          disabled={loading}
          onClick={goToNext}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-400 py-[8px] px-[20px] font-semibold text-gray-900 hover:scale-95 transition-all duration-300 ease-linear"
        >
          Next <MdNavigateNext />
        </button>
      </div>
    </div>
  );
}
