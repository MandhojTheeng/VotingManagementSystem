// app/(admin)/layout.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLoggedIn, isAdmin } from "../../lib/auth";

export default function AdminLayout({ children }) {
  const router = useRouter();

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) {
      router.replace("/login");
    }
  }, [router]);

  // Always render the protected layout
  // (redirect happens instantly on client – no flash, no hydration mismatch)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div>
        {children}
      </div>
    </div>
  );
}