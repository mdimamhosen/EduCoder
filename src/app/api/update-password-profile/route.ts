import DatabaseConnection from "@/lib/DBconnect";
import User from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  await DatabaseConnection();
  try {
    const formData = await request.formData();
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    const userId = formData.get("userId");
    console.log({
      oldPassword: oldPassword,
      newPassword: newPassword,
      userId: userId,
    });

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Old Password is Incorrect",
        },
        { status: 400 }
      );
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: encryptedPassword },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: `Password Updated Successfully`,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error as Error,
        success: false,
        message: `Some Error in Updating the Password`,
      },
      {
        status: 500,
      }
    );
  }
}
