import DatabaseConnection from "@/lib/DBconnect";
import Profile from "@/model/Profile";
import Course from "@/model/Course";

import User from "@/model/User";

import { NextResponse } from "next/server";
import CourseProgress from "@/model/CourseProgress";

export async function GET(req: Request) {
  try {
    await DatabaseConnection();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Populate all relevant fields
    const user = await User.findById(userId)
      .populate("additionalDetails") // Populate additional profile details
      .populate("courses") // Populate courses the user is enrolled in
      .populate({
        path: "courses",
        populate: {
          path: "instructor", // Populate instructor details in each course
          model: "User",
        },
      })
      .populate("courseProgress") // Populate user's course progress
      .populate({
        path: "courseProgress",
        populate: {
          path: "courseId", // Assuming there's a courseId reference in CourseProgress model
          model: "Course",
        },
      });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: "User fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await DatabaseConnection();

  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }
    const deletedUser = await User.findByIdAndDelete(userId);
    const deletedCourses = await Course.deleteMany({ instructor: userId });

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting user:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
