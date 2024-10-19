import mongoose from "mongoose";
import User from "./User";

const ratingAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
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

const RatingAndReview =
  mongoose.models.RatingAndReview ||
  mongoose.model("RatingAndReview", ratingAndReviewSchema);
export default RatingAndReview;
