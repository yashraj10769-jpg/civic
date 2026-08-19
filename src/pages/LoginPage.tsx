import { useState } from "react";

type Page = string;

interface LoginPageProps {
  onNavigate: (page: Page) => void;
  onLogin: (isAdmin: boolean) => void;
}

const districts = ["Ranchi", "Dhanbad", "Jamshedpur", "Bokaro", "Hazaribagh", "Giridih", "Deoghar", "Dumka"];

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [tab, setTab] = useState<"login" | "otp" | "register">("login");
  const [otpSent, setOtpSent] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", mobile: "", otp: "", name: "", district: "", ward: "", confirmPass: "" });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (registered) {
    return (
      <div className="page-enter min-h-screen bg-[#F4F6FA] flex items-center justify-center px-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
          <h2 className="text-2xl font-bold font-serif text-[#0F172A] mb-2">Welcome to CivicSetu!</h2>
          <p className="text-[#64748B] mb-1">Your CivicSetu profile is ready.</p>
          <p className="text-sm text-[#94A3B8] mb-6">You can now report civic issues and track complaints.</p>
          <button
            onClick={() => { onLogin(false); onNavigate("dashboard"); }}
            className="w-full bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold py-3 rounded transition-colors"
          >
            Go to My Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter min-h-screen bg-[#F4F6FA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="govt-seal mx-auto mb-3" />
          <div className="text-xs text-[#64748B] mb-1">Government of Jharkhand</div>
          <h1 className="text-2xl font-bold font-serif text-[#1B3A6B]">Citizen Login</h1>
          <p className="text-sm text-[#64748B] mt-1">CivicSetu Civic Issue Platform</p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#E2E8F0]">
            {[
              { key: "login", label: "Password Login" },
              { key: "otp", label: "OTP Login" },
              { key: "register", label: "Register" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key as typeof tab)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  tab === key
                    ? "border-b-2 border-[#1B3A6B] text-[#1B3A6B] bg-[#F8FAFC]"
                    : "text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Password Login */}
            {tab === "login" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Mobile Number / Email</label>
                  <input
                    type="text"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/20 outline-none transition-colors"
                    placeholder="Enter your mobile or email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/20 outline-none transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex justify-end">
                  <button className="text-sm text-[#1B3A6B] hover:underline">Forgot Password?</button>
                </div>
                <button
                  onClick={() => { onLogin(false); onNavigate("dashboard"); }}
                  className="w-full bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold py-3 rounded transition-colors"
                >
                  Login
                </button>
                <p className="text-xs text-[#94A3B8] text-center">
                  Your personal information is protected under Government data privacy guidelines.
                </p>
              </div>
            )}

            {/* OTP Login */}
            {tab === "otp" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={(e) => set("mobile", e.target.value)}
                    className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/20 outline-none transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                {!otpSent ? (
                  <button
                    onClick={() => setOtpSent(true)}
                    className="w-full bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold py-3 rounded transition-colors"
                  >
                    Send OTP
                  </button>
                ) : (
                  <>
                    <div className="bg-emerald-50 text-emerald-700 text-sm px-3 py-2 rounded border border-emerald-200">
                      OTP sent to your registered mobile number.
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">Enter OTP</label>
                      <input
                        type="text"
                        value={form.otp}
                        onChange={(e) => set("otp", e.target.value)}
                        className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/20 outline-none transition-colors tracking-widest text-center text-lg"
                        placeholder="_ _ _ _ _ _"
                        maxLength={6}
                      />
                    </div>
                    <button
                      onClick={() => { onLogin(false); onNavigate("dashboard"); }}
                      className="w-full bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold py-3 rounded transition-colors"
                    >
                      Login with OTP
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Register */}
            {tab === "register" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/20 outline-none"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1">Mobile Number</label>
                  <input type="tel" className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] outline-none" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1">Email Address</label>
                  <input type="email" className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] outline-none" placeholder="email@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">District</label>
                    <select
                      value={form.district}
                      onChange={(e) => set("district", e.target.value)}
                      className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] outline-none"
                    >
                      <option value="">Select</option>
                      {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1">Ward</label>
                    <input type="text" className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] outline-none" placeholder="Ward No." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1">Password</label>
                  <input type="password" className="w-full border border-[#CBD5E1] rounded px-3 py-2.5 text-sm focus:border-[#1B3A6B] outline-none" placeholder="Create a password" />
                </div>
                <button
                  onClick={() => setRegistered(true)}
                  className="w-full bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold py-3 rounded transition-colors mt-2"
                >
                  Create Citizen Account
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate("admin-login")}
            className="text-xs text-[#94A3B8] hover:text-[#1B3A6B] transition-colors"
          >
            Government Administration Login →
          </button>
        </div>
      </div>
    </div>
  );
}
