// app/(admin)/admin/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API from "../../../../lib/api";
import { socket } from "../../../../lib/socket";

import MainFooter from "../../../../components/Footer/MainFooter";
import {
  Activity, Users, Vote, FileText, Shield, Settings, LogOut,
  Clock, MapPin, CheckCircle, AlertCircle, BarChart3,
  UserCheck, Building2, Globe, Lock, RefreshCw
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ elections: 0, votes: 0, candidates: 0 });
  const [live, setLive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchStats = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      setError("Session expired or unauthorized access");
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

  // Updated menu — Election Management is now clearly visible and active when needed
  const adminMenu = [
    { icon: Activity, label: "Dashboard", href: "/admin", active: true },
    { icon: FileText, label: "Election Management", href: "/admin/elections", highlight: true }, // ← CLEARLY VISIBLE
    { icon: BarChart3, label: "Results & Analytics", href: "#" },
    { icon: Users, label: "Candidate Verification", href: "#" },
    { icon: UserCheck, label: "Voter Registry", href: "#" },
    { icon: Building2, label: "Polling Stations", href: "#" },
    { icon: Shield, label: "Security & Audit Logs", href: "#" },
    { icon: Globe, label: "Public Portal Control", href: "#" },
    { icon: Settings, label: "System Configuration", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Official Top Bar */}
      <div className="bg-blue-950 text-white border-b-8 border-indigo-700">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <Shield className="w-7 h-7" />
            <div>
              <div className="font-bold text-lg">निर्वाचन आयोग नेपाल</div>
              <div className="opacity-90">Election Commission Nepal • National Election Portal 2082</div>
            </div>
          </div>
          <div className="flex items-center gap-8 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{currentTime.toLocaleString("en-NP", { timeZone: "Asia/Kathmandu", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-300">
              <Lock className="w-5 h-5" />
              <span>Encrypted Session • Admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — Election Management is now 2nd & highlighted */}
        <aside className="w-72 bg-white shadow-2xl border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-blue-950">Admin Control Panel</h2>
            <p className="text-sm text-gray-600 mt-1">Super Administrator Access</p>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {adminMenu.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all font-medium relative
                  ${item.active 
                    ? "bg-indigo-700 text-white shadow-lg" 
                    : item.highlight
                      ? "bg-indigo-50 text-indigo-800 border-l-4 border-indigo-700 font-bold"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-800"
                  }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-base">{item.label}</span>
                
                {/* Optional: Add a badge or icon for emphasis */}
                {item.highlight && (
                  <span className="ml-auto text-xs bg-indigo-700 text-white px-2 py-1 rounded-full">
                    GO
                  </span>
                )}
                
                {item.active && <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button onClick={fetchStats} className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">
              <RefreshCw className="w-5 h-5" />
              <span>Refresh All Data</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-700 hover:bg-red-50 rounded-lg transition font-medium mt-2">
              <LogOut className="w-5 h-5" />
              <span>Secure Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold text-blue-950">National Election Dashboard</h1>
            <p className="text-lg text-gray-700 mt-2">Real-time Monitoring • Immutable Records • Full Transparency</p>
          </header>

          {/* Your existing KPI cards and live stream below (unchanged) */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-700 mx-auto mb-6"></div>
                <p className="text-xl font-semibold text-blue-900">Loading encrypted election data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-10 text-center">
              <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-900">Access Denied</h3>
              <p className="text-red-800 mt-3">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Your 3 KPI cards — unchanged */}
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold uppercase tracking-wider">Total Elections</span>
                      <Activity className="w-8 h-8 opacity-90" />
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <p className="text-6xl font-black text-blue-900 tabular-nums">
                      {stats.elections.toLocaleString()}
                    </p>
                    <p className="text-gray-600 mt-3 font-medium">Active • Scheduled • Archived</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold uppercase tracking-wider">Approved Candidates</span>
                      <Users className="w-8 h-8 opacity-90" />
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <p className="text-6xl font-black text-blue-900 tabular-nums">
                      {stats.candidates.toLocaleString()}
                    </p>
                    <p className="text-gray-600 mt-3 font-medium">Identity & Eligibility Verified</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold uppercase tracking-wider">Total Votes Recorded</span>
                      <Vote className="w-8 h-8 opacity-90" />
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <p className="text-6xl font-black text-blue-900 tabular-nums">
                      {stats.votes.toLocaleString()}
                    </p>
                    <p className="text-gray-600 mt-3 font-medium">Tamper-Proof Digital Ballots</p>
                  </div>
                </div>
              </div>

              {/* Live Vote Stream */}
              <div className="bg-white rounded-xl shadow-xl border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-blue-950 flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
                    Live Vote Stream
                  </h3>
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
                    <CheckCircle className="w-5 h-5 text-blue-700" />
                    <span>All votes verified instantly</span>
                  </div>
                </div>

                <div className="p-8">
                  {live ? (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
                      <div className="flex items-center gap-3 text-blue-900 font-bold text-lg mb-6">
                        <div className="w-5 h-5 bg-blue-700 rounded-full animate-pulse"></div>
                        <span>New vote authenticated and recorded</span>
                      </div>
                      <pre className="bg-white p-6 rounded-lg border border-blue-200 font-mono text-sm overflow-x-auto">
                        {JSON.stringify(live, null, 2)}
                      </pre>
                      <p className="text-right text-sm text-gray-600 mt-6 font-medium">
                        {new Date().toLocaleString("en-NP", {
                          timeZone: "Asia/Kathmandu",
                          dateStyle: "full",
                          timeStyle: "long",
                        })}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-20 text-gray-500">
                      <div className="flex justify-center gap-4 mb-8">
                        {[0, 150, 300].map((d) => (
                          <div key={d} className="w-4 h-4 bg-indigo-700 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                        ))}
                      </div>
                      <p className="text-2xl font-bold text-blue-900">System Online • Secure • Ready</p>
                      <p className="mt-3 text-lg">Awaiting voter participation across Nepal</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <MainFooter />
    </div>
  );
}