"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "../actions/auth";
import { User, Mail, KeyRound, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const SECTIONS = ["CineSec", "MusicSec", "Choreography", "Drama", "Cultural Council"];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CONSUMER");
  const [section, setSection] = useState(SECTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await registerUser({
        name,
        email,
        password,
        role,
        section,
      });

      if (!res.success) {
        setError(res.error || "Failed to register.");
        setLoading(false);
      } else {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-[#030407] px-4 py-12 relative overflow-x-hidden">
      {/* Curved neon gradient background spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-teal-600/10 blur-[110px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293704_1px,transparent_1px),linear-gradient(to_bottom,#1f293704_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Register Card */}
      <div className="w-full max-w-md bg-[#08090d]/65 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-500 shadow-xl shadow-cyan-500/10 mb-4.5">
            <img src="/logo.png" alt="AssetFlow Logo" className="h-9 w-9 object-contain" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Create Account</h2>
          <p className="text-xs text-slate-450 mt-2 font-semibold uppercase tracking-wider">Register for AssetFlow IITR Platform</p>
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs flex items-start gap-2.5 font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-2.5 animate-pulse font-semibold">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xxs font-extrabold uppercase tracking-widest text-slate-500 mb-2.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-550" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-855 rounded-xl text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/15 transition-all text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xxs font-extrabold uppercase tracking-widest text-slate-500 mb-2.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-550" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-855 rounded-xl text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/15 transition-all text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xxs font-extrabold uppercase tracking-widest text-slate-500 mb-2.5">Password</label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-550" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-855 rounded-xl text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/15 transition-all text-sm font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xxs font-extrabold uppercase tracking-widest text-slate-500 mb-2.5">Role Type</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-950 border border-slate-855 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-all text-sm cursor-pointer font-semibold"
              >
                <option value="CONSUMER">Consumer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xxs font-extrabold uppercase tracking-widest text-slate-500 mb-2.5">Section</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-950 border border-slate-855 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-all text-sm cursor-pointer font-semibold"
              >
                {SECTIONS.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 rounded-xl font-black shadow-lg shadow-cyan-600/10 hover:shadow-cyan-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest"
          >
            {loading ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" /> Registering...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs font-semibold text-slate-450">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline hover:text-cyan-300">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
