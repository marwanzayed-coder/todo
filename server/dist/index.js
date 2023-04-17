import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import compression from "compression";
import bodyParser from "body-parser";
import { authRouter } from "./routers/auth.js";
import { taskRouter } from "./routers/todo.js";
const app = express();
const PORT = +process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.options("*", cors());
app.use(compression());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: "Too many accounts created from this IP, please try again after an hour",
});
app.use("/", limiter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);
// Connect to db
const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.log(err.message);
    }
};
connectToDB();
app.listen(PORT, () => {
    console.log(`mode: ${process.env.NODE_ENV}`);
    console.log(`Server Running in Port ${PORT}`);
});
//# sourceMappingURL=index.js.map