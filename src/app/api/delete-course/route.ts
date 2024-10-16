import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const formData = await req.formData();
    const courseId = formData.get("courseId");
    const userId = formData.get("userId");

    if (!courseId || !userId) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const deleteCourse = await Course.findByIdAndDelete(courseId, {
      new: true,
    });

    if (!deleteCourse) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const allCourseWithUser = await Course.find({ instructor: userId });
    if (!allCourseWithUser) {
      return NextResponse.json(
        { success: false, message: "No course found", data: [] },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: allCourseWithUser,
        message: "Course deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete course" },
      { status: 500 }
    );
  }
}
