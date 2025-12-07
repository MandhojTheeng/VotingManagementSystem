"use client";
import { useState } from "react";
import API from "../../../lib/api";
import { setToken } from "../../../lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password, role: "voter" });
      setToken(res.data.token);
      router.push("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" required />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" required />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" required />
        {err && <div className="text-red-600">{err}</div>}
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">Register</button>
      </form>
    </div>
  );
}
