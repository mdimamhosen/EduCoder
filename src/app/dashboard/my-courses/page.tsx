"use client";
import IconBtn from "@/components/common/IconBtn";
import CoursesTable from "@/components/Dashboard/CoursesTable ";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";

const MyCourses = () => {
  const { data: session, status } = useSession();
  const userId = session?.user._id;
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      //   const result = await fetchInstructorCourses(token)
      //   if (result) {
      //     setCourses(result)
      //   }
    };
    // fetchCourses()
  }, []);
  return (
    <div>
      <div className="my-7 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-gray-300">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => router.push("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;
