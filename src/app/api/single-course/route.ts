import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const formData = await req.formData();
    const courseId = formData.get("courseId");

    const course = await Course.findById(courseId)
      .populate({
        path: "instructor",
        // populate: { path: "additionalDetails" },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    // Check if the course exists
    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found",
        },
        {
          status: 404,
        }
      );
    }

    // Return the populated course data
    return NextResponse.json(
      {
        success: true,
        message: "Course found",
        data: course,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
