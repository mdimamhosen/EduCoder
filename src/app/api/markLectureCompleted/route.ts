import DatabaseConnection from "@/lib/DBconnect";
import CourseProgress from "@/model/CourseProgress";
import SubSection from "@/model/SubSection";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const { courseId, userId, sectionId, subSectionId } = await req.json();
    console.log(courseId, userId, sectionId, subSectionId);

    // Check if the subsection exists
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return NextResponse.json(
        { success: false, message: "Subsection not found" },
        { status: 404 }
      );
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Create or update course progress
    let courseProgress = await CourseProgress.findOne({
      userId,
      courseID: courseId,
    });

    if (!courseProgress) {
      // Create new CourseProgress entry if it doesn't exist
      courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [subSectionId], // Initialize with the current subSectionId
      });
    } else {
      // Update existing CourseProgress entry
      courseProgress.completedVideos.push(subSectionId);
      await courseProgress.save();
    }

    // Update user with the new course progress
    await User.findByIdAndUpdate(userId, {
      $addToSet: { courseProgress: courseProgress._id }, // Use $addToSet to avoid duplicates
    });

    return NextResponse.json(
      {
        success: true,
        message: "Course progress updated successfully",
        courseProgress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating course progress:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
