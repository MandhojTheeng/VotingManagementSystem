// app/(admin)/admin/elections/[id]/results/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../../../../lib/api";
import { Trophy, Users } from "lucide-react";

export default function ElectionResults() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 3000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchResults = async () => {
    try {
      const res = await API.get(`/admin/elections/${id}/results`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch results:", err);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-700 mx-auto mb-6"></div>
          <p className="text-xl font-semibold text-blue-900">Loading results...</p>
        </div>
      </div>
    );
  }

  const winner = data.results[0];
  const isCompleted = data.election.status === "completed";

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black text-blue-950 mb-3">{data.election.title}</h1>
          <p className="text-2xl text-gray-700 flex items-center justify-center gap-3">
            <Users className="w-7 h-7" />
            Total Votes: <span className="font-bold text-indigo-700">{data.election.totalVotes.toLocaleString()}</span>
          </p>
          {isCompleted && <p className="text-lg text-green-600 font-semibold mt-4">Election Completed</p>}
        </div>

        {/* Winner Section */}
        {isCompleted && winner && (
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white rounded-3xl shadow-2xl p-10 mb-12 text-center">
            <Trophy className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-5xl font-black mb-4">WINNER</h2>
            <div className="flex flex-col items-center gap-6">
              {winner.symbol ? (
                <div className="relative">
                  <div className="w-48 h-48 bg-white rounded-full p-6 shadow-2xl border-8 border-white overflow-hidden">
                    <img
                      src={winner.symbol}
                      alt={`${winner.name} symbol`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl opacity-80">No Symbol</span>
                </div>
              )}
              <div>
                <h3 className="text-4xl font-bold">{winner.name}</h3>
                <p className="text-2xl mt-2 opacity-95">{winner.party}</p>
                <p className="text-3xl font-black mt-4">
                  {winner.votes.toLocaleString()} votes ({winner.percentage}%)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="space-y-8">
          {data.results.map((c, i) => (
            <div
              key={c.candidateId}
              className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ${
                i === 0 && isCompleted ? "ring-4 ring-yellow-400 ring-offset-4" : ""
              }`}
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Rank & Symbol */}
                  <div className="flex items-center gap-6">
                    <div className={`text-5xl font-black ${
                      i === 0 ? "text-yellow-500" :
                      i === 1 ? "text-gray-400" :
                      i === 2 ? "text-orange-600" :
                      "text-gray-600"
                    }`}>
                      #{i + 1}
                    </div>
                    {c.symbol ? (
                      <div className="w-32 h-32 bg-gray-50 rounded-2xl p-4 border-4 border-gray-200 shadow-lg overflow-hidden">
                        <img
                          src={c.symbol}
                          alt={`${c.name} party symbol`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gray-200 border-4 border-dashed border-gray-400 rounded-2xl flex items-center justify-center">
                        <span className="text-gray-500 text-sm text-center">No Symbol</span>
                      </div>
                    )}
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-blue-950">{c.name}</h3>
                    <p className="text-xl text-gray-600 mt-1">{c.party}</p>
                  </div>

                  {/* Votes & Percentage */}
                  <div className="text-center">
                    <p className="text-4xl font-black text-indigo-700">{c.votes.toLocaleString()}</p>
                    <p className="text-2xl text-gray-600">votes</p>
                    <p className="text-3xl font-bold text-indigo-600 mt-4">{c.percentage}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="w-full bg-gray-200 rounded-full h-12 overflow-hidden shadow-inner">
                    <div
                      className={`h-full transition-all duration-1000 ease-out ${
                        i === 0 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                        i === 1 ? "bg-gradient-to-r from-gray-400 to-gray-600" :
                        i === 2 ? "bg-gradient-to-r from-orange-400 to-red-500" :
                        "bg-gradient-to-r from-blue-600 to-indigo-700"
                      }`}
                      style={{ width: `${c.percentage}%` }}
                    />
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