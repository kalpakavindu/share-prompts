import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: [true, "Username already exists!"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
