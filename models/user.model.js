import { Timestamp } from "mongodb";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    image: {
      type: String,
    },
    bookmarks: {
      type: [Schema.Types.ObjectId],
      ref: "Property",
    },
  },
  { timestamps: true }
);

const User = models.user || model("User", userSchema);

export default User;
