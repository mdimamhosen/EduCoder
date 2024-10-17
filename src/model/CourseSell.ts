import mongoose, { Schema, model, models } from "mongoose";

// CourseSell Schema
const courseSellSchema = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
    },
    boughtAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Export CourseSell model
const CourseSell = models.CourseSell || model("CourseSell", courseSellSchema);

export default CourseSell;
