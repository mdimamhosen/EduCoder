import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    console.log(userId);
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required.",
      });
    }

    const courses = await Course.find({ instructor: userId });
    if (!courses) {
      return NextResponse.json({
        success: false,
        message: "No course found.",
        data: [],
      });
    }

    return NextResponse.json({
      success: true,
      message: "All courses fetched successfully.",
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong during fetching all course.",
    });
  }
}
