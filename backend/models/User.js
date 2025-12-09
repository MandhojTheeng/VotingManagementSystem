// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  fatherName: String,
  motherName: String,
  gender: String,
  dateOfBirth: Date,
  citizenshipNo: { type: String, required: true, unique: true, trim: true },
  issuedDistrict: String,
  phone: { type: String, required: true, unique: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  province: String,
  district: String,
  municipality: String,
  wardNo: String,
  tole: String,
  password: { type: String, required: true },

  role: { 
    type: String, 
    enum: ["voter", "admin"], 
    default: "voter" 
  },

  resetPasswordOTP: { type: String },           
  resetPasswordExpires: { type: Date },         

  resetPasswordToken: String,
  resetPasswordTokenExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);