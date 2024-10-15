import { ACCOUNT_TYPE } from "@/utils/roles";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount", // Icon for user account
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard", // Icon for dashboard
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm", // Icon for virtual machine (courses)
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd", // Icon for adding a course
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard", // Icon for enrolled courses
  },
  {
    id: 6,
    name: "Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscArchive", // Icon for cart
  },
  {
    id: 7,
    name: "All Instructors",
    path: "/dashboard/all-instructors",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscSymbolClass",
  },
  {
    id: 8,
    name: "All Students",
    path: "/dashboard/all-students",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscMortarBoard", // Icon for group of students
  },
  {
    id: 9,
    name: "Income Report",
    path: "/dashboard/income-report",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscGraph", // Icon for income report
  },
];
