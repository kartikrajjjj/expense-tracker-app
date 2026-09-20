import { Router } from "express";

import { createUser, login, sendEmail , forgotPassword} from "./user.controller.js";

const userRouter = Router();

userRouter.post("/signup", createUser);

userRouter.post("/login", login);

userRouter.post("/send-mail", sendEmail);

userRouter.post("/forgot-password", forgotPassword);

export default userRouter;