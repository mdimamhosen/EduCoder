"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "./Tab";
import { ACCOUNT_TYPE } from "@/utils/roles";
import toast from "react-hot-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setSignupData } from "@/redux/slices/authSclice";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

interface signUpDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType?: string;
}

const SignupForm = () => {
  const router = useRouter();
  // const { data: session, status } = useSession();
  // const token = session?.user;
  const [loading, setLoading] = useState(false);
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

  // Redirect authenticated users immediately

  // Handle input field changes
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

    // Validate password
    if (e.target.name === "password" && e.target.value.length < 8) {
      setPassAlert("Password must be at least 8 characters long");
    } else if (e.target.name === "password" && e.target.value.length >= 8) {
      setPassAlert("");
    }

    // Validate confirmPassword when both fields are filled
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      if (password && confirmPassword && password !== confirmPassword) {
        setPassAlert("Passwords do not match");
      } else {
        setPassAlert("");
      }
    }
  };

  // Handle form submission
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the password meets length requirement
    if (password.length < 8) {
      setPassAlert("Password must be of at least eight characters");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    formData.accountType = accountType;

    // Dispatch signup data
    dispatch(setSignupData(formData));
    setLoading(true);

    try {
      // Send OTP request to backend
      const response = await axios.post("/api/send-otp", { email });
      if (response.status === 200) {
        toast.success("OTP sent to your email");
        router.push("/register/verify-email");
      } else {
        toast.error("Failed to send OTP. Try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // Data for the Tab component
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
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] lable-style">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-[0.5rem] p-[12px] form-style"
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
              className="w-full rounded-[0.5rem] p-[12px] form-style"
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
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-[0.5rem] p-[12px] form-style"
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
              className="w-full rounded-[0.5rem] p-[12px] form-style"
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
            <p className="text-pink-100 mt-1">{passAlert}</p>
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
              className="w-full rounded-[0.5rem] p-[12px] form-style"
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
          disabled={loading}
          className={`mt-6 rounded-[8px] bg-yellow-400 py-[8px] px-[12px] font-medium text-richblack-900 ${
            loading && "opacity-50"
          }`}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex items-center my-4 gap-x-2 justify-center">
        <p className="text-richblack-5">Already have an account?</p>
        <Link href="/login">
          <p className="text-yellow-25">Login</p>
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
