// app/(admin)/dashboard/page.jsx
"use client";
import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { socket } from "../../../lib/socket";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ elections: 0, votes: 0, candidates: 0 });
  const [live, setLive] = useState(null);

  useEffect(() => {
    // fetch initial stats
    (async () => {
      try {
        const res = await API.get("/admin/stats"); // create this endpoint in backend
        setStats(res.data);
      } catch (err) { console.error(err); }
    })();

    // connect socket and listen for vote updates
    socket.connect();
    socket.on("vote_cast", (payload) => {
      // payload could be { electionId, candidateId, counts }
      setLive(payload);
    });

    return () => {
      socket.off("vote_cast");
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 border rounded">
          <div className="text-sm text-gray-500">Elections</div>
          <div className="text-2xl font-bold">{stats.elections}</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-gray-500">Candidates</div>
          <div className="text-2xl font-bold">{stats.candidates}</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-gray-500">Votes</div>
          <div className="text-2xl font-bold">{stats.votes}</div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl mb-2">Live update</h3>
        {live ? (
          <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(live, null, 2)}</pre>
        ) : (
          <div className="text-gray-600">No live updates yet</div>
        )}
      </div>
    </div>
  );
}
