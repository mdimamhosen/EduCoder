import DatabaseConnection from "@/lib/DBconnect";
import Course from "@/model/Course";
import Section from "@/model/Section";
import SubSection from "@/model/SubSection";

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  await DatabaseConnection();

  try {
    const { sectionName, courseId } = await req.json();
    console.log("sectionName", sectionName);
    console.log("courseId", courseId);
    if (!sectionName || !courseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required properties",
        },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found.",
        },
        { status: 404 }
      );
    }
    console.log("coourse found");

    // Create the new section
    const createdSection = await Section.create({ sectionName });
    console.log("created a section");

    // Update the course by adding the new section to its courseContent
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: createdSection._id },
      },
      {
        new: true,
        strictPopulate: false,
      }
    )
      .populate({
        path: "courseContent",
      })
      .exec();

    return NextResponse.json(
      {
        success: true,
        message: "Section created successfully.",
        data: updatedCourse,
        section: createdSection,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating section:", error); // Improved error logging
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while creating the section.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await DatabaseConnection();
  try {
    const { sectionId, sectionName, courseId } = await req.json();
    console.log({
      sectionId: sectionId,
      sectionName: sectionName,
      courseId: courseId,
    });
    if (!sectionId || !sectionName || !courseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required properties",
        },
        { status: 400 }
      );
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found.",
        },
        { status: 404 }
      );
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      new: true,
      arrayFilters: [
        {
          "section._id": sectionId,
        },
      ],
    })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return NextResponse.json(
      {
        success: true,
        message: "Section updated successfully.",
        data: updatedCourse,
        section: updatedSection,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating section:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while updating the section.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await DatabaseConnection();
  try {
    const { sectionId, courseId } = await req.json();
    console.log({
      sectionId: sectionId,
      courseId: courseId,
    });

    // Check if the required parameters are provided
    if (!sectionId || !courseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required properties",
        },
        { status: 400 }
      );
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found.",
        },
        { status: 404 }
      );
    }

    // Find the section to be deleted
    const section = await Section.findById(sectionId);
    if (!section) {
      return NextResponse.json(
        {
          success: false,
          message: "Section not found.",
        },
        { status: 404 }
      );
    }

    // Delete all associated subsections
    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    // Delete the section
    const deletedSection = await Section.findByIdAndDelete(sectionId);

    // Remove the section from the course content
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { courseContent: sectionId },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Section and associated subsections deleted successfully.",
        data: updatedCourse,
        section: deletedSection,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting section and subsections:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while deleting the section and subsections.",
      },
      { status: 500 }
    );
  }
}
