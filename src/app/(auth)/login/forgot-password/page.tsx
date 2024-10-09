"use client";

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  // const router = useRouter();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put("/api/resetPasswordToken", { email });

      if (response.status === 200) {
        setEmailSent(true);
        toast.success(response.data.message);
        // router.push("/login/update-password");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800">
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-200">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-xs md:text-sm leading-[1.625rem] text-gray-300">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you do not have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800 lable-style">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="form-style w-full"
                />
              </label>
            )}
            <button
              type="submit"
              className="text-center mt-3 text-sm md:text-base md:px-4 px-2 py-2  md:py-3 sm:px-6 sm:py-3 rounded-md font-bold shadow-md bg-yellow-300 text-black hover:shadow-none hover:scale-95 transition-all duration-300 flex justify-center items-center gap-1 w-full"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : !emailSent
                ? "Submit"
                : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link href="/login">
              <p className="flex items-center gap-x-2 text-gray-800">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
