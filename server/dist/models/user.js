import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
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
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
export default model("user", userSchema);
//# sourceMappingURL=user.js.map