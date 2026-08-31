"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for MVP since database is not connected
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <img src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1788158662/logo_kiwi_tilers_trds8h.webp" alt="KiwiTilers Logo" className="h-20 w-auto object-contain mb-6" />
          <p className="text-slate-500 mt-2">Admin Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50" 
              placeholder="admin@kiwitilers.co.nz" 
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50" 
              placeholder="••••••••" 
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 mt-4 font-medium text-base shadow-md">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
