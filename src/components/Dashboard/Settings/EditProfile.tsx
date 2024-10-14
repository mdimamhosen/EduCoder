"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import IconBtn from "@/components/common/IconBtn";
import toast from "react-hot-toast";
import axios from "axios";

// Define the shape of the form data
interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  about: string;
}

// Available gender options
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = ({ user }: { user: any }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  // const user = session?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submitProfileForm: SubmitHandler<FormData> = async (data) => {
    try {
      // Update the user profile
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("profileId", user.data.additionalDetails._id);
      formData.append("userId", user.data._id);
      formData.append("gender", data.gender);
      formData.append("contactNumber", data.contactNumber);
      formData.append("about", data.about);
      const response = await axios.put(`/api/profile`, formData);
      console.log("Form Data - ", data);
      console.log("Response - ", response.data);
      if (response.data.success) {
        toast.success("Profile updated successfully.");
        // router.push("/dashboard/my-profile");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        // If the error is an instance of Error, we can safely access its message
        console.error("ERROR MESSAGE - ", error.message);
      } else {
        // If it's some other type of error, handle it appropriately
        console.error("An unknown error occurred.");
      }
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-gray-600 bg-gray-800 p-8 px-12">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* First Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="form-style"
                {...register("firstName", { required: true })}
                defaultValue={user?.data.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-400">
                  Please enter your first name.
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className="form-style"
                {...register("lastName", { required: true })}
                defaultValue={user?.data.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-400">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Date of Birth */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: "Please enter your Date of Birth.",
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.data.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-400">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.data.additionalDetails?.gender}
              >
                {genders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-400">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Contact Number */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: "Please enter your Contact Number.",
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.data.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-400">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            {/* About */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: "Please enter your bio." })}
                defaultValue={user?.data.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-400">
                  {errors.about.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end gap-2">
          <button
            onClick={() => router.push("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-gray-600 border border-gray-500 py-2 px-5 font-semibold text-gray-200 hover:scale-95 transition-all duration-300 "
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" onclick={() => {}} />
        </div>
      </form>
    </>
  );
};

export default EditProfile;
