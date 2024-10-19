import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import { NextResponse } from "next/server";

export async function GET() {
  await DatabaseConnection();

  try {
    const courses = await Course.find({
      studentsEnrolled: { $exists: true, $not: { $size: 0 } },
    }).populate("instructor");
    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch course data" },
      { status: 500 }
    );
  }
}
