import express from "express";
import { signin, signup } from "../controllers/auth"; // Ensure correct import path without the .js extension
import { sendEmail } from "../controllers/email";
import { verify } from "../controllers/otpVerify";

const router = express.Router();

// SIGN UP
router.post("/signup", signup);

// SIGN IN
router.post("/signin", signin);
// OTP Login
router.post("/otp-login", sendEmail);
// OTP Verify
router.post("/otp-verify", verify);

export default router;
