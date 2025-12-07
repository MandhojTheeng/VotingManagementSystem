"use client";
import Link from "next/link";

export default function ElectionCard({ election }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h3 className="text-xl font-semibold">{election.title}</h3>
      <p className="text-sm text-gray-600">{election.description}</p>
      <div className="mt-4">
        <Link href={`/vote/${election._id}`} className="px-3 py-1 border rounded">Vote</Link>
      </div>
    </div>
  );
}
