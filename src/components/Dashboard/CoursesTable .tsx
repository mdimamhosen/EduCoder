import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { COURSE_STATUS } from "@/utils/roles";
import { formattedDate } from "@/utils/dateFormatter";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSession } from "next-auth/react";
import { setEditCourse } from "@/redux/slices/courseSlice";
import ConfirmationModalForCourseDelete from "./ConfimationModalForCourseDelelte";
import toast from "react-hot-toast";

const CoursesTable = ({
  courses,
  setCourses,
  courseLoading,
}: {
  courses: any;
  courseLoading: boolean;
  setCourses: any;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user._id;

  const handleCourseDelete = async (courseId: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("courseId", courseId);
      formData.append("userId", userId);
      const response = await axios.post("/api/delete-courses", formData);
      if (response.data.success) {
        setCourses(response.data.data);
        toast.success("Course deleted successfully.");
      }
      setConfirmationModal(null);
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate random duration
  const generateRandomDuration = () => {
    const hours = Math.floor(Math.random() * 4) + 1; // Between 1 and 4 hours
    const minutes = Math.floor(Math.random() * 60); // Between 0 and 59 minutes
    return `${hours}hr ${minutes}min`;
  };

  const courseList = Array.isArray(courses) ? courses : [];

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800">
            <tr className="text-left text-sm font-medium uppercase text-gray-300">
              <th className="px-4 py-2">Courses</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700">
            {courseLoading ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-2xl font-medium text-gray-300"
                >
                  Loading courses...
                </td>
              </tr>
            ) : courseList.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-2xl font-medium text-gray-100"
                >
                  No courses found
                </td>
              </tr>
            ) : (
              courseList.map((course: any) => (
                <tr
                  key={course._id}
                  className="border-b border-gray-600 text-sm text-gray-200"
                >
                  <td className="px-4 py-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <img
                        src={course?.thumbnail}
                        className="h-[148px] w-full md:w-[220px] rounded-lg object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">
                          {course.courseName}
                        </p>
                        <p className="text-[12px]">
                          Created: {formattedDate(course.createdAt)}
                        </p>
                        {course.status === COURSE_STATUS.DRAFT ? (
                          <p className="flex w-fit items-center gap-2 rounded-full bg-gray-800 px-2 py-[2px] text-[12px] text-pink-100">
                            <HiClock size={14} />
                            Drafted
                          </p>
                        ) : (
                          <p className="flex w-fit items-center gap-2 rounded-full bg-gray-800 px-2 py-[2px] text-[12px] text-yellow-100">
                            <FaCheck size={8} />
                            Published
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  {/* Generating random time for each course */}
                  <td className="px-4 py-4">{generateRandomDuration()}</td>
                  <td className="px-4 py-4">${course.price}</td>
                  <td className="px-4 py-4 flex justify-center space-x-4">
                    <button
                      disabled={loading}
                      onClick={() => {
                        dispatch(setEditCourse(true));
                        router.push(`/dashboard/edit-course/${course._id}`);
                      }}
                      title="Edit"
                      className="hover:scale-110 hover:text-gray-300 transition-all duration-200"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleCourseDelete(course._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      title="Delete"
                      className="hover:scale-110 hover:text-pink-600 transition-all duration-200"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {confirmationModal && (
        <ConfirmationModalForCourseDelete modalData={confirmationModal} />
      )}
    </>
  );
};

export default CoursesTable;
