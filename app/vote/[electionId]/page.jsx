// app/vote/[electionId]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { getToken } from "../../../lib/auth";

export default function VotePage() {
  const { electionId } = useParams();
  const router = useRouter();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [lang, setLang] = useState("en"); // en or np

  const t = {
    en: {
      title: "Choose Your Candidate",
      confirm: "Confirm Your Vote",
      confirmText: "Are you sure you want to vote for",
      voteBtn: "Vote Now",
      voted: "You have already voted in this election",
      thanks: "Thank you for voting!",
      back: "Back to Dashboard",
      votingClosed: "Voting is closed for this election",
    },
    np: {
      title: "आफ्नो उम्मेदवार छान्नुहोस्",
      confirm: "आफ्नो मत पुष्टि गर्नुहोस्",
      confirmText: "के तपाईँ निश्चित हुनुहुन्छ कि तपाईँ",
      voteBtn: "मतदान गर्नुहोस्",
      voted: "तपाईँले यो निर्वाचनमा पहिले नै मतदान गरिसक्नुभएको छ",
      thanks: "मतदान गरेकोमा धन्यवाद!",
      back: "ड्यासबोर्डमा फर्कनुहोस्",
      votingClosed: "यो निर्वाचनको लागि मतदान बन्द भइसकेको छ",
    },
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchElection = async () => {
      try {
        const res = await API.get(`/elections/${electionId}`);
        setElection(res.data.election);

        // Check if user already voted
        const voteCheck = await API.get(`/api/votes/check/${electionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasVoted(voteCheck.data.hasVoted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [electionId, router]);

  const handleVote = async () => {
    if (!selectedCandidate) return;

    try {
      const token = getToken();
      await API.post(
        "/api/votes",
        { electionId, candidateId: selectedCandidate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHasVoted(true);
      setShowModal(false);
    } catch (err) {
      alert("Vote failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-2xl font-bold text-blue-900">Loading...</p>
      </div>
    );
  }

  if (!election || election.status !== "active") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-4">
            {election?.status === "completed" ? t[lang].votingClosed : "Election Not Active"}
          </h2>
          <button onClick={() => router.push("/dashboard")} className="bg-blue-800 text-white py-3 px-8 rounded-full">
            {t[lang].back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Language Toggle */}
        <div className="text-right mb-6">
          <button
            onClick={() => setLang(lang === "en" ? "np" : "en")}
            className="bg-blue-800 text-white px-6 py-2 rounded-full text-sm font-bold"
          >
            {lang === "en" ? "नेपाली" : "English"}
          </button>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-10 mb-10 shadow-xl text-center">
          <h1 className="text-4xl font-extrabold mb-3">{election.title}</h1>
          <p className="text-lg opacity-90">
            {new Date(election.startDate).toLocaleDateString("en-NP", { dateStyle: "long" })} –{" "}
            {new Date(election.endDate).toLocaleDateString("en-NP", { dateStyle: "long" })}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">{t[lang].title}</h2>

          {hasVoted ? (
            <div className="text-center py-20">
              <h3 className="text-4xl font-bold text-green-600 mb-4">Thank you for voting!</h3>
              <p className="text-xl text-gray-700">{t[lang].thanks}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {election.candidates.map((candidate) => (
                <div
                  key={candidate._id}
                  onClick={() => setSelectedCandidate(candidate._id)}
                  className={`flex items-center justify-between p-8 border-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    selectedCandidate === candidate._id
                      ? "border-blue-600 bg-blue-50 shadow-xl"
                      : "border-blue-100 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 bg-gray-200 border-2 border-dashed rounded-xl" />
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">{candidate.name}</h3>
                      <p className="text-lg text-gray-700">{candidate.party || "Independent"}</p>
                    </div>
                  </div>
                  {selectedCandidate === candidate._id && (
                    <div className="text-blue-600 text-3xl">Checkmark</div>
                  )}
                </div>
              ))}
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowModal(true)}
                  disabled={!selectedCandidate}
                  className={`py-4 px-12 rounded-full text-xl font-bold transition ${
                    selectedCandidate
                      ? "bg-blue-800 hover:bg-blue-900 text-white shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {t[lang].voteBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-10 max-w-md shadow-2xl text-center">
            <h3 className="text-3xl font-bold text-blue-900 mb-6">{t[lang].confirm}</h3>
            <p className="text-xl text-gray-700 mb-8">
              {t[lang].confirmText}
              <br />
              <span className="font-bold text-blue-800">
                {election.candidates.find((c) => c._id === selectedCandidate)?.name}
              </span>
              ?
            </p>
            <div className="flex gap-6 justify-center">
              <button
                onClick={handleVote}
                className="bg-green-600 hover:bg-green-700 text-white py-4 px-10 rounded-full font-bold text-lg"
              >
                Yes, Vote
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-4 px-10 rounded-full font-bold text-lg"
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