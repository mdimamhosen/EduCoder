import DatabaseConnection from "@/lib/DBconnect";
import CourseSell from "@/model/CourseSell";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const { seller } = await req.json();

    if (!seller) {
      return NextResponse.json({
        success: false,
        message: "Seller ID is required.",
      });
    }

    const courseSell = await CourseSell.find({ seller: seller });

    if (!courseSell) {
      return NextResponse.json({
        success: false,
        message: "No course sell found.",
        data: [],
      });
    }

    const totalIncome = courseSell.reduce((acc, curr) => acc + curr.price, 0);
    const totalStudents = courseSell.length;
    return NextResponse.json({
      success: true,
      message: "All course sell fetched successfully.",

      totalStudents: totalStudents,
      totalIncome: totalIncome,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message:
        "Something went wrong during fetching all course sell with the student number.",
    });
  }
}
