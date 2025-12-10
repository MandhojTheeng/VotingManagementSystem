"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";
import { setToken } from "../../lib/auth";
import MainFooter from "../../components/Footer/MainFooter";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // FIXED: Removed extra "/api" — baseURL already has it
      const res = await API.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      // Save token + user role
      setToken(res.data.token, res.data.user);

      // Redirect based on role
      if (res.data.user?.role === "admin") {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
      console.error("Login failed:", err);
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
              <h1 className="text-4xl font-black text-blue-900">Admin Login</h1>
              <p className="text-xl text-blue-800 mt-2 font-bold">
                Election Commission Nepal
              </p>
              <p className="text-gray-600 mt-4">
                Secure access for authorized personnel only
              </p>
            </div>

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 lg:p-12 space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-gray-800 font-medium placeholder-gray-500"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-gray-800 font-medium placeholder-gray-500"
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
                {loading ? "Authenticating..." : "Login to Dashboard"}
              </button>

              {/* Links */}
              <div className="text-center pt-6 space-y-3">
                <a
                  href="/forgot-password"
                  className="block text-blue-700 hover:text-blue-900 font-medium"
                >
                  Forgot Password?
                </a>
                <p className="text-sm text-gray-600">
                  New user?{" "}
                  <a
                    href="/register"
                    className="text-blue-700 font-bold hover:underline"
                  >
                    Register as Voter
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