// app/(admin)/admin/elections/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, BarChart3, Trash2, Calendar } from "lucide-react";
import API from "../../../../lib/api";
export default function ElectionsList() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const res = await API.get("/admin/elections");
      setElections(res.data.elections);
    } catch (err) {
      alert("Failed to load elections");
    } finally {
      setLoading(false);
    }
  };

  const deleteElection = async (id) => {
    if (!confirm("Delete this election permanently?")) return;
    try {
      await API.delete(`/admin/elections/${id}`);
      setElections(elections.filter(e => e._id !== id));
    } catch (err) {
      alert("Cannot delete active election");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-950 text-white border-b-8 border-indigo-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Election Management</h1>
          <Link href="/admin/elections/create" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2">
            <Plus className="w-5 h-5" /> Create New Election
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {loading ? (
          <div className="text-center py-20">Loading elections...</div>
        ) : elections.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-xl">No elections created yet</p>
            <Link href="/admin/elections/create" className="text-indigo-600 hover:underline mt-4 inline-block">
              Create your first election →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {elections.map((election) => (
              <div key={election._id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white p-5">
                  <h3 className="text-lg font-bold">{election.title}</h3>
                  <p className="text-sm opacity-90 mt-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {new Date(election.startDate).toLocaleDateString()} → {new Date(election.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-sm">{election.description || "No description"}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      election.status === "active" ? "bg-blue-100 text-blue-800" :
                      election.status === "completed" ? "bg-gray-100 text-gray-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {election.status.toUpperCase()}
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/admin/elections/${election._id}/edit`} className="text-indigo-600 hover:text-indigo-800">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <Link href={`/admin/elections/${election._id}/results`} className="text-blue-600 hover:text-blue-800">
                        <BarChart3 className="w-5 h-5" />
                      </Link>
                      <button onClick={() => deleteElection(election._id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}