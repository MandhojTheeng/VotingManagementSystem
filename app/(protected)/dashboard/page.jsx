// app/(protected)/dashboard/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../lib/api";
import { getToken, removeToken } from "../../../lib/auth";
import MainFooter from "../../../components/Footer/MainFooter";

export default function VoterDashboard() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchElections = async () => {
      try {
        const res = await API.get("/elections");
        setElections(res.data.elections || res.data || []);
      } catch (err) {
        console.error("Failed to fetch elections:", err);
        if (err.response?.status === 401) {
          removeToken();
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, [router]);

  const handleVoteClick = (e, electionId) => {
    e?.stopPropagation();
    router.push(`/vote/${electionId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-800 mx-auto mb-6"></div>
          <p className="text-2xl font-semibold text-blue-900">Loading Elections...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
        {/* Official Header */}
        <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-xl">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  Voter Dashboard
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
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
              Available Elections
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Select an election below to review candidates and cast your vote securely.
            </p>
          </div>

          {/* No Elections */}
          {elections.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-20 text-center">
              <div className="w-28 h-28 mx-auto mb-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-blue-900 mb-4">No Active Elections</h3>
              <p className="text-lg text-gray-600">Elections will appear here when announced.</p>
            </div>
          ) : (
            /* Uniform Cards – Perfect Alignment & Button Size */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {elections.map((election) => (
                <div
                  key={election._id}
                  onClick={(e) => handleVoteClick(e, election._id)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                             border border-blue-100 overflow-hidden group cursor-pointer
                             flex flex-col h-full"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <h3 className="text-xl font-bold leading-tight line-clamp-2">
                      {election.title}
                    </h3>
                    <p className="text-sm opacity-90 mt-3">
                      {new Date(election.startDate).toLocaleDateString("en-NP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" – "}
                      {new Date(election.endDate).toLocaleDateString("en-NP", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Card Body – Fixed layout */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <p className="text-gray-700 text-base leading-relaxed line-clamp-3">
                      {election.description || "Election for public office positions."}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      {/* Status Badge */}
                      <span
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                          election.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {election.status === "active" ? "Voting Open" : "Upcoming"}
                      </span>

                      {/* Uniform Button – Same size everywhere */}
                      <button
                        onClick={(e) => handleVoteClick(e, election._id)}
                        className="bg-blue-800 hover:bg-blue-900 text-white font-bold 
                                 py-3 px-7 rounded-full text-sm whitespace-nowrap
                                 transition-all duration-200 shadow-md hover:shadow-lg
                                 flex items-center gap-2"
                      >
                        Vote Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <MainFooter />
      </div>
    </>
  );
}