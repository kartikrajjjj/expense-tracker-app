import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail.js";
import { otpTemplate } from "../utils/otp.template.js";
import { generateOTP } from "../utils/generateOTP.js";
import { forgotPasswordTemplate } from "../utils/forgot-template.js";

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const user = new UserModel(data);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const OTP = generateOTP();
    const isEmail = await UserModel.findOne({ email });
    if (isEmail) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    const sent = await sendMail(email, "OTP for signup", otpTemplate(OTP));

    if (!sent) {
      return res.status(500).json({
        message: "Email failed to send",
        success: false,
      });
    }

    res.json({
      message: "Email sent successfully",
      otp: OTP,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createToken = async (user) => {
  const payload = {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
  };
  const token = await jwt.sign(payload, process.env.AUTH_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isLogged = await bcrypt.compare(password, user.password);
    if (!isLogged) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const token = await createToken(user);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT !== "DEV",
      sameSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
      path: "/",
      domain: undefined,
      maxAge: 86400000,
    });
    res.json({ message: "Login successful", role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("authToken", null, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT !== "DEV",
      sameSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
      path: "/",
      domain: undefined,
      maxAge: 0,
    });
     res.status(200).json({ message:"Logout successful" });
  } catch (err) {
    res.status(401).json({ message: err.message || "Logout failed" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exists" });

    const token = await jwt.sign(
      { id: user._id },
      process.env.FORGOT_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    console.log(token);
    const link = `${process.env.DOMAIN}/forgot-password?token=${token}`;
    const sent = await sendMail(
      email,
      "Expense - forgot password ?",
      forgotPasswordTemplate(user.fullname, link),
    );

    if (!sent) return res.status(424).json({ message: "Failed to send email" });

    res.json({ message: "Please check your email to reset password" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const verifyToken = async (req, res) => {
  try {
    res.json("Verification successful");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const encrypted = await bcrypt.hash(password.toString(), 12);
    await UserModel.findByIdAndUpdate(req.user.id, { password: encrypted });
    res.json("Password updated successful");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
