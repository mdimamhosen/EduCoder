import DatabaseConnection from "@/lib/DBconnect";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Connect to the database
  await DatabaseConnection();

  try {
    // Parse the request body
    const { userId } = await req.json();

    // Validate input
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request.",
        },
        { status: 400 }
      );
    }

    // Find the user and populate the courses
    const courseWithId = await User.findById(userId).populate("courses").exec();

    // Check if the user exists
    if (!courseWithId) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // Return the populated user with courses
    return NextResponse.json(
      {
        success: true,
        data: courseWithId,
        message: "Courses fetched successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
