import { useState } from "react";

type Page = string;

interface AdminLoginPageProps {
  onNavigate: (page: Page) => void;
  onLogin: (isAdmin: boolean) => void;
}

export default function AdminLoginPage({ onNavigate, onLogin }: AdminLoginPageProps) {
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [captchaVal] = useState("X7K4P2");
  const [captchaInput, setCaptchaInput] = useState("");
  const [twoFACode, setTwoFACode] = useState("");

  return (
    <div className="page-enter min-h-screen bg-[#0F172A] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#1B3A6B] border-2 border-[#FF9933] flex items-center justify-center mx-auto mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="text-xs text-slate-400 mb-1">Government of Jharkhand</div>
          <h1 className="text-2xl font-bold font-serif text-white">Government Administration Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Authorized Personnel Only — CivicSetu Admin</p>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
          {/* Security notice */}
          <div className="bg-[#FF9933]/10 border-b border-[#FF9933]/20 px-5 py-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF9933" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="text-xs text-[#FF9933]">
              This system is restricted to authorized government employees only. All access is logged and monitored.
            </span>
          </div>

          <div className="p-6">
            {step === "credentials" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Official Email / Employee ID</label>
                  <input
                    type="text"
                    className="w-full bg-[#0F172A] border border-[#334155] text-white rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/30 outline-none transition-colors placeholder-slate-600"
                    placeholder="employee@jharkhand.gov.in"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                  <input
                    type="password"
                    className="w-full bg-[#0F172A] border border-[#334155] text-white rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/30 outline-none transition-colors placeholder-slate-600"
                    placeholder="Enter your password"
                  />
                </div>

                {/* CAPTCHA */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Security CAPTCHA</label>
                  <div className="flex items-center gap-3">
                    <div className="bg-[#0F172A] border border-[#334155] rounded px-4 py-2 font-mono font-bold text-white tracking-widest text-lg select-none"
                      style={{ background: "repeating-linear-gradient(45deg, #0F172A, #0F172A 3px, #1E293B 3px, #1E293B 6px)" }}>
                      {captchaVal}
                    </div>
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="flex-1 bg-[#0F172A] border border-[#334155] text-white rounded px-3 py-2 text-sm focus:border-[#1B3A6B] outline-none font-mono"
                      placeholder="Enter CAPTCHA"
                      maxLength={6}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep("2fa")}
                  className="w-full bg-[#1B3A6B] hover:bg-[#2A5298] text-white font-semibold py-3 rounded transition-colors"
                >
                  Secure Login
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm text-slate-300">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500 mt-1">Enter the 6-digit code sent to your registered device.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Authentication Code</label>
                  <input
                    type="text"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value)}
                    className="w-full bg-[#0F172A] border border-[#334155] text-white rounded px-3 py-2.5 text-sm font-mono tracking-widest text-center text-xl focus:border-[#1B3A6B] outline-none"
                    placeholder="_ _ _ _ _ _"
                    maxLength={6}
                  />
                </div>
                <button
                  onClick={() => { onLogin(true); onNavigate("admin-dashboard"); }}
                  className="w-full bg-[#1B3A6B] hover:bg-[#2A5298] text-white font-semibold py-3 rounded transition-colors"
                >
                  Verify &amp; Enter Portal
                </button>
                <button
                  onClick={() => setStep("credentials")}
                  className="w-full text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  ← Back
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate("login")}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Citizen Login →
          </button>
        </div>
      </div>
    </div>
  );
}
