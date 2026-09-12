"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kiwitilers.co.nz");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (json.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_token", "authenticated");
          sessionStorage.setItem("admin_user", JSON.stringify(json.user));
        }
        router.push("/admin");
      } else {
        setError(json.error || "Authentication failed");
      }
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-200/80 w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1788159188/logo-kiwitilers_p9ef5q.webp"
            alt="KiwiTilers Logo"
            className="h-14 w-auto object-contain mb-3"
          />
          <h2 className="text-xl font-bold text-slate-900">Admin Control Panel</h2>
          <p className="text-xs text-slate-500 mt-1">Sign in to manage leads, services, and portfolio</p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50"
                placeholder="admin@kiwitilers.co.nz"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50"
                placeholder="••••••••"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 font-medium text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <div className="inline-block bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-left text-xs text-slate-600">
            <div className="font-semibold text-slate-800 mb-0.5">Seeded Admin Credentials:</div>
            <div>Email: <span className="font-mono text-blue-600">admin@kiwitilers.co.nz</span></div>
            <div>Password: <span className="font-mono text-blue-600">admin123</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
