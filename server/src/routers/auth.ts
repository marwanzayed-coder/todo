import { Router } from "express";
import { authController } from "../controllers/auth.js";
const { register, login } = authController;
import { CheckHeader } from "../middlewares/authHeader.js";
export const authRouter = Router();

authRouter.post("/register", CheckHeader, register);
authRouter.post("/login", CheckHeader, login);
