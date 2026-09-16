import { Router } from "express";

import { createUser, login, sendEmail } from "./user.controller.js";

const userRouter = Router();

userRouter.post("/signup", createUser);

userRouter.post("/login", login);

userRouter.post("/send-mail", sendEmail);

export default userRouter;