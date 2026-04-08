import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      default: "", // for Google login
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profilePic: {
      type: String,
      default: "",
    },

    // NEW FIELDS
    phone: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
