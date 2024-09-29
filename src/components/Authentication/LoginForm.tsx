"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div>
      <form
        onSubmit={handleOnSubmit}
        className="mt-6 flex w-full flex-col gap-y-4"
      >
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] lable-style">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem]   p-[12px] form-style"
          />
        </label>
        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] lable-style">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem]   p-[12px] pr-12  form-style"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link href="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 hover:underline hover:underline-bg-[#070] transition-all duration-300 ease-linear">
              Forgot Password
            </p>
          </Link>
        </label>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-400 py-[8px] px-[12px] hover:scale-95 transition-all duration-300 ease-linear font-semibold text-gray-950"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
