"use client";
import CourseReviewModal from "@/components/viewCourse/CourseReviewModal";
import VideoDetails from "@/components/viewCourse/VideoDetails";
import VideoDetailsSidebar from "@/components/viewCourse/VideoDetailsSidebar";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "@/redux/slices/viewCourseSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ViewCourse = () => {
  const { courseId } = useParams();
  const { data: session, status } = useSession();
  const user = session?.user;
  const dispatch = useDispatch();

  // State for review modal and loading
  const [reviewModal, setReviewModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Start loading
        setLoading(true);

        // Fetch course details
        const response = await axios.post("/api/getCourseFullDetails", {
          courseId: courseId,
          userId: user._id,
        });

        const courseData = response.data;

        dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
        dispatch(setEntireCourseData(courseData.courseDetails));

        // Calculate total number of lectures
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec: any) => {
          lectures += sec.subSection.length;
        });
        dispatch(setTotalNoOfLectures(lectures));
        console.log("lectures: " + lectures);
      } catch (error) {
        console.error("Failed to fetch course data:", error);
      } finally {
        // End loading
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, user, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)] bg-slate-800 text-gray-200">
        <p>Loading course data...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)] bg-slate-800">
      {/* Sidebar on the left or top based on screen size */}
      <VideoDetailsSidebar setReviewModal={setReviewModal} />

      {/* Video details section */}
      <div className="flex-1  ">
        <VideoDetails />
      </div>

      {/* Conditional rendering of the review modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
