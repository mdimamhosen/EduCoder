import { OTP } from "@/model/OTP";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Profile from "@/model/Profile";
import User from "@/model/User";

export async function POST(request: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
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
    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      accountType: accountType,
      otp: otp,
    });
    if (password !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log("existingUser", existingUser);

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Find the most recent OTP for the email
    const response = await OTP.findOne({ email }).sort({ createdAt: -1 });
    console.log("response Form OTP", response);
    if (!response) {
      // OTP not found for the email
      return NextResponse.json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    if (otp !== response?.otp) {
      // Invalid OTP
      return NextResponse.json(
        {
          success: false,
          message: "The OTP is not valid",
        },
        { status: 400 }
      );
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
    const defaultProfileImage =
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: defaultProfileImage,
    });
    console.log("user", user);

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
