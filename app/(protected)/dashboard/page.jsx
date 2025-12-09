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

  const handleVoteClick = (electionId) => {
    router.push(`/vote/${electionId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-800 mx-auto mb-6"></div>
          <p className="text-2xl font-bold text-blue-900">Loading Your Ballot...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
        {/* Header – Logout removed */}
        <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Voter Dashboard
              </h1>
              <p className="text-xl mt-2 opacity-90">Election Commission Nepal</p>
              <p className="text-lg mt-1 font-medium opacity-80">निर्वाचन आयोग नेपाल</p>
            </div>
            {/* Logout button has been completely removed */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
              Available Elections
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Select an election below to review candidates and cast your vote securely.
            </p>
          </div>

          {/* Elections Grid */}
          {elections.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-20 text-center border border-blue-100">
              <div className="text-8xl mb-8">Ballot Box</div>
              <h3 className="text-4xl font-bold text-gray-800 mb-4">No Active Elections</h3>
              <p className="text-xl text-gray-600">New elections will appear here when announced.</p>
              <p className="text-lg text-gray-500 mt-6">Thank you for being a responsible voter!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {elections.map((election) => (
                <div
                  key={election._id}
                  onClick={() => handleVoteClick(election._id)}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500
                           border border-blue-100 overflow-hidden group cursor-pointer
                           transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <h3 className="text-2xl font-bold">{election.title}</h3>
                    <p className="text-sm opacity-90 mt-2">
                      {new Date(election.startDate).toLocaleDateString("en-NP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" – "}
                      {new Date(election.endDate).toLocaleDateString("en-NP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {election.description || "Election for public office positions."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          election.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {election.status === "active" ? "Voting Open" : "Upcoming"}
                      </span>
                      <button
                        onClick={(e) => e.stopPropagation() || handleVoteClick(election._id)}
                        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-8
                                 rounded-full transition-all shadow-md hover:shadow-lg
                                 flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                        Vote Now
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