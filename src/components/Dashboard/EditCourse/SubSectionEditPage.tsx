import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";

import IconBtn from "@/components/common/IconBtn";
import axios from "axios";
import Upload from "../AddCourse/Upload";
import { useRouter } from "next/navigation";

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface Course {
  _id?: string;
  courseName: string;
  courseDescription: string;
  price: number;
  tag: string[];
  courseContent: Section[];
  status: "Draft" | "Published";
  category: Category;
}

interface Section {
  _id: string;
  sectionName: string;
  subSection: SubSection[];
}

interface SubSection {
  _id: string;
  title: string;
  timeDuration: string;
  description: string;
  videoUrl: string;
}

export default function SubSectionEditPageModal({
  modalData,
  setModalData,
  add,
  view,
  edit,
  courseId,
  editpage,
}: {
  modalData: any;
  setModalData: any;
  add: boolean;
  view: boolean;
  edit: boolean;
  courseId: any;
  editpage?: boolean;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);

  // Define the getCourseDetails function
  const getCourseDetails = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("courseId", String(courseId));
      const response = await axios.post(`/api/single-course`, formData);
      if (response.data.success) {
        setCourse(response.data.data);
      } else {
        toast.error("Failed to fetch course details.");
      }
    } catch (error) {
      toast.error("Error fetching course details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourseDetails(); // Fetch course details on component mount
  }, []);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, [modalData, setValue, view, edit]);

  // Detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    );
  };

  // Handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    try {
      const result = await axios.post("/api/editSubSection", formData);
      if (result.data.success) {
        toast.success("Subsection updated successfully!");
      } else {
        toast.error("Error updating subsection!");
      }
    } catch (error) {
      console.error("Error updating subsection:", error);
      toast.error("Error updating subsection!");
    }
  };
  const router = useRouter();
  const onSubmit = async (data: any) => {
    if (view) {
      console.log("viewing");
      return;
    }

    if (edit) {
      console.log("editing");
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
      } else {
        await handleEditSubsection(); // Await the edit function
        await getCourseDetails(); // Fetch updated data after editing
      }
      return;
    }

    const formData = new FormData();
    if (modalData) {
      formData.append("sectionId", modalData);
    }
    if (data.lectureTitle) {
      formData.append("title", data.lectureTitle);
    }
    if (data.lectureDesc) {
      formData.append("description", data.lectureDesc);
    }

    if (data.lectureVideo) {
      formData.append("video", data.lectureVideo);
    }
    formData.append("courseId", String(courseId));

    setLoading(true);

    try {
      const result = await axios.post("/api/subSection", formData);

      if (result.data.success) {
        router.refresh();
        await getCourseDetails();
        toast.success("Lecture added successfully!");
      } else {
        toast.error("Error adding lecture!");
      }
    } catch (error) {
      console.error("Error adding lecture:", error);
      toast.error("Error adding lecture!");
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-gray-600 bg-gray-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5">
          <p className="text-xl font-semibold text-gray-300">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-gray-400" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm lable-style" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm lable-style" htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                type="submit"
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
