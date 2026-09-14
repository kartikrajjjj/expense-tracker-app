import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./user/user.routes.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));



app.use("/api/user", userRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch(() => {
        console.log("Database not connected");
    });