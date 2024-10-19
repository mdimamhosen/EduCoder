import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import IconBtn from "../common/IconBtn";
import toast from "react-hot-toast";
import axios from "axios";
import { setTotalNoOfLectures } from "@/redux/slices/viewCourseSlice";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import gif from "../../../public/Assets/gif/d86ceb1ad552398787fb76f343080aa6_Selfie_Robot_Mascot_GIF_by_Manu_on_Dribbble.gif";
const VideoDetails = () => {
  // URL Params
  const { courseId, sectionId, subSectionId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // Auth session
  const { data: session } = useSession();
  const token = session?.user;

  // State initialization
  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completedLectures, setCompletedLectures] = useState([]);

  // Course data states
  const [courseSectionData, setCourseSectionData] = useState([]);
  const [courseEntireData, setCourseEntireData] = useState({});

  // Fetch course details and update Redux store
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/getCourseFullDetails-Details", {
          courseId: courseId,
          userId: token._id,
        });
        setCourseSectionData(response.data.data1.courseContent);
        setCourseEntireData(response.data.data1);

        let totalLectures = 0;
        response.data.data1.courseContent.forEach((section) => {
          totalLectures += section.subSection.length;
        });
        dispatch(setTotalNoOfLectures(totalLectures));
      } catch (error) {
        console.error("Failed to fetch course data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && token?._id) fetchCourseDetails();
  }, [courseId, token, dispatch]);

  // Set video details based on section and subsection
  useEffect(() => {
    if (!courseId || !sectionId || !subSectionId) {
      router.push(`/dashboard/enrolled-courses`);
      return;
    }

    setLoading(true);
    const filteredData = courseSectionData.find(
      (course) => course._id === sectionId
    );

    if (!filteredData || !filteredData.subSection) {
      console.error("No subsection found for this section");
      setLoading(false);
      return;
    }

    const filteredVideoData = filteredData.subSection.find(
      (data) => data._id === subSectionId
    );

    if (filteredVideoData) {
      setVideoData(filteredVideoData);
      setPreviewSource(courseEntireData?.thumbnail || "");
      setVideoEnded(false);
    } else {
      console.error("Video data not found for this subsection");
    }
    setLoading(false);
  }, [courseSectionData, courseEntireData, courseId, sectionId, subSectionId]);

  // Check if it's the first video
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    return currentSectionIndx === 0 && currentSubSectionIndx === 0;
  };

  // Check if it's the last video
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection.length;
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    );
  };

  // Go to next video
  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSubSectionIndx !==
      courseSectionData[currentSectionIndx].subSection.length - 1
    ) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id;
      router.push(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else if (currentSectionIndx < courseSectionData.length - 1) {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id;
      router.push(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  // Go to previous video
  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndx > 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id;
      router.push(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else if (currentSectionIndx > 0) {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      router.push(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  // Mark lecture as completed
  const handleLectureCompletion = async () => {
    setLoading(true);
    console.log(courseId, sectionId, subSectionId);
    try {
      await axios.post("/api/markLectureCompleted", {
        courseId,
        sectionId,
        subSectionId,
        userId: token._id,
      });

      toast.success("Lecture marked as completed");
      setCompletedLectures((prev) => [...prev, subSectionId]);
    } catch (error) {
      console.error("Failed to mark lecture as completed:", error);
      toast.error("Failed to mark as completed");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    <p className="text-center flex justify-center items-center text-xl min-h-[calc(100vh-3.5rem)] text-gray-100">
      <p>Loading...</p>
    </p>;
  }

  return (
    <div className="mx-auto p-6   flex justify-center items-center flex-col  min-h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col gap-5 text-white ">
        {loading ? (
          <p className="text-center text-xl min-h-[calc(100vh-3.5rem)] text-gray-100">
            Loading...
          </p>
        ) : (
          <>
            {videoData ? (
              <video
                width="800px"
                height="450px"
                controls
                onEnded={() => setVideoEnded(true)}
                className="h-30 w-30"
              >
                <source src={videoData?.videoUrl} type="video/mp4" />
                <source src={videoData?.videoUrl} type="video/mov" />
                <source src={videoData?.videoUrl} type="video/avi" />
                <source src={videoData?.videoUrl} type="video/mkv" />
                <source src={videoData?.videoUrl} type="video/wmv" />
                <source src={videoData?.videoUrl} type="video/flv" />
                <source src={videoData?.videoUrl} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <p className="text-center text-gray-400">
                  Loading , please wait...
                </p>
                <Image
                  width={500}
                  height={500}
                  src={gif}
                  alt="Preview"
                  className="h-30 w-30 rounded-lg object-cover shadow-md "
                />
              </>
            )}
          </>
        )}
      </div>
      <div className="my-4 text-gray-300 ">
        <h2 className="text-lg font-semibold text-gray-100 ">
          Title: {videoData?.title}
        </h2>
        <p>{videoData?.description}</p>
      </div>

      <div className="mt-2 flex flex-col gap-2 lg:flex-row">
        {!videoEnded && !completedLectures.includes(subSectionId) ? (
          <>
            {/* <button
              className={`${
                isFirstVideo() ? "cursor-not-allowed opacity-50" : ""
              } bg-yellow-500 px-4 py-2 font-bold text-black flex items-center gap-2 hover:scale-95 transition-all duration-300 ease-in-out`}
              onClick={handleLectureCompletion}
            >
              Mark As Completed
            </button> */}
          </>
        ) : null}

        {!isFirstVideo() && (
          <button
            className={`${
              isFirstVideo() ? "cursor-not-allowed opacity-50" : ""
            } bg-yellow-500 px-4 py-2 font-bold text-black flex items-center gap-2 hover:scale-95 transition-all duration-300 ease-in-out`}
            disabled={isFirstVideo()}
            onClick={goToPrevVideo}
          >
            <FaLongArrowAltLeft /> Previous Video
          </button>
        )}

        {!isLastVideo() && (
          <button
            className={`${
              isLastVideo() ? "cursor-not-allowed opacity-50" : ""
            } bg-yellow-500 px-4 py-2 font-bold text-black flex items-center gap-2 hover:scale-95 transition-all duration-300 ease-in-out`}
            disabled={isLastVideo()}
            onClick={goToNextVideo}
          >
            Next Video <FaLongArrowAltRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;
