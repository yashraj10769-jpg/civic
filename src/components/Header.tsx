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
  textSpacing?: boolean;
  onToggleTextSpacing?: () => void;
  lineHeight?: boolean;
  onToggleLineHeight?: () => void;
  hideImages?: boolean;
  onToggleHideImages?: () => void;
}

const labels = {
  en: {
    home: "Home",
    report: "Report Grievance",
    track: "Track Grievance",
    map: "Ward GIS Map",
    community: "Community Feed",
    about: "About Portal",
    services: "Civic Services",
    login: "Citizen Login",
    reportBtn: "File a Grievance",
    logout: "Logout",
    dashboard: "My Dashboard",
    admin: "Admin Portal",
  },
  hi: {
    home: "होम",
    report: "समस्या दर्ज करें",
    track: "शिकायत ट्रैक करें",
    map: "वार्ड नक्शा",
    community: "नागरिक समुदाय",
    about: "पोर्टल परिचय",
    services: "नागरिक सेवाएं",
    login: "नागरिक लॉगिन",
    reportBtn: "शिकायत दर्ज करें",
    logout: "लॉगआउट",
    dashboard: "मेरा डैशबोर्ड",
    admin: "प्रशासन पोर्टल",
  },
  mr: {
    home: "मुख्यपृष्ठ",
    report: "तक्रार नोंदवा",
    track: "तक्रार ट्रॅक करा",
    map: "वॉर्ड नकाशा",
    community: "नागरिक मंच",
    about: "पोर्टल माहिती",
    services: "नागरी सेवा",
    login: "नागरिक लॉगिन",
    reportBtn: "तक्रार नोंदवा",
    logout: "लॉगआउट",
    dashboard: "माझा डॅशबोर्ड",
    admin: "प्रशासन पॅनेल",
  },
};

