import DatabaseConnection from "@/lib/DBconnect";
import Profile from "@/model/Profile";

import Course from "@/model/Course";

import { UploadFile } from "@/utils/Uploader";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  await DatabaseConnection();

  try {
    const formData = await req.formData();
    const courseId = formData.get("courseId");
    const updates = formData.get("updates")
      ? JSON.parse(formData.get("updates") as string)
      : {};

    console.log("Updates", updates);

    if (!courseId) {
      return NextResponse.json(
        { success: false, message: "Course ID is required" },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const thumbnail = formData.get("thumbnailImage") as File | null;
    if (thumbnail) {
      const thumbnailImage = await UploadFile(
        thumbnail,
        "educoder-course-thumbnails"
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    await course.save();
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        ...updates,
      },
      { new: true }
    )
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
    console.log("updatedCourse", updatedCourse);
    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error from edit course." },
      { status: 500 }
    );
  }
}
