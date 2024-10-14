import mongoose from "mongoose";
import SubSection from "./SubSection";

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: SubSection,
    },
  ],
});

const Section =
  mongoose.models.Section || mongoose.model("Section", sectionSchema);
export default Section;
