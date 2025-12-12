// app/(admin)/admin/elections/[id]/results/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../../../../lib/api";
import { Trophy, Users, Activity, Shield, CheckCircle } from "lucide-react";

// Fix symbol URLs - works exactly like voter page
const getSymbolUrl = (symbol) => {
  if (!symbol) return null;
  if (symbol.startsWith("http")) return symbol;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "http://localhost:5000";
  return `${baseUrl}${symbol.startsWith("/") ? "" : "/"}${symbol}`;
};

export default function ElectionResults() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get(`/admin/elections/${id}/results`);
        setData(res.data);
        setLastUpdate(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      } catch (err) {
        console.error("Failed to fetch results:", err);
      }
    };

    fetchResults();
    const interval = setInterval(fetchResults, 3000);
    return () => clearInterval(interval);
  }, [id]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl font-medium text-gray-700">Loading live results...</p>
        </div>
      </div>
    );
  }

  const isCompleted = data.election.status === "completed";
  const winner = data.results[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-blue-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Shield className="w-9 h-9 text-blue-300" />
            <div>
              <h1 className="text-2xl font-bold">Admin Results Dashboard</h1>
              <p className="text-blue-200 text-sm">Live • Updates every 3 seconds</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm bg-blue-800 px-5 py-2 rounded-full">
            <Activity className="w-5 h-5 text-green-400 animate-pulse" />
            <span>Last update: {lastUpdate}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Election Title & Stats */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{data.election.title}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-blue-800" />
              <div>
                <p className="text-gray-600 text-lg">Total Votes Cast</p>
                <p className="text-4xl font-black text-blue-800">
                  {data.election.totalVotes.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-20 bg-gray-300"></div>

            <div className="flex items-center gap-4">
              {isCompleted ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <Activity className="w-8 h-8 text-green-500 animate-pulse" />
              )}
              <div>
                <p className="text-gray-600 text-lg">Election Status</p>
                <p className={`text-2xl font-bold ${isCompleted ? "text-green-600" : "text-blue-600"}`}>
                  {isCompleted ? "Completed" : "Live Voting"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Winner Announcement - Only when completed */}
        {isCompleted && winner && (
          <div className="bg-gradient-to-br from-blue-800 to-blue-950 text-white rounded-3xl shadow-2xl p-12 mb-12 text-center">
            <div className="inline-flex items-center gap-4 bg-blue-700/50 backdrop-blur px-8 py-4 rounded-full mb-8">
              <Trophy className="w-10 h-10 text-yellow-300" />
              <span className="text-3xl font-bold">OFFICIAL WINNER</span>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
              <div className="w-56 h-56 bg-white rounded-3xl shadow-2xl border-8 border-blue-700 overflow-hidden flex-shrink-0">
                {winner.symbol ? (
                  <img
                    src={getSymbolUrl(winner.symbol)}
                    alt="Winner symbol"
                    className="w-full h-full object-contain p-10"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
                    No Symbol
                  </div>
                )}
              </div>

              <div className="text-center lg:text-left">
                <h3 className="text-5xl font-black mb-3">{winner.name}</h3>
                <p className="text-2xl opacity-90 mb-8">{winner.party || "Independent"}</p>
                <div className="text-7xl font-black text-blue-100 mb-2">
                  {winner.votes.toLocaleString()}
                </div>
                <p className="text-3xl font-medium text-blue-200">
                  {winner.percentage}% of total votes
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="space-y-6">
          {data.results.map((candidate, index) => (
            <div
              key={candidate.candidateId}
              className={`bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                index === 0 && isCompleted
                  ? "border-blue-600 ring-4 ring-blue-100 scale-105"
                  : "border-gray-200"
              }`}
            >
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">

                  {/* Rank + Symbol */}
                  <div className="flex items-center gap-6">
                    <div className={`text-6xl font-black ${index === 0 ? "text-blue-800" : "text-gray-500"}`}>
                      #{index + 1}
                    </div>
                    <div className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-gray-300 overflow-hidden shadow-inner">
                      {candidate.symbol ? (
                        <img
                          src={getSymbolUrl(candidate.symbol)}
                          alt={`${candidate.name} symbol`}
                          className="w-full h-full object-contain p-5"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                          No Symbol
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name & Party */}
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
                    <p className="text-lg text-gray-600 mt-1">{candidate.party || "Independent"}</p>
                  </div>

                  {/* Votes Count */}
                  <div className="text-center">
                    <p className="text-4xl font-bold text-blue-800">
                      {candidate.votes.toLocaleString()}
                    </p>
                    <p className="text-gray-600 mt-1">votes</p>
                  </div>

                  {/* Percentage Bar */}
                  <div className="space-y-3">
                    <p className="text-4xl font-bold text-blue-700 text-right">
                      {candidate.percentage}%
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-12 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          index === 0 ? "bg-gradient-to-r from-blue-600 to-blue-800" : "bg-blue-500"
                        }`}
                        style={{ width: `${candidate.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}