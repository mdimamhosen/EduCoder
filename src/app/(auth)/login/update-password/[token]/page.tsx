"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const token = pathname.split("/").pop();
  console.log("token", token);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put("/api/update-password", {
        password,
        confirmPassword,
        token,
      });
      if (response?.status == 200) {
        toast.success("Password reset successful");
        router.push("/login");
      } else {
        toast.error(response?.data?.message);
      }
      console.log("response", response);
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred while resetting the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-slate-800">
      {
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-300">
            Choose new password
          </h1>
          <p className="my-4 text-xs md:text-sm leading-[1.625rem] text-gray-400">
            Almost done. Enter your new password and you’re all set.
          </p>
          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem]   lable-style">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="form-style w-full !pr-10"
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
            </label>
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] lable-style">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style w-full !pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="text-center text-sm md:text-base md:px-4 px-2 py-2 md:py-3 sm:px-6 sm:py-3 rounded-md font-bold shadow-md bg-yellow-300 text-black hover:shadow-none hover:scale-95 transition-all duration-300 flex justify-center items-center gap-1 w-full mt-3"
            >
              {loading ? "Updating your password..." : "Reset Password"}
            </button>
          </form>
          <div className="mt-3 flex items-center justify-between">
            <Link href="/login">
              <p className="flex items-center gap-x-2 text-gray-300">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      }
    </div>
  );
};

export default Page;
