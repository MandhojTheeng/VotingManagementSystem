// app/(protected)/layout.jsx
import { redirect } from "next/navigation";

export default function ProtectedLayout({ children }) {
  // This runs on the server — safest way
  // In App Router, we use middleware or server check
  // But for simplicity, we'll use client-side check in dashboard

  // We'll keep it simple — actual protection in dashboard page
  return <>{children}</>;
}