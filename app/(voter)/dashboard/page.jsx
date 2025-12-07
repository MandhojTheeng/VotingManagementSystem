"use client";
import { useEffect, useState } from "react";
import API from "../../../lib/api";
import ElectionCard from "../../../components/ElectionCard";

export default function VoterDashboard() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/elections");
        setElections(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl">Elections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {elections.map((e) => <ElectionCard key={e._id} election={e} />)}
      </div>
    </div>
  );
}

