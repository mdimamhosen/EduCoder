import DatabaseConnection from "@/lib/DBconnect";
import User from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  await DatabaseConnection();
  try {
    const { password, confirmPassword, token } = await request.json();
    console.log({
      password: password,
      confirmPassword: confirmPassword,
      token: token,
    });

    if (confirmPassword !== password) {
      return NextResponse.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }
    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return NextResponse.json(
        {
          success: false,
          message: "Token is Invalid",
        },
        { status: 404 }
      );
    }
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return NextResponse.json(
        {
          success: false,
          message: `Token is Expired, Please Regenerate Your Token`,
        },

        { status: 403 }
      );
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );
    return NextResponse.json(
      {
        success: true,
        message: `Password Reset Successful`,
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
