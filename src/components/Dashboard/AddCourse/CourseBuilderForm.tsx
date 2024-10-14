import React, { useState } from "react";
import NestedView from "./NestedView";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import IconBtn from "@/components/common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import toast from "react-hot-toast";
import { setCourse, setEditCourse, setStep } from "@/redux/slices/courseSlice";
import { useSession } from "next-auth/react";
import axios from "axios";

interface FormData {
  sectionName: string;
}

export default function CourseBuilderForm() {
  const { data: session, status } = useSession();
  const userId = session?.user?._id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch();
  const { course } = useSelector((state: RootState) => state.course);
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    let result;

    try {
      const jsonData = {
        sectionName: data.sectionName,
        sectionId: editSectionName || undefined,
        courseId: course._id,
      };

      console.log("Data to be sent:", jsonData);

      if (editSectionName) {
        const section = course.courseContent.find(
          (section) => section._id === editSectionName
        );
        if (!section) {
          toast.error("Section not found!");
          return;
        }
        const dataToSend = {
          sectionName: jsonData.sectionName,
          sectionId: section._id,
          courseId: course._id,
        };
        console.log("PUT request data:", dataToSend);
        result = await axios.put("/api/section", dataToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.data.success) {
          dispatch(setCourse(result.data.data));
          toast.success("Section updated successfully!");
        }
      } else {
        const dataToSend = {
          sectionName: jsonData.sectionName,
          courseId: course._id,
        };

        result = await axios.post("/api/section", dataToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.data.success) {
          dispatch(setCourse(result.data.data));
          toast.success("Section created successfully!");
        }
      }

      if (result) {
        setEditSectionName(null);
        setValue("sectionName", "");
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

  const goToNext = () => {
    console.log("Navigating to next step...");
    console.log("Course state:", course);
    if (!course || course?.courseContent?.length === 0) {
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

  const goBack = () => {
    console.log("Going back to previous step...");
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  return (
    <div className="space-y-8 rounded-md border-[1px] border-gray-600 bg-gray-800 p-6">
      <p className="text-2xl font-semibold text-gray-300">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm lable-style" htmlFor="sectionName">
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
      {course?.courseContent?.length > 0 && (
        <NestedView
          handleChangeEditSectionName={handleChangeEditSectionName}
          courseId={course._id}
        />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-900 py-[8px] px-[20px] font-semibold text-gray-300 hover:scale-95 transition-all duration-300 ease-linear"
        >
          <MdNavigateBefore />
          Back
        </button>
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