const holidays2026 = [
  { date: "26 Jan", name: "Republic Day", day: "Monday" },
  { date: "03 Mar", name: "Holi", day: "Tuesday" },
  { date: "20 Mar", name: "Id-ul-Fitr (Eid)", day: "Friday" },
  { date: "03 Apr", name: "Good Friday", day: "Friday" },
  { date: "14 Apr", name: "Dr. B.R. Ambedkar Jayanti", day: "Tuesday" },
  { date: "15 Aug", name: "Independence Day", day: "Saturday" },
  { date: "02 Oct", name: "Mahatma Gandhi Jayanti (Swachhta Diwas)", day: "Friday" },
  { date: "20 Oct", name: "Dussehra", day: "Tuesday" },
  { date: "08 Nov", name: "Diwali (Deepavali)", day: "Sunday" },
  { date: "16 Nov", name: "Chhath Puja", day: "Monday" },
  { date: "25 Dec", name: "Christmas", day: "Friday" },
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
  textSpacing = false,
  onToggleTextSpacing,
  lineHeight = false,
  onToggleLineHeight,
  hideImages = false,
  onToggleHideImages,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const t = labels[lang];

  return (
    <>
      {/* TRICOLOR TOP ACCENT RIBBON */}
      <div className="h-1.5 w-full tricolor-ribbon" />

      {/* 1. TOP TELECOM-STYLE HELPLINE & EMAIL TICKER STRIP */}
      <div className="bg-[#0B192C] text-white text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Telecom Contact Details */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-4 font-mono">
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-0.5 rounded-full border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse"></span>
              <span className="text-[#FF9933] font-sans font-bold">National Helpline:</span>
              <a href="tel:1800112026" className="text-white hover:text-[#FF9933] font-bold">
                1800-11-2026 (Toll-Free)
              </a>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-0.5 rounded-full border border-slate-700">
              <span className="text-[#FF9933] font-sans font-semibold">✉️ Support:</span>
              <a
                href="mailto:helpdesk-civic@gov.in"
                className="text-white hover:text-amber-200 font-bold font-mono underline underline-offset-2"
              >
                helpdesk-civic@gov.in
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-0.5 rounded-full border border-slate-700">
              <span className="text-red-400 font-sans font-semibold">🚨 Emergency SOS:</span>
              <a href="tel:112" className="text-white hover:text-red-300 font-bold">
                112
              </a>
            </div>
          </div>

          {/* Right Tools & Accessibility Strip */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            {/* Skip to Main Content */}
            <a
              href="#main-content"
              className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline hidden xl:inline text-[11px]"
            >
              Skip to main content
            </a>

            <span className="text-slate-700 hidden xl:inline">|</span>

            {/* Calendar Popover Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  setShowAccessibility(false);
                }}
                className={`p-1 rounded hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px] ${
                  showCalendar ? "bg-white/20 text-[#FF9933]" : "text-slate-200"
                }`}
                title="Calendar & Gazetted Holidays"
                aria-label="Government Calendar"
              >
                <span>📅</span>
                <span className="hidden sm:inline">Calendar</span>
              </button>

              {/* Calendar Popover */}
              {showCalendar && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-800 rounded-xl shadow-2xl border-t-4 border-[#FF9933] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-[#E65100] font-bold text-base">📅 2026</span>
                      <h3 className="font-bold text-slate-900 text-sm">Government Gazetted Holidays</h3>
                    </div>
                    <button
                      onClick={() => setShowCalendar(false)}
                      className="text-slate-400 hover:text-slate-700 text-sm p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-3 max-h-60 overflow-y-auto space-y-2 pr-1">
                    {holidays2026.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-orange-50/40 hover:bg-orange-100/60 border border-orange-100 transition-colors text-xs"
                      >
                        <span className="font-bold text-[#E65100] w-16">{h.date}</span>
                        <span className="font-medium text-slate-800 flex-1 text-left px-2">{h.name}</span>
                        <span className="text-slate-500 text-[11px]">{h.day}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>National Portal of India</span>
                    <span className="text-[#138808] font-bold">Official Calendar</span>
                  </div>
                </div>
              )}
            </div>

            <span className="text-slate-700">|</span>

            {/* Accessibility Popover Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAccessibility(!showAccessibility);
                  setShowCalendar(false);
                }}
                className={`p-1 rounded hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px] ${
                  showAccessibility ? "bg-white/20 text-[#FF9933]" : "text-slate-200"
                }`}
                title="Accessibility Tools"
                aria-label="Accessibility settings"
              >
                <span>♿</span>
                <span className="hidden sm:inline">Accessibility</span>
              </button>

              {/* Accessibility Menu Popover */}
              {showAccessibility && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white text-slate-800 rounded-xl shadow-2xl border-t-4 border-[#138808] p-4 z-50">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span>♿</span> Accessibility Options
                    </h3>
                    <button
                      onClick={() => setShowAccessibility(false)}
                      className="text-slate-400 hover:text-slate-700 text-sm p-1"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Contrast Adjustment */}
                  <div className="mt-3">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Contrast Adjustment
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={onToggleContrast}
                        className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          highContrast
                            ? "bg-black text-yellow-300 border-yellow-400 ring-2 ring-yellow-400"
                            : "bg-slate-900 text-white border-slate-800 hover:bg-black"
                        }`}
                      >
                        <span>🌙</span> High Contrast
                      </button>
                      <button
                        onClick={() => {
                          if (highContrast) onToggleContrast();
                        }}
                        className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          !highContrast
                            ? "bg-orange-50 text-slate-900 border-[#FF9933] ring-2 ring-[#FF9933]"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <span>☀️</span> Standard
                      </button>
                    </div>
                  </div>

                  {/* Text Size */}
                  <div className="mt-4">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Text Size ({fontSize}px)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => onFontSize(1)}
                        className="py-1.5 px-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all"
                      >
                        A+ (Larger)
                      </button>
                      <button
                        onClick={() => onFontSize(-1)}
                        className="py-1.5 px-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all"
                      >
                        A- (Smaller)
                      </button>
                      <button
                        onClick={() => onFontSize(16 - fontSize)}
                        className="py-1.5 px-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Other Adjustments */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    {onToggleTextSpacing && (
                      <button
                        onClick={onToggleTextSpacing}
                        className={`w-full py-1.5 px-3 rounded-lg border text-xs flex items-center justify-between font-medium transition-all ${
                          textSpacing
                            ? "bg-orange-50 border-[#FF9933] text-[#C2410C] font-semibold"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span>Text Spacing</span>
                        <span>{textSpacing ? "ON" : "OFF"}</span>
                      </button>
                    )}
                    {onToggleLineHeight && (
                      <button
                        onClick={onToggleLineHeight}
                        className={`w-full py-1.5 px-3 rounded-lg border text-xs flex items-center justify-between font-medium transition-all ${
                          lineHeight
                            ? "bg-green-50 border-[#138808] text-[#138808] font-semibold"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span>Line Height</span>
                        <span>{lineHeight ? "ON" : "OFF"}</span>
                      </button>
                    )}
                    {onToggleHideImages && (
                      <button
                        onClick={onToggleHideImages}
                        className={`w-full py-1.5 px-3 rounded-lg border text-xs flex items-center justify-between font-medium transition-all ${
                          hideImages
                            ? "bg-slate-100 border-slate-400 text-slate-800 font-semibold"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span>Hide Images</span>
                        <span>{hideImages ? "ON" : "OFF"}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <span className="text-slate-700">|</span>

            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              <span className="text-[#FF9933] text-[11px] font-mono font-bold">अ/A</span>
              <select
                value={lang}
                onChange={(e) => onLangChange(e.target.value as "en" | "hi" | "mr")}
                className="bg-slate-900 text-white text-xs border border-slate-700 rounded px-1.5 py-0.5 cursor-pointer hover:border-[#FF9933] focus:outline-none"
                aria-label="Language selection"
              >
                <option value="en" className="bg-slate-900 text-white">English</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी (Hindi)</option>
                <option value="mr" className="bg-slate-900 text-white">मराठी (Marathi)</option>
              </select>
            </div>

            <span className="text-slate-700">|</span>

            {/* Indian Flag Tricolor */}
            <div className="flex items-center gap-1.5" title="Republic of India">
              <div className="w-5 h-3.5 rounded-[2px] overflow-hidden flex flex-col shadow-sm border border-white/20">
                <div className="h-1/3 bg-[#FF9933]"></div>
                <div className="h-1/3 bg-white flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full border-[0.5px] border-[#000080]"></div>
                </div>
                <div className="h-1/3 bg-[#138808]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN TRICOLOR-THEMED NAVIGATION HEADER */}
      <header className="bg-white/98 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Official Branding with Tricolor & Lion Capital */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3.5 hover:opacity-95 transition-opacity text-left group"
          >
            {/* National Emblem Vector */}
            <div className="w-10 h-12 flex items-center justify-center text-[#0B192C] group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 120" className="w-full h-full fill-current">
                <path d="M50 15 C45 15 42 19 42 25 C42 31 44 35 42 38 C40 42 39 47 43 53 C47 59 50 61 50 64 C50 61 53 59 57 53 C61 47 60 42 58 38 C56 35 58 31 58 25 C58 19 55 15 50 15 Z" />
                <path d="M42 27 C37 24 31 27 30 34 C29 41 31 46 29 50 C28 55 31 61 37 64 C41 61 41 55 41 50 C41 45 41 36 42 27 Z" />
                <path d="M58 27 C63 24 69 27 70 34 C71 41 69 46 71 50 C72 55 69 61 63 64 C59 61 59 55 59 50 C59 45 59 36 58 27 Z" />
                <rect x="22" y="68" width="56" height="14" rx="2" />
                <circle cx="50" cy="75" r="5" fill="#fff" />
                <path d="M28 84 Q50 94 72 84 L74 90 Q50 100 26 90 Z" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B192C] font-sans">
                  india<span className="text-[#FF9933]">.gov.in</span>
                </span>
                <span className="bg-[#FF9933] text-white font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                  CIVIC SETU
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#138808] font-bold">
                National Civic Grievance & Swachh Services Portal
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            <button
              onClick={() => onNavigate("home")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === "home"
                  ? "bg-[#0B192C] text-white shadow-sm"
                  : "text-slate-700 hover:text-[#FF9933] hover:bg-orange-50/60"
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => onNavigate("report")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === "report"
                  ? "bg-[#FF9933] text-white shadow-sm"
                  : "text-slate-700 hover:text-[#E65100] hover:bg-orange-50/60"
              }`}
            >
              {t.report}
            </button>
            <button
              onClick={() => onNavigate("track")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === "track"
                  ? "bg-[#000080] text-white shadow-sm"
                  : "text-slate-700 hover:text-[#000080] hover:bg-blue-50/60"
              }`}
            >
              {t.track}
            </button>
            <button
              onClick={() => onNavigate("map")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === "map"
                  ? "bg-[#138808] text-white shadow-sm"
                  : "text-slate-700 hover:text-[#138808] hover:bg-green-50/60"
              }`}
            >
              {t.map}
            </button>
            <button
              onClick={() => onNavigate("community")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === "community"
                  ? "bg-[#0B192C] text-white shadow-sm"
                  : "text-slate-700 hover:text-[#FF9933] hover:bg-orange-50/60"
              }`}
            >
              {t.community}
            </button>
            <button
              onClick={() => onNavigate("gamification")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === "gamification"
                  ? "bg-[#FF9933] text-white shadow-sm"
                  : "text-slate-700 hover:text-[#FF9933] hover:bg-orange-50/60"
              }`}
            >
              ⭐ Swachh Badges
            </button>
            <button
              onClick={() => onNavigate("certificates")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPage === "certificates"
                  ? "bg-[#138808] text-white shadow-sm"
                  : "text-slate-700 hover:text-[#138808] hover:bg-green-50/60"
              }`}
            >
              Certificates
            </button>

            {isLoggedIn && !isAdmin && (
              <button
                onClick={() => onNavigate("dashboard")}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === "dashboard"
                    ? "bg-[#0B192C] text-white shadow-sm"
                    : "text-slate-700 hover:text-[#FF9933] hover:bg-slate-100"
                }`}
              >
                {t.dashboard}
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => onNavigate("admin-dashboard")}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === "admin-dashboard"
                    ? "bg-[#E65100] text-white shadow-sm"
                    : "text-[#E65100] hover:bg-orange-50"
                }`}
              >
                {t.admin}
              </button>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Notification Bell */}
            {isLoggedIn && (
              <button
                onClick={() => onNavigate("notifications")}
                className="relative p-2 rounded-lg text-slate-600 hover:bg-orange-50 transition-colors"
                aria-label={`Notifications (${notificationCount} unread)`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#E65100] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {notificationCount}
                  </span>
                )}
              </button>
            )}

            {/* Login / Profile button */}
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="hidden sm:inline-flex text-xs font-semibold text-slate-700 hover:text-[#E65100] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {t.logout}
              </button>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="hidden sm:inline-flex text-xs font-bold text-[#0B192C] border-2 border-[#0B192C] hover:border-[#FF9933] hover:text-[#FF9933] px-3.5 py-2 rounded-lg transition-all"
              >
                {t.login}
              </button>
            )}

            {/* Vibrant Kesari Saffron Action Button */}
            <button
              onClick={() => onNavigate("report")}
              className="bg-gradient-to-r from-[#FF9933] to-[#E65100] hover:from-[#E65100] hover:to-[#C2410C] text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>{t.reportBtn}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="xl:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-1 shadow-lg">
            <button
              onClick={() => { onNavigate("home"); setMobileOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-orange-50"
            >
              {t.home}
            </button>
            <button
              onClick={() => { onNavigate("report"); setMobileOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-bold text-[#E65100] bg-orange-50 hover:bg-orange-100"
            >
              {t.report}
            </button>
            <button
              onClick={() => { onNavigate("track"); setMobileOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-blue-50"
            >
              {t.track}
            </button>
            <button
              onClick={() => { onNavigate("map"); setMobileOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-green-50"
            >
              {t.map}
            </button>
            <button
              onClick={() => { onNavigate("community"); setMobileOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
            >
              {t.community}
            </button>
            <button
              onClick={() => { onNavigate("gamification"); setMobileOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-orange-50"
            >
              ⭐ Swachh Badges & Leaderboard
            </button>
            <button
              onClick={() => { onNavigate("certificates"); setMobileOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-green-50"
            >
              Certificates & Documents
            </button>
            <button
              onClick={() => { onNavigate("about"); setMobileOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-slate-800 hover:bg-slate-100"
            >
              {t.about}
            </button>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              {isLoggedIn ? (
                <button
                  onClick={() => { onLogout(); setMobileOpen(false); }}
                  className="flex-1 py-2 text-center text-sm font-semibold text-slate-700 bg-slate-100 rounded-md"
                >
                  {t.logout}
                </button>
              ) : (
                <button
                  onClick={() => { onNavigate("login"); setMobileOpen(false); }}
                  className="flex-1 py-2 text-center text-sm font-bold text-slate-900 border-2 border-[#0B192C] rounded-md"
                >
                  {t.login}
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
