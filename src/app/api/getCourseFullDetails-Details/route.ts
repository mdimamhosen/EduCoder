import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import RatingAndReview from "@/model/RatingAndReview";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();
  try {
    const { courseId, userId } = await req.json();

    if (!courseId || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all the required fields!",
        },
        { status: 400 }
      );
    }

    // Check if the user is enrolled in the course by using $in
    const course = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $in: [userId] },
    })
      .populate({
        path: "studentsEnrolled",
        populate: {
          path: "courseProgress",
        },
      })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    // Check if course exists before processing course content
    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found or user not enrolled!",
        },
        { status: 404 }
      );
    }

    let totalDurationInSeconds = 0;

    // Calculate total duration from course content
    course.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration) || 0; // Handle potential NaN
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    // Fetch rating and review for the course
    const ratingAndReview = await RatingAndReview.findOne({
      course: courseId,
      user: userId,
    });

    return NextResponse.json(
      {
        success: true,
        data1: course,
        data2: totalDuration,
        message: "Course fetched successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Bad Request!",
      },
      { status: 400 }
    );
  }
}

// Function to convert total seconds into a formatted duration string
function convertSecondsToDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor((totalSeconds % 3600) % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}
