import DatabaseConnection from "@/lib/DBconnect";
import { Category } from "@/model/Category";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        {
          message: "Name and description are required.",
          success: false,
        },
        { status: 400 }
      );
    }

    const checkCategoryPresent = await Category.findOne({ name });

    if (checkCategoryPresent) {
      return NextResponse.json(
        {
          message: "Category already exists.",
          success: false,
        },
        { status: 400 }
      );
    }

    const newCategory = await Category.create({ name, description });
    return NextResponse.json(
      {
        message: "Category created successfully.",
        success: true,
        data: newCategory,
        new: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          "An error occurred while creating category. Please try again later or contact support.",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await DatabaseConnection();
  try {
    const categories = await Category.find({});
    return NextResponse.json(
      {
        success: true,
        message: "Categories fetched successfully.",
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          "An error occurred while fetching categories. Please try again later or contact support.",
        success: false,
      },
      { status: 500 }
    );
  }
}
