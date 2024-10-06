"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "./Tab";
import { ACCOUNT_TYPE } from "@/utils/roles";
import toast from "react-hot-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setLoading, setSignupData } from "@/redux/slices/authSclice";
import axios from "axios";
import { useRouter } from "next/navigation";
interface signUpDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  confirmPassword: string;
  accountType?: string;
}
const SignupForm = () => {
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [passAlert, setPassAlert] = useState("");

  const [formData, setFormData] = useState<signUpDetails>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "password" && e.target.value.length < 8) {
      setPassAlert("Must be 8");
    }
  };
  const router = useRouter();
  // Handle Form Submission
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8) {
      setPassAlert("Password must be of at least eight characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    formData.accountType = accountType;

    dispatch(setSignupData(formData));
    dispatch(setLoading(true));

    try {
      // Send OTP request to the backend
      const response = await axios.post("/api/send-otp", { email });
      if (response.status === 200) {
        toast.success("OTP sent to your email");
        router.push("/register/verify-email");
      } else {
        toast.error("Failed to send OTP. Try again later.");
      }
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error sending OTP:", error);
      dispatch(setLoading(false));
    }

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex md:flex-row flex-col gap-x-4 gap-y-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem]  lable-style ">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem]  p-[12px] form-style"
              autoComplete="off"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] lable-style">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem]  p-[12px] form-style"
              autoComplete="off"
            />
          </label>
        </div>
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
            className="w-full rounded-[0.5rem]  p-[12px] form-style"
            autoComplete="off"
          />
        </label>
        <div className="flex gap-x-4 flex-col md:flex-row gap-y-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] lable-style">
              Create Password <sup className="text-pink-200">*</sup>
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
              className="w-full rounded-[0.5rem]  p-[12px] form-style"
              autoComplete="new-password"
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
            <p className="text-pink-100 mt-1 ">{passAlert}</p>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] lable-style">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem]  p-[12px] form-style"
              autoComplete="new-password"
            />
            <span
              onClick={() => setShowConfirmPassword((prev: boolean) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-400 py-[8px] px-[12px] transition-all duration-300   text-gray-950 font-semibold hover:scale-95 "
        >
          Create Account
        </button>
        <p className="text-gray-300 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-300  ">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
