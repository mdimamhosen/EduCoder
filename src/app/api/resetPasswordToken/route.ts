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

    const url = `http://localhost:3000/login/update-password/${token}`;
    await mailSender(
      email,
      "Password Reset",
      `
  <div style="font-family: Arial, sans-serif; max-width: 600px; width: 100%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #333; font-size: 22px; text-align: center;">Reset Your Password</h2>
    <p style="font-size: 16px; color: #555; text-align: center;">
      We received a request to reset the password for your account. If you did not make this request, you can safely ignore this email.
    </p>
    <p style="font-size: 16px; color: #555; text-align: center;">
      To reset your password, click the button below:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${url}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold;">
        Reset Password
      </a>
    </div>
    <p style="font-size: 16px; color: #555; text-align: center;">
      Or copy and paste the following link into your browser:
      <br />
      <a href="${url}" style="color: #4CAF50; word-wrap: break-word;">${url}</a>
    </p>
    <p style="font-size: 14px; color: #999; text-align: center;">
      This link will expire in 1 hour.
    </p>
    <p style="font-size: 14px; color: #999; text-align: center;">
      Thanks, <br /> Your Team
    </p>
  </div>

  <!-- Mobile responsiveness using inline media query -->
  <style>
    @media only screen and (max-width: 600px) {
      div {
        padding: 15px;
      }
      h2 {
        font-size: 20px;
      }
      p {
        font-size: 14px;
      }
      a {
        padding: 10px 20px;
        font-size: 16px;
      }
    }
  </style>
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
