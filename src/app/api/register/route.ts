import { OTP } from "@/model/OTP";
import { User } from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Profile } from "@/model/Profile";
export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = await request.json();

    // Check if All Details are there or not
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return NextResponse.json({
        success: false,
        message: "All Fields are required",
      });
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Find the most recent OTP for the email
    const response = await OTP.findOne({ email }).sort({ createdAt: -1 });
    console.log(response);
    if (!response) {
      // OTP not found for the email
      return NextResponse.json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response?.otp) {
      // Invalid OTP
      return NextResponse.json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const approved = accountType === "Instructor" ? false : true;

    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: "",
    });

    return NextResponse.json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "An error occurred. Please try again later or contact support.",
    });
  }
}
