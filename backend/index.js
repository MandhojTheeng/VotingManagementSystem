const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Create uploads folder
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// Multer configuration for symbol images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "symbol-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  }
});

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// Models
const User = require("./models/User");
const Election = require("./models/Election");
const Vote = require("./models/Vote");

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_2025";

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

// ======================== AUTH ROUTES ========================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, citizenshipNo, phone } = req.body;

    if (!fullName || !email || !password || !citizenshipNo || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [e1, e2, e3] = await Promise.all([
      User.findOne({ email: normalizedEmail }),
      User.findOne({ citizenshipNo }),
      User.findOne({ phone })
    ]);

    if (e1 || e2 || e3) {
      return res.status(400).json({ message: "Already registered" });
    }

    const hashed = await bcrypt.hash(password, 12);

    await User.create({
      fullName,
      email: normalizedEmail,
      password: hashed,
      citizenshipNo,
      phone,
      role: "voter"
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

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
    user.resetPasswordExpires = Date.now() + 600000;
    await user.save();

    console.log(`OTP for ${user.email}: ${otp}`);

    await transporter.sendMail({
      from: `"Election Commission Nepal" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Secure Password Reset Code",
      html: `
        <h2>Password Reset Request</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>It expires in 10 minutes.</p>
      `,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

app.post("/api/auth/reset-password-otp", async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      resetPasswordOTP: otp.trim(),
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

// ======================== PUBLIC ROUTES ========================
app.get("/api/elections", authMiddleware, async (req, res) => {
  try {
    const now = new Date();
    const elections = await Election.find().sort({ startDate: 1 });

    for (let e of elections) {
      e.status = now < e.startDate ? "upcoming" : now <= e.endDate ? "active" : "completed";
      await e.save();
    }

    const visible = elections.filter(e => ["active", "upcoming"].includes(e.status));
    res.json({ success: true, count: visible.length, elections: visible });
  } catch (err) {
    res.status(500).json({ message: "Failed to load elections" });
  }
});

app.get("/api/elections/:id", authMiddleware, async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: "Election not found" });
    res.json({ success: true, election });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/votes/check/:electionId", authMiddleware, async (req, res) => {
  const vote = await Vote.findOne({ electionId: req.params.electionId, userId: req.user.id });
  res.json({ hasVoted: !!vote });
});

app.post("/api/votes", authMiddleware, async (req, res) => {
  try {
    const { electionId, candidateId } = req.body;
    const election = await Election.findById(electionId);

    if (!election || election.status !== "active") {
      return res.status(400).json({ message: "Voting is closed" });
    }

    const alreadyVoted = await Vote.findOne({ electionId, userId: req.user.id });
    if (alreadyVoted) return res.status(400).json({ message: "You have already voted" });

    await Vote.create({ electionId, candidateId, userId: req.user.id });

    await Election.findByIdAndUpdate(electionId, {
      $inc: { "candidates.$[c].voteCount": 1 }
    }, { arrayFilters: [{ "c._id": candidateId }] });

    const updated = await Election.findById(electionId);

    io.emit("vote_cast", {
      electionId,
      totalVotes: updated.candidates.reduce((a, c) => a + c.voteCount, 0),
      candidateVotes: updated.candidates.map(c => ({ name: c.name, votes: c.voteCount }))
    });

    res.json({ success: true, message: "Vote recorded!" });
  } catch (err) {
    console.error("Vote Error:", err);
    res.status(500).json({ message: "Vote failed" });
  }
});

// ======================== ADMIN ROUTES ========================
app.get("/api/admin/stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [elections, votes, candidates] = await Promise.all([
      Election.countDocuments(),
      Vote.countDocuments(),
      Election.aggregate([{ $unwind: "$candidates" }, { $count: "total" }])
    ]);

    res.json({
      elections,
      votes,
      candidates: candidates[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: "Stats error" });
  }
});

// ADMIN: List all elections with DYNAMIC real-time status
app.get("/api/admin/elections", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const now = new Date();
    const elections = await Election.find().sort({ createdAt: -1 });

    const electionsWithStatus = elections.map(election => {
      const startDate = new Date(election.startDate);
      const endDate = new Date(election.endDate);
      let status;

      if (now < startDate) {
        status = "upcoming";
      } else if (now <= endDate) {
        status = "active";
      } else {
        status = "completed";
      }

      return {
        ...election.toObject(),
        status
      };
    });

    res.json({ success: true, elections: electionsWithStatus });
  } catch (err) {
    console.error("Failed to fetch admin elections:", err);
    res.status(500).json({ message: "Failed to fetch elections" });
  }
});

app.get("/api/admin/elections/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    // Also compute dynamic status for single election view
    const now = new Date();
    const status = now < election.startDate ? "upcoming" : now <= election.endDate ? "active" : "completed";

    res.json({ 
      success: true, 
      election: {
        ...election.toObject(),
        status
      }
    });
  } catch (err) {
    console.error("Get single election error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE ELECTION - FIXED
app.post("/api/admin/elections", authMiddleware, adminMiddleware, upload.array("symbols"), async (req, res) => {
  try {
    const { title, description = "", startDate, endDate, candidates: candidatesJson } = req.body;

    if (!title || !startDate || !endDate || candidatesJson === undefined) {
      return res.status(400).json({ message: "Title, dates, and candidates data required" });
    }

    let candidates = [];

    if (typeof candidatesJson === "string") {
      try {
        candidates = JSON.parse(candidatesJson);
      } catch (e) {
        return res.status(400).json({ message: "Invalid candidates format" });
      }
    } else if (Array.isArray(candidatesJson)) {
      candidates = candidatesJson;
    } else {
      return res.status(400).json({ message: "Invalid candidates format" });
    }

    if (!Array.isArray(candidates) || candidates.length < 2) {
      return res.status(400).json({ message: "Title, dates, and at least 2 candidates required" });
    }

    if (candidates.some(c => !c.name || c.name.trim() === "")) {
      return res.status(400).json({ message: "All candidates must have a name" });
    }

    const electionCandidates = candidates.map((c, i) => ({
      name: c.name.trim(),
      party: c.party?.trim() || "Independent",
      symbol: req.files?.[i] ? `/uploads/${req.files[i].filename}` : "",
      voteCount: 0
    }));

    const election = await Election.create({
      title: title.trim(),
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      candidates: electionCandidates
    });

    res.json({ success: true, message: "Election created successfully", election });
  } catch (err) {
    console.error("Create election error:", err);
    res.status(500).json({ message: "Failed to create election" });
  }
});

// UPDATE ELECTION - FIXED
app.put("/api/admin/elections/:id", authMiddleware, adminMiddleware, upload.array("symbols"), async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: "Election not found" });

    const now = new Date();
    const status = now < election.startDate ? "upcoming" : now <= election.endDate ? "active" : "completed";
    if (status === "active") {
      return res.status(400).json({ message: "Cannot edit active election" });
    }

    const { title, description = "", startDate, endDate, candidates: candidatesJson } = req.body;

    if (!title || !startDate || !endDate || candidatesJson === undefined) {
      return res.status(400).json({ message: "Title, dates, and candidates required" });
    }

    let candidates = [];

    if (typeof candidatesJson === "string") {
      try {
        candidates = JSON.parse(candidatesJson);
      } catch (e) {
        return res.status(400).json({ message: "Invalid candidates format" });
      }
    } else if (Array.isArray(candidatesJson)) {
      candidates = candidatesJson;
    } else {
      return res.status(400).json({ message: "Invalid candidates format" });
    }

    if (!Array.isArray(candidates) || candidates.length < 2) {
      return res.status(400).json({ message: "At least 2 candidates required" });
    }

    if (candidates.some(c => !c.name?.trim())) {
      return res.status(400).json({ message: "All candidates must have a name" });
    }

    const updatedCandidates = candidates.map((c, i) => {
      const oldCandidate = election.candidates[i] || {};
      return {
        name: c.name.trim(),
        party: c.party?.trim() || "Independent",
        symbol: req.files?.[i] ? `/uploads/${req.files[i].filename}` : (oldCandidate.symbol || ""),
        voteCount: oldCandidate.voteCount || 0
      };
    });

    election.title = title.trim();
    election.description = description;
    election.startDate = new Date(startDate);
    election.endDate = new Date(endDate);
    election.candidates = updatedCandidates;

    await election.save();

    res.json({ success: true, message: "Election updated successfully", election });
  } catch (err) {
    console.error("Update election error:", err);
    res.status(500).json({ message: "Failed to update election" });
  }
});

app.delete("/api/admin/elections/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: "Not found" });

    const now = new Date();
    const status = now < election.startDate ? "upcoming" : now <= election.endDate ? "active" : "completed";
    if (status === "active") {
      return res.status(400).json({ message: "Cannot delete active election" });
    }

    election.candidates.forEach(c => {
      if (c.symbol) {
        const filePath = path.join(__dirname, c.symbol);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });

    await Election.findByIdAndDelete(req.params.id);
    await Vote.deleteMany({ electionId: req.params.id });
    res.json({ success: true, message: "Election deleted permanently" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

app.post("/api/admin/elections/:id/end", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: "Election not found" });

    election.endDate = new Date();
    await election.save();

    io.emit("election_ended", { electionId: election._id });
    res.json({ success: true, message: "Election ended manually" });
  } catch (err) {
    res.status(500).json({ message: "Failed to end election" });
  }
});

app.get("/api/admin/elections/:id/results", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ message: "Election not found" });

    const now = new Date();
    const status = now < election.startDate ? "upcoming" : now <= election.endDate ? "active" : "completed";

    const totalVotes = election.candidates.reduce((a, c) => a + c.voteCount, 0);
    const results = election.candidates.map(c => ({
      candidateId: c._id,
      name: c.name,
      party: c.party,
      symbol: c.symbol ? `http://localhost:5000${c.symbol}` : null,
      votes: c.voteCount,
      percentage: totalVotes > 0 ? ((c.voteCount / totalVotes) * 100).toFixed(2) : 0
    })).sort((a, b) => b.votes - a.votes);

    res.json({
      success: true,
      election: { title: election.title, totalVotes, status },
      results
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load results" });
  }
});

// ======================== AUTO CREATE ADMIN & DUMMY DATA ========================
(async () => {
  const adminEmail = "admin@election.gov.np";
  const adminExists = await User.findOne({ email: adminEmail });

  if (!adminExists) {
    await User.create({
      fullName: "Election Commission Admin",
      email: adminEmail,
      password: await bcrypt.hash("admin123", 12),
      citizenshipNo: "000-000-000",
      phone: "9800000000",
      role: "admin"
    });
    console.log("\nADMIN ACCOUNT CREATED");
    console.log("   Email: admin@election.gov.np");
    console.log("   Password: admin123\n");
  }

  if (await Election.countDocuments() === 0) {
    await Election.create({
      title: "Local Level Election 2082",
      description: "Local government election for all 753 local levels",
      startDate: new Date("2025-12-20"),
      endDate: new Date("2025-12-30"),
      candidates: [
        { name: "Ram Prasad Sharma", party: "Nepali Congress", symbol: "", voteCount: 0 },
        { name: "Sita Devi Thapa", party: "CPN-UML", symbol: "", voteCount: 0 },
        { name: "Hari Bahadur Gurung", party: "Independent", symbol: "", voteCount: 0 }
      ]
    });
    console.log("Dummy election created\n");
  }
})();

// ======================== SOCKET.IO & SERVER START ========================
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("========================================");
  console.log(`Server Running → http://localhost:${PORT}`);
  console.log(`ADMIN LOGIN:`);
  console.log(`   Email: admin@election.gov.np`);
  console.log(`   Password: admin123`);
  console.log(`Full Admin Panel + Live Voting + Symbol Upload Ready`);
  console.log("========================================");
});