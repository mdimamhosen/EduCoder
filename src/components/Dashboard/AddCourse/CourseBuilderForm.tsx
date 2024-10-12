"use client";
import React, { useState } from "react";
import NestedView from "./NestedView";
import { MdNavigateNext } from "react-icons/md";
import IconBtn from "@/components/common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";

interface FormData {
  sectionName: string;
}

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  // Local states
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState<string | null>(null);

  const { course } = useSelector((state: RootState) => state.course);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Process the form data here
      console.log("Form submitted: ", data);
      if (editSectionName) {
        // Handle section name editing logic
        setEditSectionName(null);
      } else {
        // Handle section creation logic
      }
      reset(); // Reset form after submission
    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle editing the section name
  const handleChangeEditSectionName = (
    sectionId: string,
    sectionName: string
  ) => {
    setEditSectionName(sectionName);
    // Prefill the input with the current section name for editing
  };

  // Cancel edit action
  const cancelEdit = () => {
    setEditSectionName(null);
    reset(); // Reset the form
  };

  const goToNext = () => {
    // Navigate to the next step
    console.log("Go to the next step");
  };

  const goBack = () => {
    // Navigate to the previous step
    console.log("Go back to the previous step");
  };

  return (
    <div>
      <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          Course Builder
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="sectionName">
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
            >
              <IoAddCircleOutline size={20} className="text-yellow-50" />
            </IconBtn>
            {editSectionName && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm text-richblack-300 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
        {course.courseContent.length > 0 && (
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        )}
        {/* Next Prev Button */}
        <div className="flex justify-end gap-x-3">
          <button
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Next" onClick={goToNext}>
            <MdNavigateNext />
          </IconBtn>
        </div>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
