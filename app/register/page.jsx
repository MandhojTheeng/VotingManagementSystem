// app/register/page.jsx
"use client";

import { useState } from "react";
import API from "../../lib/api";
import { setToken } from "../../lib/auth";
import MainFooter from "../../components/Footer/MainFooter";

export default function VoterRegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    gender: "",
    dateOfBirth: "",
    citizenshipNo: "",
    issuedDistrict: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    municipality: "",
    wardNo: "",
    tole: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        ...formData,
        role: "voter",
      });

      // Save token to cookie
      setToken(res.data.token);

      // THIS IS THE CRITICAL FIX – Full page navigation
      window.location.href = "/dashboard";

      // Alternative (also works):
      // router.push("/dashboard");
      // router.refresh();

    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl">
            {/* Official Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-blue-900">Voter Registration</h1>
              <p className="text-xl text-blue-800 mt-2 font-bold">निर्वाचन आयोग नेपाल</p>
              <p className="text-gray-600 mt-4">Register to vote in upcoming elections</p>
            </div>

            {/* Registration Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 lg:p-12 space-y-8"
            >
              {/* Personal Information */}
              <div className="border-b border-gray-300 pb-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-6">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name (as in citizenship)"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                  <input
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Father's Name"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                  <input
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Mother's Name"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />

                  <input
                    name="citizenshipNo"
                    value={formData.citizenshipNo}
                    onChange={handleChange}
                    placeholder="Citizenship Number"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />

                  <input
                    name="issuedDistrict"
                    value={formData.issuedDistrict}
                    onChange={handleChange}
                    placeholder="Citizenship Issued District"
                    className="md:col-span-2 px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-b border-gray-300 pb-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-6">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="border-b border-gray-300 pb-8">
                <h3 className="text-2xl font-bold text-blue-800 mb-6">Permanent Address</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  >
                    <option value="">Select Province</option>
                    <option>Province 1</option>
                    <option>Madhesh Province</option>
                    <option>Bagmati Province</option>
                    <option>Gandaki Province</option>
                    <option>Lumbini Province</option>
                    <option>Karnali Province</option>
                    <option>Sudurpaschim Province</option>
                  </select>

                  <input
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="District"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                  <input
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleChange}
                    placeholder="Municipality / Rural Municipality"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                  <input
                    name="wardNo"
                    value={formData.wardNo}
                    onChange={handleChange}
                    placeholder="Ward Number"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                  <input
                    name="tole"
                    value={formData.tole}
                    onChange={handleChange}
                    placeholder="Tole / Village"
                    className="md:col-span-2 px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Account Security */}
              <div>
                <h3 className="text-2xl font-bold text-blue-800 mb-6">Account Security</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create Password"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-lg text-center font-medium">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-5 rounded-lg transition disabled:opacity-70 text-lg"
              >
                {loading ? "Submitting Registration..." : "Register as Voter"}
              </button>

              <div className="text-center pt-6">
                <p className="text-sm text-gray-600">
                  Already registered?{" "}
                  <a href="/login" className="text-blue-700 font-bold hover:underline">
                    Login here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>

        <MainFooter />
      </div>
    </>
  );
}