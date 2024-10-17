import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import User from "@/model/User";
import CourseSell from "@/model/CourseSell";
import { NextResponse } from "next/server";
import CourseProgress from "@/model/CourseProgress";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const { courseIds, userId } = await req.json();

    if (!courseIds || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input. User ID or course IDs missing.",
        },
        { status: 400 }
      );
    }

    const purchasedCourses = [];
    const courseProgressIds = [];

    for (const courseId of courseIds) {
      const course = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: { studentsEnrolled: userId },
        },
        { new: true }
      );

      if (!course) {
        continue;
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { courses: courseId },
        },
        { new: true }
      );

      if (!user) {
        continue;
      }

      const sellerId = course.instructor;

      await CourseSell.create({
        course: courseId,
        buyer: userId,
        seller: sellerId,
        price: course.price,
      });

      purchasedCourses.push({
        courseId,
        courseName: course.courseName,
        price: course.price,
      });

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      courseProgressIds.push(courseProgress._id);
    }

    if (courseProgressIds.length > 0) {
      await User.findByIdAndUpdate(userId, {
        $push: { courseProgress: { $each: courseProgressIds } },
      });
    }

    if (purchasedCourses.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to buy any course.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Courses bought successfully.",
        data: purchasedCourses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
