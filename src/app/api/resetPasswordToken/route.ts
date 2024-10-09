import User from "@/model/User";
import mailSender from "@/utils/mailSender";
import { NextResponse } from "next/server";
import crypto from "crypto";
export async function PUT(request: Request) {
  try {
    const email = await request.json();
    console.log("EMAIL", email);
    const user = await User.findOne({ email: email });
    console.log("USER", user);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email.`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Email Sent Successfully, Please Check Your Email to Continue Further",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error as Error,
        success: false,
        message: `Some Error in Sending the Reset Message`,
      },
      { status: 400 }
    );
  }
}
