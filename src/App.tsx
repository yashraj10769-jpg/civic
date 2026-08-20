import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QuickTools from "./components/QuickTools";
import CookieBanner from "./components/CookieBanner";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import TrackComplaintPage from "./pages/TrackComplaintPage";
import CitizenDashboard from "./pages/CitizenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MapPage from "./pages/MapPage";
import CommunityPage from "./pages/CommunityPage";
import GamificationPage from "./pages/GamificationPage";
import CertificatesPage from "./pages/CertificatesPage";
import NotificationsPage from "./pages/NotificationsPage";
import AboutPage from "./pages/AboutPage";
import { notifications } from "./data/mockData";

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

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLang] = useState<"en" | "hi" | "mr">("en");
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [textSpacing, setTextSpacing] = useState(false);
  const [lineHeight, setLineHeight] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [lastComplaintId, setLastComplaintId] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (admin: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("home");
  };

  const handleFontSize = (delta: number) => {
    setFontSize((f) => Math.min(22, Math.max(14, f + delta)));
  };

  const showFooter = !["login", "admin-login"].includes(page);
  const addMobilePadding = isLoggedIn && !isAdmin && !["login", "admin-login"].includes(page);

  return (
    <div
      id="main-content"
      style={{ fontSize: `${fontSize}px` }}
      className={`min-h-screen flex flex-col ${
        highContrast ? "high-contrast-mode" : ""
      } ${textSpacing ? "extra-text-spacing" : ""} ${
        lineHeight ? "extra-line-height" : ""
      } ${hideImages ? "hide-images" : ""}`}
    >
      {/* India.gov.in Header & Accessibility Bar */}
      <Header
        currentPage={page}
        onNavigate={navigate}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        notificationCount={unreadCount}
        lang={lang}
        onLangChange={setLang}
        onLogout={handleLogout}
        fontSize={fontSize}
        onFontSize={handleFontSize}
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast((h) => !h)}
        textSpacing={textSpacing}
        onToggleTextSpacing={() => setTextSpacing((t) => !t)}
        lineHeight={lineHeight}
        onToggleLineHeight={() => setLineHeight((l) => !l)}
        hideImages={hideImages}
        onToggleHideImages={() => setHideImages((m) => !m)}
      />

      {/* Floating Quick Action Side Utilities */}
      <QuickTools onNavigate={navigate} />

      {/* Main Pages */}
      <main className={`flex-1 ${addMobilePadding ? "pb-20 xl:pb-0" : ""}`}>
        {page === "home" && <LandingPage onNavigate={navigate} lang={lang} />}
        {page === "login" && <LoginPage onNavigate={navigate} onLogin={handleLogin} />}
        {page === "admin-login" && <AdminLoginPage onNavigate={navigate} onLogin={handleLogin} />}
        {page === "report" && (
          <ReportIssuePage
            onNavigate={navigate}
            lang={lang}
            onSuccess={(id) => setLastComplaintId(id)}
          />
        )}
        {page === "track" && <TrackComplaintPage />}
        {page === "map" && <MapPage />}
        {page === "community" && <CommunityPage onNavigate={navigate} />}
        {page === "about" && <AboutPage />}
        {page === "dashboard" && isLoggedIn && !isAdmin && <CitizenDashboard onNavigate={navigate} />}
        {page === "dashboard" && !isLoggedIn && (
          <div className="page-enter max-w-md mx-auto px-4 py-16 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-xl font-bold font-serif text-[#0F172A] mb-2">Login Required</h2>
            <p className="text-[#64748B] mb-5">Please login to access your citizen dashboard.</p>
            <button
              onClick={() => navigate("login")}
              className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              Login Now
            </button>
          </div>
        )}
        {page === "admin-dashboard" && isAdmin && <AdminDashboard />}
        {page === "admin-dashboard" && !isAdmin && (
          <div className="page-enter max-w-md mx-auto px-4 py-16 text-center">
            <div className="text-4xl mb-4">🚫</div>
            <h2 className="text-xl font-bold font-serif text-[#0F172A] mb-2">Access Denied</h2>
            <p className="text-[#64748B] mb-5">Admin access is restricted to authorized government personnel.</p>
            <button
              onClick={() => navigate("admin-login")}
              className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              Admin Login
            </button>
          </div>
        )}
        {page === "notifications" && <NotificationsPage />}
        {page === "gamification" && <GamificationPage onNavigate={navigate} />}
        {page === "certificates" && <CertificatesPage />}
      </main>

      {/* Official Footer */}
      {showFooter && <Footer onNavigate={navigate} />}

      {/* Cookie Consent Banner (Matches India.gov.in) */}
      <CookieBanner />
    </div>
  );
}
