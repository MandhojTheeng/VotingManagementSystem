"use client";

import { useState, useEffect } from "react";
import API from "../../lib/api";
import MainFooter from "../../components/Footer/MainFooter";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const sendOtp = async (e) => {
    e.preventDefault();
    setMessage(""); setError(""); setLoading(true);
    try {
      await API.post("/auth/forgot-password-otp", { email: email.trim().toLowerCase() });
      setMessage("OTP sent to your email!");
      setStep(2);
      setCountdown(60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    if (newPassword !== confirmPassword) return setError("Passwords do not match");
    if (newPassword.length < 6) return setError("Password must be at least 6 characters");

    setLoading(true);
    try {
      await API.post("/auth/reset-password-otp", {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        password: newPassword
      });
      setMessage("Password changed successfully! Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-blue-900">
              Forgot Password?
            </h1>
            <p className="text-xl md:text-2xl font-bold text-blue-800 mt-3">
              Election Commission Nepal
            </p>
            <p className="text-lg text-blue-700 mt-1 font-medium">
              निर्वाचन आयोग नेपाल
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-200 p-8 md:p-10">
            {step === 1 ? (
              <form onSubmit={sendOtp} className="space-y-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-200 transition-all outline-none"
                  required
                />

                {message && (
                  <div className="bg-blue-50 border-2 border-blue-300 text-blue-800 px-6 py-4 rounded-xl text-center font-bold">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 border-2 border-red-300 text-red-800 px-6 py-4 rounded-xl text-center font-bold">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-800 hover:bg-blue-900 disabled:bg-blue-600 text-white font-bold text-xl py-5 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={resetPassword} className="space-y-6">
                <p className="text-center text-blue-700 font-semibold text-lg">
                  OTP sent to <span className="font-bold">{email}</span>
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full text-center text-4xl font-bold tracking-widest py-5 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-200 transition-all"
                  required
                  autoFocus
                />

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                  required
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-200"
                  required
                />

                {message && (
                  <div className="bg-blue-50 border-2 border-blue-300 text-blue-800 px-6 py-4 rounded-xl text-center font-bold text-lg animate-pulse">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 border-2 border-red-300 text-red-800 px-6 py-4 rounded-xl text-center font-bold">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={countdown > 0 || loading}
                    className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:bg-blue-500 text-white font-bold py-3 rounded-xl transition"
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-800 hover:bg-blue-900 disabled:bg-blue-600 text-white font-bold text-xl py-5 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </button>
              </form>
            )}

            <div className="text-center mt-8">
              <a
                href="/login"
                className="text-blue-700 hover:text-blue-900 font-semibold text-lg transition-colors"
              >
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <MainFooter />
      </div>
    </div>
  );
}