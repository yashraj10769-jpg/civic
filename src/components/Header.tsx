import { useState } from "react";

type Page =
  | "home"
  | "report"
  | "track"
  | "map"
  | "community"
  | "about"
  | "login"
  | "admin-login"
  | "dashboard"
  | "admin-dashboard"
  | "notifications"
  | "gamification"
  | "certificates";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  notificationCount: number;
  lang: "en" | "hi" | "mr";
  onLangChange: (l: "en" | "hi" | "mr") => void;
  onLogout: () => void;
  fontSize: number;
  onFontSize: (d: number) => void;
  highContrast: boolean;
  onToggleContrast: () => void;
}

const labels = {
  en: { home: "Home", report: "Report Issue", track: "Track Complaint", map: "Map", community: "Community", about: "About", login: "Login", reportBtn: "Report an Issue", logout: "Logout", dashboard: "My Dashboard" },
  hi: { home: "होम", report: "समस्या दर्ज करें", track: "शिकायत ट्रैक करें", map: "नक्शा", community: "समुदाय", about: "परिचय", login: "लॉगिन", reportBtn: "समस्या दर्ज करें", logout: "लॉगआउट", dashboard: "मेरा डैशबोर्ड" },
  mr: { home: "मुख्यपृष्ठ", report: "समस्या नोंदवा", track: "तक्रार ट्रॅक करा", map: "नकाशा", community: "समुदाय", about: "माहिती", login: "लॉगिन", reportBtn: "समस्या नोंदवा", logout: "लॉगआउट", dashboard: "माझा डॅशबोर्ड" },
};

const navItems: { key: Page; labelKey: keyof typeof labels.en }[] = [
  { key: "home", labelKey: "home" },
  { key: "report", labelKey: "report" },
  { key: "track", labelKey: "track" },
  { key: "map", labelKey: "map" },
  { key: "community", labelKey: "community" },
  { key: "about", labelKey: "about" },
];

