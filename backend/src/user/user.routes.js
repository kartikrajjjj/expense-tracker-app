import { Router } from "express";

import { 
    createUser,
    login, 
    sendEmail , 
    forgotPassword, 
    verifyToken,
    changePassword,
    logout
} from "./user.controller.js";
import { AdminUserGuard, verifyTokenGuard } from "../middleware/guard.middleware.js";

const userRouter = Router();

userRouter.post("/signup", createUser);

userRouter.post("/login", login);

userRouter.get("/logout", logout);

userRouter.post("/send-mail", sendEmail);

userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/verify-token",verifyTokenGuard, verifyToken);

userRouter.put("/change-password",verifyTokenGuard, changePassword);

userRouter.get("/session",AdminUserGuard, (req,res)=>{
    return res.json(req.user);
});

export default userRouter;