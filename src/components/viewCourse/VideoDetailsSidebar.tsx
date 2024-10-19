import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import IconBtn from "../common/IconBtn";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import { updateCompletedLectures } from "@/redux/slices/viewCourseSlice";
const VideoDetailsSidebar = ({ setReviewModal }: { setReviewModal: any }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const router = useRouter();
  //   const location = useLocation()
  const { sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state: RootState) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);
  return (
    <div>
      {" "}
      <>
        <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-gray-600 bg-gray-800">
          <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-gray-600 py-5 text-lg font-bold text-gray-200">
            <div className="flex w-full items-center justify-between ">
              <div
                onClick={() => {
                  router.push(`/dashboard/enrolled-courses`);
                }}
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-gray-900 p-1 text-gray-200 hover:scale-90"
                title="back"
              >
                <IoIosArrowBack size={30} />
              </div>
              <IconBtn
                text="Add Review"
                customClasses="ml-auto"
                onclick={() => setReviewModal(true)}
              />
            </div>
            <div className="flex flex-col">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-gray-200">
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
            </div>
          </div>

          <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
            {courseSectionData.map((course, index) => (
              <div
                className="mt-2 cursor-pointer text-sm text-gray-300"
                onClick={() => setActiveStatus(course?._id)}
                key={index}
              >
                {/* Section */}
                <div className="flex flex-row justify-between bg-gray-700 px-5 py-4">
                  <div className="w-[70%] font-semibold">
                    {course?.sectionName}
                  </div>
                  <div className="flex items-center gap-3">
                    {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                    <span
                      className={`${
                        activeStatus === course?.sectionName
                          ? "rotate-0"
                          : "rotate-180"
                      } transition-all duration-500`}
                    >
                      <BsChevronDown />
                    </span>
                  </div>
                </div>

                {/* Sub Sections */}
                {activeStatus === course?._id && (
                  <div className="transition-[height] duration-500 ease-in-out">
                    {course.subSection.map((topic, i) => (
                      <div
                        className={`flex gap-3  px-5 py-2 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-400 font-semibold text-gray-800"
                            : "hover:bg-gray-900"
                        } `}
                        key={i}
                        onClick={() => {
                          router.push(
                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                          );
                          setVideoBarActive(topic._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => {
                            dispatch(updateCompletedLectures(topic?._id));
                          }}
                        />
                        {topic.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default VideoDetailsSidebar;
