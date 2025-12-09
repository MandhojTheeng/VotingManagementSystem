// backend/index.js — FINAL CLEAN VERSION
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  });

const User = require("./models/User");
const Election = require("./models/Election");

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_2025";

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ======================== AUTH ROUTES ========================

// REGISTER (unchanged)
app.post("/api/auth/register", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, citizenshipNo, phone } = req.body;
    if (!fullName || !email || !password || !citizenshipNo || !phone) return res.status(400).json({ message: "All fields required" });
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

    const normalizedEmail = email.trim().toLowerCase();

    const [e1, e2, e3] = await Promise.all([
      User.findOne({ email: normalizedEmail }),
      User.findOne({ citizenshipNo }),
      User.findOne({ phone })
    ]);

    if (e1 || e2 || e3) return res.status(400).json({ message: "Already registered" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      fullName,
      email: normalizedEmail,
      password: hashed,
      citizenshipNo,
      phone,
      role: "voter"
    });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN (unchanged)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// SEND OTP — BEAUTIFUL EMAIL + ONLY SHOWS OTP IN CONSOLE
app.post("/api/auth/forgot-password-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.json({ message: "If registered, OTP has been sent." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 600000; // 10 mins
    await user.save();

    // Only show OTP in console — no other debug
    console.log(`OTP for ${user.email}: ${otp}`);

    await transporter.sendMail({
      from: `"Election Commission Nepal" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Secure Password Reset Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset</title>
          <style>
            body { margin:0; background:#f0f9ff; font-family:'Segoe UI',Arial,sans-serif; }
            .container { max-width:600px; margin:40px auto; background:white; border-radius:20px; overflow:hidden; box-shadow:0 20px 40px rgba(30,64,175,0.1); }
            .header { background:linear-gradient(135deg,#1e40af,#3b82f6); padding:40px; text-align:center; color:white; }
            .header h1 { margin:0; font-size:32px; font-weight:900; }
            .header p { margin:10px 0 0; font-size:18px; opacity:0.9; }
            .body { padding:50px 40px; text-align:center; text-align:center; }
            .otp-box { background:#f8faff; border:3px dashed #3b82f6; border-radius:16px; padding:30px; margin:30px auto; max-width:320px; }
            .otp { font-size:52px; letter-spacing:15px; color:#1e40af; font-weight:bold; margin:0; }
            .footer { background:#1e3a8a; color:#e0f2fe; padding:25px; text-align:center; font-size:14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Election Commission Nepal</h1>
              <p>निर्वाचन आयोग नेपाल</p>
            </div>
            <div class="body">
              <h2 style="color:#1e40af;">Password Reset Request</h2>
              <p style="font-size:18px;color:#4b5563;">Hello <strong>${user.fullName}</strong>,</p>
              <p style="font-size:18px;color:#4b5563;margin:25px 0;">Your secure verification code is:</p>
              <div class="otp-box">
                <div class="otp">${otp}</div>
              </div>
              <p style="color:#6b7280;margin:30px 0;">This code expires in <strong>10 minutes</strong></p>
              <p style="color:#6b7280;">If you didn't request this, ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2025 Election Commission Nepal • All rights reserved</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// RESET PASSWORD — CLEAN
app.post("/api/auth/reset-password-otp", async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      resetPasswordOTP: otp.toString().trim(),
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password changed successfully!" });
  } catch (err) {
    console.error("Reset Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ELECTION ROUTE (unchanged)
app.get("/api/elections", async (req, res) => {
  try {
    const elections = await Election.find({ status: { $in: ["active", "upcoming"] } }).sort({ startDate: 1 });
    res.json({ success: true, count: elections.length, elections });
  } catch (err) {
    res.status(500).json({ message: "Failed to load elections" });
  }
});

// Dummy elections
(async () => {
  if (await Election.countDocuments() === 0) {
    await Election.insertMany([
      { title: "Local Election 2082", startDate: new Date("2025-05-10"), endDate: new Date("2025-05-20"), status: "active" },
      { title: "Provincial Election 2083", startDate: new Date("2025-11-01"), endDate: new Date("2025-11-10"), status: "upcoming" }
    ]);
    console.log("Dummy elections created");
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\nServer running → http://localhost:${PORT}`);
  console.log(`Forgot Password OTP System — LIVE & BEAUTIFUL`);
  console.log(`Check your email — the design is`);
});