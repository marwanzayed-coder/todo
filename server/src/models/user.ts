import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  email: () => string;
  password: string;
  isModified?: any;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "Email already exists !"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters."],
  },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default model<IUser>("user", userSchema);
