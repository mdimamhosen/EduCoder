import DatabaseConnection from "@/lib/DBconnect";
import { OTP } from "@/model/OTP";
import User from "@/model/User";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";

export async function POST(request: Request) {
  await DatabaseConnection();
  try {
    const { email } = await request.json();
    console.log("Email", email);

    // Check if the email is valid
    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is required.",
      });
    }
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return NextResponse.json({
        success: false,
        message: "User already exists.",
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    console.log(typeof otp);
    console.log(typeof email);
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message:
        "An error occurred while sending OTP. Please try again later or contact support.",
    });
  }
}
