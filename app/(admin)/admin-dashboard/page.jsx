// app/(admin)/admin-dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { socket } from "../../../lib/socket";
import MainFooter from "../../../components/Footer/MainFooter";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ elections: 0, votes: 0, candidates: 0 });
  const [live, setLive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      setError("Access denied or server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    socket.connect();
    socket.on("vote_cast", (payload) => {
      setLive(payload);
      fetchStats();
    });

    return () => {
      socket.off("vote_cast");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
        {/* Official Header - TEXT SIZES MATCHED TO VOTER DASHBOARD */}
        <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-xl">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  Admin Dashboard
                </h1>
                <div className="mt-2">
                  <p className="text-xl opacity-95">Election Commission Nepal</p>
                  <p className="text-lg opacity-80">निर्वाचन आयोग नेपाल</p>
                </div>
              </div>
              <p className="text-sm opacity-75">Secure • Transparent • Digital Voting</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
          <div className="text-center mb-14">
            {/* Same size as Voter Dashboard's "Available Elections" */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
              Election Statistics Overview
            </h2>
            {/* Same paragraph size */}
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Real-time monitoring of all elections, candidates, and votes across Nepal.
            </p>
          </div>

          {/* Loading - Same text size */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-800 mx-auto mb-6"></div>
                <p className="text-2xl font-semibold text-blue-900">Loading Statistics...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-300 rounded-3xl p-20 text-center">
              <h3 className="text-3xl font-bold text-red-900 mb-4">Access Error</h3>
              <p className="text-xl text-red-800">{error}</p>
            </div>
          ) : (
            <>
              {/* Stats Cards - TEXT SIZES EXACTLY MATCHED */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Total Elections */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 overflow-hidden group">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    {/* Same header size as voter card */}
                    <h3 className="text-xl font-bold leading-tight">Total Elections</h3>
                  </div>
                  <div className="p-10 text-center">
                    {/* Same number size */}
                    <p className="text-8xl font-black text-blue-900">{stats.elections}</p>
                    {/* Same description size */}
                    <p className="text-gray-700 mt-4 text-lg font-medium">Active & Upcoming</p>
                  </div>
                </div>

                {/* Total Candidates */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 overflow-hidden group">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <h3 className="text-xl font-bold leading-tight">Registered Candidates</h3>
                  </div>
                  <div className="p-10 text-center">
                    <p className="text-8xl font-black text-blue-900">{stats.candidates}</p>
                    <p className="text-gray-700 mt-4 text-lg font-medium">Verified & Approved</p>
                  </div>
                </div>

                {/* Total Votes */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 overflow-hidden group">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <h3 className="text-xl font-bold leading-tight">Total Votes Cast</h3>
                  </div>
                  <div className="p-10 text-center">
                    <p className="text-8xl font-black text-blue-900">{stats.votes}</p>
                    <p className="text-gray-700 mt-4 text-lg font-medium">Secure Digital Records</p>
                  </div>
                </div>
              </div>

              {/* Live Updates - TEXT SIZES MATCHED */}
              <div className="mt-16 bg-white rounded-3xl shadow-xl border border-blue-100 p-10">
                <div className="text-center mb-10">
                  {/* Same size as section titles */}
                  <h3 className="text-3xl font-extrabold text-blue-900">
                    Live Vote Updates
                  </h3>
                </div>

                {live ? (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-10">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-5 h-5 bg-green-600 rounded-full animate-pulse"></div>
                      <p className="text-2xl font-bold text-green-800">New Vote Recorded!</p>
                    </div>
                    <pre className="bg-white p-8 rounded-xl border border-green-200 text-sm font-mono overflow-x-auto">
                      {JSON.stringify(live, null, 2)}
                    </pre>
                    <p className="text-right text-sm text-gray-600 mt-6">
                      {new Date().toLocaleString("en-NP", { timeZone: "Asia/Kathmandu" })}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="flex justify-center gap-4 mb-10">
                      <div className="w-4 h-4 bg-blue-900 rounded-full animate-bounce"></div>
                      <div className="w-4 h-4 bg-blue-800 rounded-full animate-bounce delay-100"></div>
                      <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce delay-200"></div>
                      <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-300"></div>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">
                      System Active — Waiting for Votes
                    </p>
                    <p className="text-lg text-gray-600 mt-4">
                      All incoming votes will appear here instantly
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </main>

        <MainFooter />
      </div>
    </>
  );
}