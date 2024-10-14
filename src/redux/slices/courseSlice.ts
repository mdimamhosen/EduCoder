import { createSlice } from "@reduxjs/toolkit";

// Define the interface for the category object
export interface Category {
  _id: string;
  name: string;
  description: string;
}

// Define the interface for the subsection object
export interface SubSection {
  _id: string;
  title: string;
  timeDuration: string;
  description: string;
  videoUrl: string;
}

// Define the interface for the section object
export interface Section {
  _id: string;
  sectionName: string;
  subSection: SubSection[];
}

// Define the interface for the rating and review object
export interface RatingAndReview {
  user: string; // ObjectId as string
  rating: number;
  review: string;
  course: string; // ObjectId as string
}

// Define the interface for the user object
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: "Admin" | "Student" | "Instructor";
}

// Define the interface for the course object
export interface Course {
  _id?: string;
  courseName: string;
  courseDescription: string;
  instructor: string; // ObjectId of User
  whatYouWillLearn: string;
  courseContent: Section[];
  ratingAndReviews: RatingAndReview[];
  price: number;
  thumbnail: string;
  tag: string[];
  studentsEnrolled: User[]; // Array of enrolled users
  instructions: string[];
  status: "Draft" | "Published";
  createdAt: Date;
  category: Category[]; // Single category object
}

export enum COURSE_STATUS {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

// Define the initial state with the Course type
const initialState = {
  step: 1,
  course: {
    _id: "",
    courseName: "",
    courseDescription: "",
    instructor: "", // Add instructor field
    whatYouWillLearn: "",
    courseContent: [], // Initialize with an empty array
    ratingAndReviews: [], // Initialize with an empty array
    price: 0,
    thumbnail: "",
    tag: [],
    studentsEnrolled: [], // Initialize with an empty array
    instructions: [],
    status: "Draft",
    createdAt: new Date(),
    category: [
      {
        _id: "",
        name: "",
        description: "",
      },
    ],
  } as Course,
  editCourse: false,
  paymentLoading: false,
};

// Create the course slice
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      console.log("action.payload", action.payload);
      state.course = action.payload;
      console.log("state.course", state.course);
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
    resetCourseState: (state) => {
      state.step = 1;
      state.course = {
        _id: "",
        courseName: "",
        courseDescription: "",
        instructor: "", // Reset instructor field
        whatYouWillLearn: "",
        courseContent: [], // Reset course content
        ratingAndReviews: [], // Reset ratings and reviews
        price: 0,
        thumbnail: "",
        tag: [],
        studentsEnrolled: [], // Reset enrolled students
        instructions: [],
        status: "Draft",
        createdAt: new Date(),
        category: [
          {
            _id: "",
            name: "",
            description: "",
          },
        ],
      };
      state.editCourse = false;
    },
  },
});

// Export the actions and reducer
export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;
