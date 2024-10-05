"use client";
import OtpInput from "react-otp-input";

import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setLoading } from "@/redux/slices/authSclice";
import axios from "axios";
import toast from "react-hot-toast";

function VerifyEmail() {
  const [otp, setOtp] = useState<string>("");
  const { signupData, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!signupData) {
      // router.push("/register");
    }
  }, []);
  const handleVerifyAndSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    if (otp.length !== 6) {
      return;
    }
    dispatch(setLoading(true));

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
      const response = await axios.post("/api/register", data);
      dispatch(setLoading(false));
      if (response.status === 200) {
        router.push("/login");
        toast.success("Account Created Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during registration");
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="min-h-[calc(100vh-3rem)] grid place-items-center bg-slate-800">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-gray-200 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-sm md:text-[1.125rem] leading-[1.625rem] my-4 text-gray-300">
            A verification code has been sent to you. Enter the code below
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
                  className=" w-[33px] md:w-[48px] xl:w-[60px] border-0 bg-gray-900 rounded-[0.5rem] text-gray-200 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 font-bold py-[12px] px-[12px] rounded-[8px] mt-6 text-gray-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link href="/register">
              <p className="text-gray-200 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-300 gap-x-2"
              // onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
