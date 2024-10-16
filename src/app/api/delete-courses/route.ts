import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import User from "@/model/User";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const formData = await req.formData();

    const courseId = formData.get("courseId");
    const userId = formData.get("userId");
    console.log(courseId, userId);

    // Check if courseId and userId are provided
    if (!courseId || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Course ID and User ID are required.",
        },
        {
          status: 400,
        }
      );
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return NextResponse.json({
        success: false,
        message: "Course not found.",
      });
    }
    if (deletedCourse) {
      console.log("Course Deleted Successfully");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { courses: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({
        success: false,
        message: "User not found or course not associated with the user.",
      });
    }

    const updatedCourses = await Course.find({ instructor: userId });
    console.log("Course Updated Successfully");

    return NextResponse.json(
      {
        success: true,
        data: updatedCourses,
        message: "Course deleted successfully and updated course list fetched.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during deleting course.",
    });
  }
}
