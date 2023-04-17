import { Router } from "express";
import { todoController } from "../controllers/todo.js";
const { create, getAllInUser, changeDone, delete: DeleteTask } = todoController;
import { CheckHeader } from "../middlewares/authHeader.js";
export const taskRouter = Router();

taskRouter.post("/", CheckHeader, create);
taskRouter.get("/:id", CheckHeader, getAllInUser);
taskRouter.put("/change-done/:id", CheckHeader, changeDone);
taskRouter.delete("/:id", CheckHeader, DeleteTask);
