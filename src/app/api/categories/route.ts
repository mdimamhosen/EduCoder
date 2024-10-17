import DatabaseConnection from "@/lib/DBconnect";
import { Category } from "@/model/Category";
import { NextResponse } from "next/server";

export async function GET() {
  await DatabaseConnection();

  try {
    const categories = await Category.find({});

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
}
