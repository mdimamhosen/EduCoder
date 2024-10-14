"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/reducer";
import { useRouter } from "next/navigation";
import IconBtn from "@/components/common/IconBtn";
import axios from "axios";
import toast from "react-hot-toast";

interface PasswordFormInputs {
  oldPassword: string;
  newPassword: string;
}

const UpdatePassword = ({ user }: { user: any }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const router = useRouter();

  // Getting token from Redux state (you may need to modify according to your Redux slice)
  //   const { token } = useSelector((state: RootState) => state.auth);
  // create a token variable to store the token and save it to database then use

  // Using react-hook-form for form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormInputs>();

  // Submit handler for form
  const submitPasswordForm = async (data: PasswordFormInputs) => {
    try {
      // Here you can add logic to update the password (e.g., an API call)
      const formData = new FormData();
      formData.append("oldPassword", data.oldPassword);
      formData.append("newPassword", data.newPassword);
      formData.append("userId", user.data._id);

      console.log("Password Data:", data);

      const response = await axios.put(
        `/api/update-password-profile`,
        formData
      );
      console.log("Response:", response.data);
      if (response.data.success) {
        console.log("Password Updated Successfully");
        toast.success(response.data.message);
      } else {
        console.log("Error Updating Password");
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        // If the error is an instance of Error, we can safely access its message
        console.error("ERROR MESSAGE - ", error.message);
      } else {
        // If it's some other type of error, handle it appropriately
        console.error("An unknown error occurred.");
      }
      toast.error("Error Updating Password");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-gray-600 bg-gray-800 p-8 px-12">
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-300">
          Password
        </h2>
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Current Password */}
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="oldPassword" className="lable-style">
              Current Password
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Current Password"
              className="form-style"
              {...register("oldPassword", { required: true })}
            />
            <span
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.oldPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Current Password.
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className="lable-style">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="New Password"
              className="form-style"
              {...register("newPassword", { required: true })}
            />
            <span
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your New Password.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Form Buttons */}
      <div className="flex justify-center  lg:justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            router.push("/dashboard/my-profile");
          }}
          className="cursor-pointer rounded-md bg-gray-600 border border-gray-500 py-2 px-5 font-semibold text-gray-200 hover:scale-95 transition-all duration-300 "
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update" />
      </div>
    </form>
  );
};

export default UpdatePassword;
