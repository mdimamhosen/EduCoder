import DatabaseConnection from "@/lib/DBconnect";
import { UploadFile } from "@/utils/Uploader";
import { NextResponse } from "next/server";
import SubSection from "@/model/SubSection";
import Section from "@/model/Section";
import Course from "@/model/Course";

export async function POST(req: Request) {
  await DatabaseConnection();

  try {
    const formData = await req.formData();
    const sectionId = formData.get("sectionId");
    const title = formData.get("title");
    const description = formData.get("description");
    const video = formData.get("video");
    const courseId = formData.get("courseId");

    if (!sectionId || !title || !description || !video || !courseId) {
      return NextResponse.json(
        {
          success: false,
          message: "All Fields are Mandatory",
        },
        { status: 400 }
      );
    }

    console.log({
      sectionId: sectionId,
      title: title,
      description: description,
      video: video,
      courseId: courseId,
    });
    const uploadDetails = await UploadFile(video as File, "videos");
    console.log("uploadDetails", uploadDetails.secure_url);

    const SubSectionDetails = await SubSection.create({
      title: title,
      description: description,
      videoUrl: uploadDetails.secure_url,
      timeDuration: uploadDetails.duration,
    });
    console.log("SubSectionDetails", SubSectionDetails._id);

    const updatedSection = await Section.findByIdAndUpdate(
      {
        _id: sectionId,
      },
      {
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();
    console.log("updatedSection", updatedSection._id);

    const updatedCourse = await Course.findByIdAndUpdate(courseId)
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
        message: "Video Uploaded Successfully",
        data: updatedCourse,
        updatedSection: updatedSection,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error Occurred while creating sub-section.",
      },
      { status: 500 }
    );
  }
}
