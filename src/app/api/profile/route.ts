import DatabaseConnection from "@/lib/DBconnect";
import Profile from "@/model/Profile";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  await DatabaseConnection();

  try {
    const body = await req.formData();

    const profileId = body.get("profileId");
    const userId = body.get("userId");
    const firstName = body.get("firstName");
    const lastName = body.get("lastName");
    const dateOfBirth = body.get("dateOfBirth");
    const gender = body.get("gender");
    const contactNumber = parseInt(body.get("contactNumber") as string);
    const about = body.get("about");

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        dateOfBirth,
        gender,
        contactNumber,
        about,
      },
      { new: true }
    );
    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: { updatedProfile, updatedUser },
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile. Please try again.",
      },
      { status: 500 }
    );
  }
}
