import DatabaseConnection from "@/lib/DBconnect";
import { Category } from "@/model/Category";
import Course from "@/model/Course";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    // Parse the JSON body to extract `id`
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Category ID is required",
        },
        { status: 400 }
      );
    }

    // Fetch courses based on category ID
    const courses = await Course.find({ category: id }).populate("instructor");
    const category = await Category.findById(id);

    return NextResponse.json(
      {
        success: true,
        message: "Courses fetched successfully",
        data: courses,
        category: category,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          "An error occurred while fetching the courses. Please try again later or contact support.",
        success: false,
      },
      { status: 500 }
    );
  }
}
