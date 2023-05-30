import { Router } from "express";
import { todoController } from "../controllers/todo.js";
const { create, getAllInUser, changeDone, delete: DeleteTask } = todoController;
export const taskRouter = Router();

taskRouter.post("/", create);
taskRouter.get("/:id", getAllInUser);
taskRouter.put("/change-done/:id", changeDone);
taskRouter.delete("/:id", DeleteTask);
