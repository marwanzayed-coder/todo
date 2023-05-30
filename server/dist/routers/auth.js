import { Router } from "express";
import { authController } from "../controllers/auth.js";
const { register, login } = authController;
export const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
//# sourceMappingURL=auth.js.map