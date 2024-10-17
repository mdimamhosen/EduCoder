import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import User from "@/model/User";
import CourseSell from "@/model/CourseSell"; // Import CourseSell model
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const { courseId, userId } = await req.json();

    // Validate input data
    if (!courseId || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        { status: 400 }
      );
    }

    // Fetch course details
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found.",
        },
        { status: 404 }
      );
    }

    // Fetch user and update course list
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { courses: courseId },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    const sellerId = course.instructor;

    // Create a new CourseSell entry
    const saveSellData = await CourseSell.create({
      course: courseId,
      buyer: userId,
      seller: sellerId,
      price: course.price,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Course bought successfully.",
        data: saveSellData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during the course purchase.",
      },
      { status: 500 }
    );
  }
}
