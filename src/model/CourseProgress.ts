import mongoose from "mongoose";
import Course from "./Course";
import User from "./User";
import SubSection from "./SubSection";

const courseProgressSchema = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Course,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: SubSection,
    },
  ],
});

const CourseProgress =
  mongoose.models.CourseProgress ||
  mongoose.model("CourseProgress", courseProgressSchema);

export default CourseProgress;
