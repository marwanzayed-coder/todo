import { Schema, model } from "mongoose";
const todoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});
export default model("todo", todoSchema);
//# sourceMappingURL=todo.js.map