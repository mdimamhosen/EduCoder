import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import User from "@/model/User";
import CourseSell from "@/model/CourseSell";
import { NextResponse } from "next/server";
import CourseProgress from "@/model/CourseProgress";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const { courseId, userId } = await req.json();

    if (!courseId || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        { status: 400 }
      );
    }

    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { studentsEnrolled: userId },
      },
      { new: true }
    );

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found.",
        },
        { status: 404 }
      );
    }

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

    const saveSellData = await CourseSell.create({
      course: courseId,
      buyer: userId,
      seller: sellerId,
      price: course.price,
    });

    const courseProgress = await CourseProgress.create({
      courseID: courseId,
      userId: userId,
      completedVideos: [],
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { courseProgress: courseProgress._id },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Course bought and progress initialized successfully.",
        data: {
          sellData: saveSellData,
          courseProgress: courseProgress,
        },
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
