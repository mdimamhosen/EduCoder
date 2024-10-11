"use client";
import { setUser } from "@/redux/slices/profileSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { signIn, useSession } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user;
  if (token) {
    router.replace("/");
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Login successful!");
        dispatch(setUser(token));
        router.replace("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
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
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-[0.5rem] p-[12px] form-style"
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
            className="w-full rounded-[0.5rem] p-[12px] pr-12 form-style"
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
          <Link href="/login/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 hover:underline transition-all duration-300 ease-linear">
              Forgot Password
            </p>
          </Link>
        </label>
        <button
          type="submit"
          className={`mt-6 rounded-[8px] bg-yellow-400 py-[8px] px-[12px]
                      ${
                        loading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:scale-95"
                      }
                      transition-all duration-300 ease-linear font-semibold text-gray-950`}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="text-gray-300 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-yellow-300">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
