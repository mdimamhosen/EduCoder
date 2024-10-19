import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import { NextResponse } from "next/server";

export async function GET() {
  await DatabaseConnection();

  try {
    const courses = await Course.find({}).populate("instructor");
    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch course data" },
      { status: 500 }
    );
  }
}
