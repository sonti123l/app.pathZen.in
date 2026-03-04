import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authLogin } from "@/services/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const authenticationMutation = useMutation({
    mutationFn: async ({payload}:{payload: {email: string, password: string}}) => {
      const res = await authLogin(payload);
      return res;
    },
    onSuccess: (res) => {
      navigate({ to: "/dashboard" });
    },
  });

  const handleSubmit = () => {
    if (!email || !password) return;
    const payload = {
        email: email,
        password: password
    }
    authenticationMutation.mutate({payload});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0ecff] via-[#e8e0fa] to-[#ede8ff] p-5 font-sans">
      <div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-[0_8px_48px_rgba(120,90,200,0.12)]">

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-2xl text-[#7c5cbf]">✦</span>
          <p className="text-xs text-[#a090c8] font-medium tracking-widest uppercase">Welcome back</p>
        </div>

        <h1 className="text-3xl text-[#1e1233] mb-7 font-light tracking-tight">Sign in</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-[11px] font-semibold text-[#6e5fa8] uppercase tracking-widest mb-1.5">
            Email
          </label>
          <div className="flex items-center gap-2.5 bg-[#f7f4ff] border border-[#e5dff7] rounded-xl px-3.5 focus-within:ring-2 focus-within:ring-[#c8b8ff] transition-all">
            <svg className="shrink-0" width="16" height="16" fill="none" stroke="#9b8ecb" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="M2 7l10 7 10-7" />
            </svg>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none py-3 text-sm text-[#1e1233] placeholder:text-[#c5bce8]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-[11px] font-semibold text-[#6e5fa8] uppercase tracking-widest mb-1.5">
            Password
          </label>
          <div className="flex items-center gap-2.5 bg-[#f7f4ff] border border-[#e5dff7] rounded-xl px-3.5 focus-within:ring-2 focus-within:ring-[#c8b8ff] transition-all">
            <svg className="shrink-0" width="16" height="16" fill="none" stroke="#9b8ecb" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none py-3 text-sm text-[#1e1233] placeholder:text-[#c5bce8]"
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="shrink-0 flex items-center text-[#9b8ecb] hover:opacity-70 transition-opacity"
            >
              {showPass ? (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Remember Me + Forgot */}
        <div className="flex items-center justify-between mt-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setRemember((r) => !r)}>
            <div
              className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                remember ? "bg-[#7c5cbf] border-[#7c5cbf]" : "bg-transparent border-[#c5bce8]"
              }`}
              style={{ width: 18, height: 18, borderRadius: 5, border: `1.8px solid ${remember ? "#7c5cbf" : "#c5bce8"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0, background: remember ? "#7c5cbf" : "transparent" }}
            >
              {remember && (
                <svg width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-sm text-[#5a4d80]">Remember me</span>
          </label>
          <a href="#" className="text-xs text-[#7c5cbf] font-medium hover:opacity-70 transition-opacity">
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={authenticationMutation.isPending}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide bg-gradient-to-r from-[#7c5cbf] to-[#9b72e8] shadow-[0_4px_18px_rgba(124,92,191,0.3)] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          {authenticationMutation.isPending ? "Signing in…" : "Sign in →"}
        </button>

        {/* Sign up */}
        <p className="text-center mt-5 text-sm text-[#9b8ecb]">
          Don't have an account?{" "}
          <a href="#" className="text-[#7c5cbf] font-semibold hover:opacity-70 transition-opacity">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}