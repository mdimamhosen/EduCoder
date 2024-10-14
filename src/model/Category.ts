import mongoose from "mongoose";
import Course from "./Course";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: { type: String },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Course,
    },
  ],
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
