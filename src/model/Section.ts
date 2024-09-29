import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "SubSection",
    },
  ],
});

export const Section =
  mongoose.models.Section || mongoose.model("Section", sectionSchema);
