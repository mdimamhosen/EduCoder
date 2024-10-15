"use client";
import React from "react";
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "@/redux/reducer";

function VerifyEmail() {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const [OTPLoading, setOTPLoading] = useState(false);
  const { signupData } = useSelector((store: RootState) => store.auth);
  console.log("signupData from email verify: ", signupData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!signupData) {
      router.push("/register");
    }
  }, [signupData, router]);

  const email = signupData?.email;

  const handleVerifyAndSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signupData) {
      toast.error("Signup data is missing. Please try again.");
      return;
    }
    const { accountType, firstName, lastName, password, confirmPassword } =
      signupData;

    if (otp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }

    setLoading(true);
    try {
      const data = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
      };
      console.log("data to send:", data);
      const response = await axios.post("/api/register", data);

      if (response.status === 200) {
        toast.success("Account Created Successfully");
        router.push("/login");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (OTPLoading) return; // Prevent multiple clicks
    toast.success("Resending OTP...");
    setOTPLoading(true);
    try {
      const response = await axios.post("/api/send-otp", { email });
      if (response.status === 200) {
        toast.success("OTP sent to your email");
      } else {
        toast.error("Failed to send OTP. Try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP.");
      console.error("Error sending OTP:", error);
    } finally {
      setOTPLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-slate-800">
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-gray-200 font-semibold text-[1.875rem] leading-[2.375rem]">
          Verify Email
        </h1>
        <p className="text-sm md:text-[1.125rem] leading-[1.625rem] my-4 text-gray-300">
          A verification code has been sent to you. Enter the code below.
        </p>
        <form onSubmit={handleVerifyAndSignup}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[33px] md:w-[48px] xl:w-[60px] border-0 bg-gray-900 rounded-[0.5rem] text-gray-200 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-400 font-bold py-[12px] px-[12px] rounded-[8px] mt-6 text-gray-900 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-95"
            }`}
          >
            {loading ? "Loading..." : "Verify & Sign Up"}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <Link href="/register">
            <p className="text-gray-200 flex items-center gap-x-2">
              <BiArrowBack /> Back To Sign Up
            </p>
          </Link>
          <button
            className={`flex items-center text-blue-300 gap-x-2 ${
              OTPLoading ? "cursor-not-allowed opacity-50" : "hover:underline"
            }`}
            onClick={handleResendOTP}
            disabled={OTPLoading}
          >
            <RxCountdownTimer />
            {OTPLoading ? "Resending OTP..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
