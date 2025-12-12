// app/vote/[electionId]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { getToken } from "../../../lib/auth";

// Correctly builds image URL from your backend
const getSymbolUrl = (symbol) => {
  if (!symbol) return null;
  if (symbol.startsWith("http")) return symbol;

  // Your uploads are served at http://localhost:5000/uploads/xyz.png
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "http://localhost:5000";
  return `${baseUrl}${symbol.startsWith("/") ? "" : "/"}${symbol}`;
};

export default function VotePage() {
  const { electionId } = useParams();
  const router = useRouter();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [electionRes, voteRes] = await Promise.all([
          API.get(`/elections/${electionId}`),
          API.get(`/votes/check/${electionId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setElection(electionRes.data.election);
        setHasVoted(voteRes.data.hasVoted);
      } catch (err) {
        console.error("Error loading election:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [electionId, router]);

  const handleVote = async () => {
    if (!selectedCandidate) return;

    try {
      await API.post(
        "/votes",
        { electionId, candidateId: selectedCandidate },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setHasVoted(true);
      setShowModal(false);
    } catch (err) {
      alert("Failed to cast vote. Please try again.");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading election...</p>
        </div>
      </div>
    );
  }

  // Election closed
  if (!election || election.status !== "active") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Voting has ended</h2>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-6 bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-8 rounded-lg transition"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Election Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{election.title}</h1>
          <p className="text-base text-gray-600">
            {new Date(election.startDate).toLocaleDateString("en-NP", { dateStyle: "long" })} –{" "}
            {new Date(election.endDate).toLocaleDateString("en-NP", { dateStyle: "long" })}
          </p>
        </div>

        {/* Voting Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-800 text-white px-8 py-5">
            <h2 className="text-xl font-semibold text-center">Select Your Candidate</h2>
          </div>

          <div className="p-8">
            {hasVoted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Voting</h3>
                <p className="text-base text-gray-600">Your vote has been recorded securely.</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {election.candidates.map((candidate) => (
                    <label
                      key={candidate._id}
                      className={`flex items-center gap-6 p-6 border rounded-xl cursor-pointer transition-all ${
                        selectedCandidate === candidate._id
                          ? "border-blue-600 bg-blue-50 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="candidate"
                        checked={selectedCandidate === candidate._id}
                        onChange={() => setSelectedCandidate(candidate._id)}
                        className="w-5 h-5 text-blue-800 focus:ring-blue-600"
                      />

                      {/* Party Symbol - NOW WORKS 100% */}
                      <div className="flex-shrink-0 w-24 h-24 bg-white rounded-lg border-2 border-gray-200 overflow-hidden shadow-sm">
                        {candidate.symbol ? (
                          <img
                            src={getSymbolUrl(candidate.symbol)}
                            alt={`${candidate.party || "Party"} symbol`}
                            className="w-full h-full object-contain p-3"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-400">No Symbol</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{candidate.party || "Independent"}</p>
                      </div>

                      {selectedCandidate === candidate._id && (
                        <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </label>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  <button
                    onClick={() => setShowModal(true)}
                    disabled={!selectedCandidate}
                    className={`px-12 py-4 rounded-lg font-medium text-lg transition ${
                      selectedCandidate
                        ? "bg-blue-800 hover:bg-blue-900 text-white shadow-md"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Cast Vote
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">
              Confirm Your Vote
            </h3>
            <p className="text-center text-gray-700 mb-8">
              Are you sure you want to vote for{" "}
              <span className="font-bold text-blue-800">
                {election.candidates.find((c) => c._id === selectedCandidate)?.name}
              </span>
              ?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleVote}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
              >
                Yes, Cast Vote
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}