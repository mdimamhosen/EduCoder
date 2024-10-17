import DatabaseConnection from "@/lib/DBconnect";
import User from "@/model/User";
import { UploadFile } from "@/utils/Uploader";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  await DatabaseConnection();

  try {
    const formData = await req.formData();

    const userId = formData.get("userId");
    const image = formData.get("image");

    const uploadImage = await UploadFile(image as File, "profile-images");

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        image: uploadImage.secure_url,
      },
      { new: true }
    )
      .populate("additionalDetails")
      .populate("courses")
      .populate({
        path: "courses",
        populate: {
          path: "instructor",
          model: "User",
        },
      })
      .populate("courseProgress")
      .populate({
        path: "courseProgress",
        populate: {
          path: "courseID",
          model: "Course",
        },
      });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update the profile." },
      { status: 500 }
    );
  }
}
