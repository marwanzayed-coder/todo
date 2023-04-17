import { ObjectId, Schema, model } from "mongoose";

interface ITodo {
  name: string;
  desc: string;
  done: boolean;
  user: ObjectId;
}

const todoSchema = new Schema<ITodo>({
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

export default model<ITodo>("todo", todoSchema);
