import DatabaseConnection from "@/lib/DBconnect";
import { Category } from "@/model/Category";
import Course from "@/model/Course";
import User from "@/model/User";
import { UploadFile } from "@/utils/Uploader";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const courseName = formData.get("courseName");
    const courseDescription = formData.get("courseDescription");
    const whatYouWillLearn = formData.get("whatYouWillLearn");
    const price = formData.get("price");
    const tag = formData.getAll("tag");
    const category = formData.get("category");
    const status = formData.get("status") || "Draft";
    const instructions = formData.getAll("instructions");
    const thumbnail = formData.get("thumbnailImage");

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All Fields are Mandatory",
        },
        { status: 400 }
      );
    }

    // console.log({
    //   userId: userId,
    //   courseName: courseName,
    //   courseDescription: courseDescription,
    //   whatYouWillLearn: whatYouWillLearn,
    //   price: price,
    //   tag: tag,
    //   category: category,
    //   status: status,
    //   instructions: instructions,
    //   thumbnail: thumbnail,
    // });

    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return NextResponse.json(
        {
          success: false,
          message: "Instructor Details Not Found",
        },
        { status: 404 }
      );
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return NextResponse.json(
        {
          success: false,
          message: "Category Details Not Found",
        },
        { status: 404 }
      );
    }
    // Assuming 'thumbnail' is a FormDataEntryValue from a form submission
    if (!(thumbnail instanceof File)) {
      throw new Error("Thumbnail must be a file");
    }

    const thumbnailImage = await UploadFile(
      thumbnail,
      "educoder-course-thumbnails"
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions,
    });

    await User.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    await Category.findByIdAndUpdate(
      category,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully",
        data: newCourse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          "An error occurred while creating the course. Please try again later or contact support.",
        success: false,
      },
      { status: 500 }
    );
  }
}
