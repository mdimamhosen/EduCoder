import { RootState } from "@/redux/reducer";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../ConfirmationModal";
import toast from "react-hot-toast";
import axios from "axios";
import { setCourse } from "@/redux/slices/courseSlice";

// Define interfaces for sections and subsections
interface SubSection {
  _id: string;
  title: string;
}

interface Section {
  _id: string;
  sectionName: string;
  subSection: SubSection[];
}

interface Course {
  _id: string;
  courseContent: Section[];
}

interface ModalData {
  text1: string;
  text2: string;
  btn1Text: string;
  btn2Text: string;
  btn1Handler: () => void;
  btn2Handler: () => void;
}

interface NestedViewProps {
  handleChangeEditSectionName: (sectionId: string, sectionName: string) => void;
  courseId?: any;
}

export default function NestedView({
  handleChangeEditSectionName,
}: NestedViewProps) {
  const { course } = useSelector((state: RootState) => state.course);
  const dispatch = useDispatch();

  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState<string | null>(null);
  const [viewSubSection, setViewSubSection] = useState<SubSection | null>(null);
  const [editSubSection, setEditSubSection] = useState<
    (SubSection & { sectionId: string }) | null
  >(null);
  // To keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState<ModalData | null>(
    null
  );

  const handleDeleteSection = async (sectionId: any) => {
    try {
      const result = await axios.delete(`/api/section`, {
        data: {
          sectionId: sectionId,
          courseId: course._id,
        },
      });
      if (result.data.success) {
        dispatch(setCourse(result.data.data));
      }
      toast.success("Section Deleted Successfully!");
      setConfirmationModal(null);
    } catch (error) {
      console.error("Error deleting section:", error);
      toast.error("Error deleting section!");
    }

    toast.success("Section Deleted Successfully!");
  };

  const handleDeleteSubSection = async (
    subSectionId: string,
    sectionId: string
  ) => {
    // Implement the deleteSubSection logic here.
    // const result = await deleteSubSection({ subSectionId, sectionId, token })
    // if (result) {
    //   const updatedCourseContent = course.courseContent.map((section) =>
    //     section._id === sectionId ? result : section
    //   );
    //   const updatedCourse = { ...course, courseContent: updatedCourseContent };
    //   dispatch(setCourse(updatedCourse));
    // }
    // setConfirmationModal(null);
    toast.success("Lecture Deleted Successfully!");
  };

  return (
    <>
      <div className="rounded-lg bg-gray-800 p-6 px-8" id="nestedViewContainer">
        {course?.courseContent?.map((section) => (
          // Section Dropdown
          <details key={section._id} open>
            {/* Section Dropdown Content */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-gray-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-gray-300" />
                <p className="font-semibold text-gray-300">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit className="text-xl text-gray-300" />
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  <RiDeleteBin6Line className="text-xl text-gray-300" />
                </button>
                <span className="font-medium text-gray-300">|</span>
                <AiFillCaretDown className={`text-xl text-gray-300`} />
              </div>
            </summary>
            <div className="px-6 pb-4">
              {/* Render All Sub Sections Within a Section */}
              {section.subSection.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-gray-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-gray-300" />
                    <p className="font-semibold text-gray-400">{data.title}</p>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit className="text-xl text-gray-400" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-gray-300" />
                    </button>
                  </div>
                </div>
              ))}
              {/* Add New Lecture to Section */}
              <button
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
          view={false}
          courseId={course._id}
          edit={false}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
          add={false}
          edit={false}
          courseId={course._id}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
          view={false}
          courseId={course._id}
          add={false}
        />
      ) : null}
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : null}
    </>
  );
}
