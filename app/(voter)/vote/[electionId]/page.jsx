// app/(voter)/vote/[electionId]/page.jsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "../../../../lib/api";

export default function VotePage({ params }) {
  const electionId = params.electionId;
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get(`/elections/${electionId}/candidates`);
        setCandidates(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [electionId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!selected) return setMsg("Please choose a candidate");
    try {
      await API.post("/vote", { electionId, candidateId: selected });
      setMsg("Vote submitted successfully");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Vote failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Vote</h2>
      <form onSubmit={submit} className="space-y-3">
        {candidates.map(c => (
          <label key={c._id} className="block p-3 border rounded">
            <input type="radio" name="candidate" value={c._id} onChange={() => setSelected(c._id)} />
            <span className="ml-2 font-medium">{c.name}</span>
            <div className="text-sm text-gray-600">{c.description}</div>
          </label>
        ))}
        {msg && <div className="text-sm text-green-600">{msg}</div>}
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">Submit Vote</button>
      </form>
    </div>
  );
}
