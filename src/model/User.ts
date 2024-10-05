import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
      type: String,
      trim: true,
    },

    // Define the password field with type String and required
    password: {
      type: String,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    accountType: {
      type: String,
      enum: ["Admin", "Student", "Instructor"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
    },
    courseProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseProgress",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