export default function Header({
  currentPage,
  onNavigate,
  isLoggedIn,
  isAdmin,
  notificationCount,
  lang,
  onLangChange,
  onLogout,
  fontSize,
  onFontSize,
  highContrast,
  onToggleContrast,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = labels[lang];

  return (
    <>
      {/* Top government strip */}
      <div className="bg-[#1B3A6B] text-white text-xs py-1 px-4 flex items-center justify-between">
        <span className="hidden sm:block opacity-80">Government of Jharkhand — Official Digital Civic Platform</span>
        <span className="sm:hidden opacity-80">Govt. of Jharkhand</span>
        <div className="flex items-center gap-3">
          {/* Accessibility toolbar */}
          <button
            onClick={() => onFontSize(-1)}
            className="opacity-70 hover:opacity-100 transition-opacity font-mono font-bold"
            title="Decrease font size"
            aria-label="Decrease font size"
          >A-</button>
          <button
            onClick={() => onFontSize(1)}
            className="opacity-70 hover:opacity-100 transition-opacity font-mono font-bold"
            title="Increase font size"
            aria-label="Increase font size"
          >A+</button>
          <button
            onClick={onToggleContrast}
            className={`text-xs px-2 py-0.5 rounded border transition-colors ${highContrast ? "bg-yellow-300 text-black border-yellow-300" : "border-white/30 opacity-70 hover:opacity-100"}`}
            aria-label="Toggle high contrast"
            title="High Contrast"
          >HC</button>
          <select
            value={lang}
            onChange={(e) => onLangChange(e.target.value as "en" | "hi" | "mr")}
            className="bg-transparent text-white text-xs border-none cursor-pointer opacity-80 hover:opacity-100"
            aria-label="Select language"
          >
            <option value="en" className="text-black">EN</option>
            <option value="hi" className="text-black">हिन्दी</option>
            <option value="mr" className="text-black">मराठी</option>
          </select>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white border-b-2 border-[#1B3A6B] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Branding */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 flex-shrink-0 hover:opacity-90 transition-opacity"
            aria-label="CivicSetu Home"
          >
            <div className="govt-seal">
              <span className="text-[8px] font-bold leading-tight text-center">GOV<br/>JH</span>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[10px] text-[#64748B] font-medium leading-none">Government of Jharkhand</div>
              <div className="text-[18px] font-bold text-[#1B3A6B] leading-tight font-serif">CivicSetu</div>
            </div>
            <div className="sm:hidden text-[16px] font-bold text-[#1B3A6B] font-serif">CivicSetu</div>
          </button>

          <div className="hidden xl:block h-8 w-px bg-[#CBD5E1] mx-1" />

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1 flex-1" aria-label="Main navigation">
            {navItems.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  currentPage === key
                    ? "bg-[#1B3A6B] text-white"
                    : "text-[#374151] hover:bg-[#F1F5F9] hover:text-[#1B3A6B]"
                }`}
              >
                {t[labelKey]}
              </button>
            ))}
            {isLoggedIn && !isAdmin && (
              <button
                onClick={() => onNavigate("dashboard")}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  currentPage === "dashboard"
                    ? "bg-[#1B3A6B] text-white"
                    : "text-[#374151] hover:bg-[#F1F5F9] hover:text-[#1B3A6B]"
                }`}
              >
                {t.dashboard}
              </button>
            )}
            {isAdmin && (
              <button
                onClick={() => onNavigate("admin-dashboard")}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  currentPage === "admin-dashboard"
                    ? "bg-[#1B3A6B] text-white"
                    : "text-[#374151] hover:bg-[#F1F5F9] hover:text-[#1B3A6B]"
                }`}
              >
                Admin Panel
              </button>
            )}
          </nav>

          <div className="flex-1 xl:flex-none" />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            {isLoggedIn && (
              <button
                onClick={() => onNavigate("notifications")}
                className="relative p-2 rounded hover:bg-[#F1F5F9] text-[#374151] transition-colors"
                aria-label={`Notifications (${notificationCount} unread)`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            )}

            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="hidden sm:block text-sm text-[#64748B] hover:text-[#1B3A6B] px-3 py-1.5 rounded hover:bg-[#F1F5F9] transition-colors"
              >
                {t.logout}
              </button>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="hidden sm:block text-sm text-[#1B3A6B] font-medium px-3 py-1.5 rounded border border-[#1B3A6B] hover:bg-[#F1F5F9] transition-colors"
              >
                {t.login}
              </button>
            )}

            <button
              onClick={() => onNavigate("report")}
              className="bg-[#FF9933] hover:bg-[#e8881e] text-white font-semibold text-sm px-4 py-2 rounded transition-colors"
            >
              <span className="hidden sm:inline">{t.reportBtn}</span>
              <span className="sm:hidden">Report</span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded hover:bg-[#F1F5F9] text-[#374151] transition-colors"
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <><path d="M18 6 6 18" /><path d="M6 6l12 12" /></>
                ) : (
                  <><path d="M4 6h16M4 12h16M4 18h16" /></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="xl:hidden border-t border-[#E2E8F0] bg-white px-4 py-3">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map(({ key, labelKey }) => (
                <button
                  key={key}
                  onClick={() => { onNavigate(key); setMobileOpen(false); }}
                  className={`text-left px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                    currentPage === key
                      ? "bg-[#1B3A6B] text-white"
                      : "text-[#374151] hover:bg-[#F1F5F9]"
                  }`}
                >
                  {t[labelKey]}
                </button>
              ))}
              {isLoggedIn && !isAdmin && (
                <button
                  onClick={() => { onNavigate("dashboard"); setMobileOpen(false); }}
                  className="text-left px-3 py-2.5 rounded text-sm font-medium text-[#374151] hover:bg-[#F1F5F9]"
                >
                  {t.dashboard}
                </button>
              )}
              {isLoggedIn ? (
                <button onClick={onLogout} className="text-left px-3 py-2.5 rounded text-sm text-[#64748B] hover:bg-[#F1F5F9]">
                  {t.logout}
                </button>
              ) : (
                <button onClick={() => { onNavigate("login"); setMobileOpen(false); }} className="text-left px-3 py-2.5 rounded text-sm text-[#1B3A6B] font-medium hover:bg-[#F1F5F9]">
                  {t.login}
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Bottom mobile nav (logged in) */}
      {isLoggedIn && !isAdmin && (
        <nav className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] z-40 flex" aria-label="Bottom navigation">
          {[
            { key: "home" as Page, icon: "🏠", label: "Home" },
            { key: "report" as Page, icon: "📝", label: "Report", highlight: true },
            { key: "map" as Page, icon: "🗺️", label: "Map" },
            { key: "dashboard" as Page, icon: "📊", label: "My Reports" },
            { key: "gamification" as Page, icon: "⭐", label: "Profile" },
          ].map(({ key, icon, label, highlight }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-medium transition-colors ${
                highlight
                  ? "relative"
                  : currentPage === key
                    ? "text-[#1B3A6B]"
                    : "text-[#94A3B8]"
              }`}
            >
              {highlight ? (
                <span className="w-12 h-12 -mt-4 bg-[#FF9933] rounded-full flex items-center justify-center text-xl shadow-lg">
                  {icon}
                </span>
              ) : (
                <span className="text-lg">{icon}</span>
              )}
              <span className={highlight ? "text-[#FF9933] font-semibold" : ""}>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
