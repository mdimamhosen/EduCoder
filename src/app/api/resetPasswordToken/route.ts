import User from "@/model/User";
import mailSender from "@/utils/mailSender";
import { NextResponse } from "next/server";
import crypto from "crypto";
import DatabaseConnection from "@/lib/DBconnect";
export async function PUT(request: Request) {
  await DatabaseConnection();
  try {
    const { email } = await request.json();
    console.log("EMAIL", email);
    const user = await User.findOne({ email: email });
    console.log("USER", user);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: `This Email: ${email} is not Registered With Us Enter a Valid Email.`,
        },
        { status: 400 }
      );
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
      `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #333;">Reset Your Password</h2>
    <p style="font-size: 16px; color: #555;">
      We received a request to reset the password for your account. If you did not make this request, you can safely ignore this email.
    </p>
    <p style="font-size: 16px; color: #555;">
      To reset your password, click the button below:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
        Reset Password
      </a>
    </div>
    <p style="font-size: 16px; color: #555;">
      Or copy and paste the following link into your browser:
      <br />
      <a href="${url}" style="color: #4CAF50;">${url}</a>
    </p>
    <p style="font-size: 14px; color: #999;">
      This link will expire in 1 hour.
    </p>
    <p style="font-size: 14px; color: #999;">
      Thanks, <br /> Your Team
    </p>
  </div>
  `
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
