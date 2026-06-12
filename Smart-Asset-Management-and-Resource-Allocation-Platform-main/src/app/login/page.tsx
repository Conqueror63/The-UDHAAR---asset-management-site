"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, Mail, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.refresh();
        router.push("/");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (err) {
      setError(`Failed to sign in with ${provider}.`);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-[#030407] px-4 py-12 relative overflow-x-hidden">
      {/* Curved neon gradient background spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-teal-600/10 blur-[110px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293704_1px,transparent_1px),linear-gradient(to_bottom,#1f293704_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#08090d]/65 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-500 shadow-xl shadow-cyan-500/10 mb-4.5">
            <img src="/logo.png" alt="AssetFlow Logo" className="h-9 w-9 object-contain" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-450 mt-2 font-semibold uppercase tracking-wider">Sign in to manage your council assets</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs flex items-start gap-2.5 font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xxs font-extrabold uppercase tracking-widest text-slate-500 mb-2.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-550" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your IITR email"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/15 transition-all text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xxs font-extrabold uppercase tracking-widest text-slate-500 mb-2.5">Password</label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-555" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-850 rounded-xl text-white placeholder-slate-655 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/15 transition-all text-sm font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 rounded-xl font-black shadow-lg shadow-cyan-600/10 hover:shadow-cyan-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest"
          >
            {loading ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="my-6.5 flex items-center justify-between text-slate-800">
          <span className="w-full border-t border-slate-900" />
          <span className="px-4 text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">or</span>
          <span className="w-full border-t border-slate-900" />
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleOAuthSignIn("github")}
            className="flex items-center justify-center gap-2.5 py-3 bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-300 hover:text-white rounded-xl transition-all text-xs font-bold cursor-pointer"
          >
            <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg> GitHub
          </button>
          <button
            type="button"
            onClick={() => handleOAuthSignIn("google")}
            className="flex items-center justify-center gap-2.5 py-3 bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-300 hover:text-white rounded-xl transition-all text-xs font-bold cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.233 1 0 6.233 0 13s5.233 12 12.24 12c7.31 0 12.164-5.114 12.164-12.384 0-.83-.09-1.464-.2-2.094H12.24z" />
            </svg> Google
          </button>
        </div>

        <div className="mt-8 text-center text-xs font-semibold text-slate-450">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-cyan-400 hover:underline hover:text-cyan-300">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
