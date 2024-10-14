import mongoose from "mongoose";
import User from "./User";
import Section from "./Section";
import RatingAndReview from "./RatingAndReview";
import { Category } from "./Category";

const CSchema = new mongoose.Schema({
  courseName: { type: String },
  courseDescription: { type: String },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  whatYouWillLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Section,
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  tag: {
    type: [String],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  instructions: {
    type: [String],
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.models.Course || mongoose.model("Course", CSchema);
export default Course;
