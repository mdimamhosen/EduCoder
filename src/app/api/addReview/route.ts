import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import RatingAndReview from "@/model/RatingAndReview";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const { courseId, userId, rating, review } = await req.json();

    const newReview = await RatingAndReview.create({
      user: userId,
      rating,
      review,
      course: courseId,
    });
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: newReview._id },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Review Added Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Failed to add review:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add review.",
      },
      {
        status: 500,
      }
    );
  }
}
