import { createSlice } from "@reduxjs/toolkit";

export interface Category {
  _id: string;
  name: string;
  description: string;
}
// Define the interface for the course object
export interface Course {
  _id?: string;
  courseName: string;
  courseDescription: string;
  whatYouWillLearn: string;
  price: number;
  thumbnail: string;
  tag: string[];
  instructions: string[];
  status: "Draft" | "Published";
  category: Category[];
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
    whatYouWillLearn: "",
    price: 0,
    thumbnail: "",
    tag: [],
    instructions: [],
    status: "Draft",
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
      state.course = action.payload;
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
        courseName: "",
        courseDescription: "",
        whatYouWillLearn: "",
        price: 0,
        thumbnail: "",
        tag: [],
        instructions: [],
        status: "Draft",
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
