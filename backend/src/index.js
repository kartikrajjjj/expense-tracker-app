import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import userRouter from "./user/user.routes.js";

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use(morgan("dev"));



app.use("/api/user", userRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.get("/",(req,res)=>{
    res.send("Welcome to expense Tracker API");
});
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch(() => {
        console.log("Database not connected");
    });