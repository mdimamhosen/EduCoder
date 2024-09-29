import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  rating: {
    type: Number,
  },
  review: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    index: true,
  },
});

export const RatingAndReview =
  mongoose.models.RatingAndReview ||
  mongoose.model("RatingAndReview", ratingAndReviewSchema);
