// components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import { FaEnvelope, FaMap, FaInfoCircle, FaQuestionCircle } from "react-icons/fa";
import { getToken, removeToken } from "../lib/auth";

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => setIsAuth(!!getToken());

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsAuth(false);
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/";
  };

  return (
    <nav className="w-full">
      {/* Top utility bar */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-6 text-gray-600">
            <a href="/contact" className="hover:text-blue-700 no-underline flex items-center gap-2">
              Contact
            </a>
            <a href="/sitemap" className="hover:text-blue-700 no-underline flex items-center gap-2">
              Sitemap
            </a>
            <a href="/info" className="hover:text-blue-700 no-underline flex items-center gap-2">
              Information
            </a>
            <a href="/help" className="hover:text-blue-700 no-underline flex items-center gap-2">
              Help & Support
            </a>
          </div>
          {/* Accessibility controls */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsInverted(!isInverted)} className="text-gray-600 hover:text-blue-700">
              Invert
            </button>
            <div className="flex gap-1">
              <button onClick={() => setFontSize(p => Math.max(12, p-2))} className="px-2 py-1 text-gray-600 hover:text-blue-700">A-</button>
              <button onClick={() => setFontSize(16)} className="px-2 py-1 text-gray-600 hover:text-blue-700">A</button>
              <button onClick={() => setFontSize(p => Math.min(24, p+2))} className="px-2 py-1 text-gray-600 hover:text-blue-700">A+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23DC2626'/%3E%3Ccircle cx='50' cy='50' r='40' fill='%23fff'/%3E%3Ccircle cx='50' cy='50' r='32' fill='%231E40AF'/%3E%3Cpath d='M50 30 L55 45 L50 42 L45 45 Z' fill='%23fff'/%3E%3Cpath d='M50 70 L55 55 L50 58 L45 55 Z' fill='%23fff'/%3E%3C/svg%3E"
              alt="Nepal Flag"
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <div>
              <div className="text-blue-700 text-sm font-medium">Government of Nepal</div>
              <div className="text-red-700 text-2xl md:text-3xl font-bold">Election Commission Nepal</div>
              <div className="text-gray-600 text-sm">VoterSys - Secure Online Voting</div>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/search?q=${searchQuery}`; }} className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-5 rounded-r hover:bg-blue-700 transition">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-blue-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Toggle */}
          <div className="flex lg:hidden justify-between items-center py-3">
            <span className="text-white font-semibold">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
              {isMobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex">
              <a href="/" className="px-5 py-4 text-white hover:bg-blue-800 font-medium border-r border-blue-600">Home</a>
              <a href="/voter-registration" className="px-5 py-4 text-white hover:bg-blue-800 font-medium border-r border-blue-600">Voter Registration</a>
              <a href="/election-info" className="px-5 py-4 text-white hover:bg-blue-800 font-medium border-r border-blue-600">Election Info</a>
              <a href="/polling-station" className="px-5 py-4 text-white hover:bg-blue-800 font-medium border-r border-blue-600">Polling Station</a>
              <a href="/dashboard" className="px-5 py-4 text-white hover:bg-blue-800 font-medium border-r border-blue-600">Dashboard</a>
              <a href="/admin/dashboard" className="px-5 py-4 text-white hover:bg-blue-800 font-medium">Admin Panel</a>
            </div>

            {/* AUTH BUTTONS - ONLY ONE VISIBLE */}
            <div className="py-2 px-4">
              {isAuth ? (
                <button
                  onClick={handleLogout}
                  className="px-7 py-2.5 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-bold transition-all shadow hover:shadow-md"
                >
                  Logout
                </button>
              ) : (
                <div className="flex gap-3">
                  <a
                    href="/login"
                    className="px-7 py-2.5 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-bold transition-all shadow hover:shadow-md"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="px-7 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-lg font-bold transition-all shadow hover:shadow-md"
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-2">
              <a href="/" className="block px-4 py-3 text-white hover:bg-blue-800">Home</a>
              <a href="/voter-registration" className="block px-4 py-3 text-white hover:bg-blue-800">Voter Registration</a>
              <a href="/election-info" className="block px-4 py-3 text-white hover:bg-blue-800">Election Info</a>
              <a href="/polling-station" className="block px-4 py-3 text-white hover:bg-blue-800">Polling Station</a>
              <a href="/dashboard" className="block px-4 py-3 text-white hover:bg-blue-800">Dashboard</a>
              <a href="/admin/dashboard" className="block px-4 py-3 text-white hover:bg-blue-800">Admin Panel</a>

              <div className="border-t border-blue-600 pt-4 px-4 space-y-3">
                {isAuth ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-bold"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <a href="/login" className="block w-full px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-bold text-center">
                      Login
                    </a>
                    <a href="/register" className="block w-full px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white rounded-lg font-bold text-center">
                      Register
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex text-sm">
            <a href="/voter-list" className="px-4 py-3 text-white hover:bg-blue-700">Voter List</a>
            <a href="/check-status" className="px-4 py-3 text-white hover:bg-blue-700">Check Status</a>
            <a href="/election-results" className="px-4 py-3 text-white hover:bg-blue-700">Results</a>
            <a href="/forms" className="px-4 py-3 text-white hover:bg-blue-700">Forms</a>
            <a href="/faqs" className="px-4 py-3 text-white hover:bg-blue-700">FAQs</a>
            <a href="/contact" className="px-4 py-3 text-white hover:bg-blue-700">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}