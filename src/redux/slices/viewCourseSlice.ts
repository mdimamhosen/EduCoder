import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the initial state
interface ViewCourseState {
  courseSectionData: any[];
  courseEntireData: any[];
  completedLectures: string[];
  totalNoOfLectures: number;
}

const initialState: ViewCourseState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action: PayloadAction<any[]>) => {
      state.courseSectionData = action.payload;
    },
    setEntireCourseData: (state, action: PayloadAction<any[]>) => {
      state.courseEntireData = action.payload;
    },
    setTotalNoOfLectures: (state, action: PayloadAction<number>) => {
      state.totalNoOfLectures = action.payload;
    },
    setCompletedLectures: (state, action: PayloadAction<string[]>) => {
      state.completedLectures = action.payload;
    },
    updateCompletedLectures: (state, action: PayloadAction<string>) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
  },
});

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;
