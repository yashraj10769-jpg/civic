import { useState } from "react";
import Emblem from "../components/Emblem";
import IdealGallery from "../components/IdealGallery";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  lang: "en" | "hi" | "mr";
}

// In-app only feature tags (No external Aadhaar/Passport)
const inAppFeatureTags = [
  { label: "📝 Report Civic Issue", page: "report" },
  { label: "🔍 Track Complaint", page: "track" },
  { label: "🗺️ Ward GIS Map", page: "map" },
  { label: "👥 Community Feed", page: "community" },
  { label: "⭐ Swachh Badges & Leaderboard", page: "gamification" },
  { label: "📜 Citizen Certificates", page: "certificates" },
  { label: "🚰 Water & Drainage Issue", page: "report" },
  { label: "⚡ Streetlight & Electricity", page: "report" },
  { label: "🏛️ Admin Department Portal", page: "admin-login" },
];

const categoryOptions = [
  { value: "all", label: "All Civic Categories" },
  { value: "roads", label: "Roads & Potholes" },
  { value: "water", label: "Water Supply & Leakages" },
  { value: "sanitation", label: "Swachh Bharat & Sanitation" },
  { value: "electricity", label: "Streetlights & Electricity" },
  { value: "certificates", label: "Citizen Certificates & Records" },
  { value: "community", label: "Ward Community Discussions" },
];

const serviceCategories = [
  {
    id: "sanitation",
    icon: "🧹",
    title: "Swachh Bharat & Waste Management",
    titleHi: "स्वच्छ भारत एवं कचरा प्रबंधन",
    desc: "Garbage clearing, bio-waste collection, open dumping complaints, public urinal hygiene",
    count: "4,820 resolved",
    action: "report",
    color: "from-emerald-500/15 to-green-500/10 border-emerald-300",
  },
  {
    id: "roads",
    icon: "🛣️",
    title: "Roads & Potholes Fast-Track",
    titleHi: "सड़क एवं गड्ढा मरम्मत",
    desc: "Pothole repairs, road resurfacing, broken manhole covers, speed breaker requests",
    count: "4,120 resolved",
    action: "report",
    color: "from-amber-500/15 to-emerald-500/10 border-emerald-300",
  },
  {
    id: "water",
    icon: "🚰",
    title: "Water Supply & Drainage",
    titleHi: "जल आपूर्ति एवं जल निकासी",
    desc: "Water pipeline bursts, contaminated supply, drain blockage, water tanker deployment",
    count: "3,140 resolved",
    action: "report",
    color: "from-cyan-500/15 to-emerald-500/10 border-emerald-300",
  },
  {
    id: "electricity",
    icon: "⚡",
    title: "Solar Streetlights & Electricity",
    titleHi: "सौर स्ट्रीटलाइट एवं विद्युत",
    desc: "Non-functional streetlights, sparking transformers, hanging wires, power cuts",
    count: "2,290 resolved",
    action: "report",
    color: "from-yellow-500/15 to-emerald-500/10 border-emerald-300",
  },
  {
    id: "certificates",
    icon: "📜",
    title: "E-Certificates & Permits",
    titleHi: "ई-प्रमाण पत्र एवं अनुमति",
    desc: "Download verified Birth/Death, Domicile, Caste certificates, and Municipal trade licenses",
    count: "18+ e-Services",
    action: "certificates",
    color: "from-teal-500/15 to-emerald-500/10 border-emerald-300",
  },
  {
    id: "gamification",
    icon: "⭐",
    title: "Swachh Citizen Leaderboard",
    titleHi: "स्वच्छ नागरिक अंक एवं पुरस्कार",
    desc: "Earn civic reward points, unlock Swachh Champion badges, and participate in ward drives",
    count: "12,650+ Citizens",
    action: "gamification",
    color: "from-emerald-500/20 to-lime-500/10 border-emerald-300",
  },
];

const trendingIssues = [
  {
    id: "CIV-2026-00421",
    title: "Deep crater-sized pothole outside Govt. Higher Secondary School",
    ward: "Ward 12 (Harmu)",
    citizens: 84,
    status: "In Progress",
    dept: "PWD Roads",
    sla: "Target: Today 6 PM",
    category: "Road Damage",
  },
  {
    id: "CIV-2026-00389",
    title: "Main water supply pipe rupture flooding Ashok Nagar Main Road",
    ward: "Ward 05 (Ashok Nagar)",
    citizens: 62,
    status: "Assigned",
    dept: "Jal Sansthan",
    sla: "Target: 4 hrs",
    category: "Water Supply",
  },
  {
    id: "CIV-2026-00312",
    title: "15 consecutive LED solar streetlights non-operational along Bypass",
    ward: "Ward 19 (Bariatu)",
    citizens: 49,
    status: "Under Verification",
    dept: "Municipal Lighting",
    sla: "Target: 24 hrs",
    category: "Electricity",
  },
  {
    id: "CIV-2026-00251",
    title: "Hazardous electric wire hanging low near residential market complex",
    ward: "Ward 21 (Kokar)",
    citizens: 112,
    status: "Resolved",
    dept: "Electricity Board",
    sla: "Resolved in 3.1 hrs",
    category: "Electricity",
  },
];

const statusStyles: Record<string, string> = {
  "In Progress": "bg-amber-100 text-amber-800 border-amber-300",
  "Assigned": "bg-purple-100 text-purple-800 border-purple-300",
  "Under Verification": "bg-blue-100 text-blue-800 border-blue-300",
  "Resolved": "bg-emerald-100 text-emerald-800 border-emerald-300",
};

export default function LandingPage({ onNavigate, lang }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const isHi = lang === "hi";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      onNavigate("report");
      return;
    }
    const q = searchQuery.toLowerCase();
    if (q.includes("track") || q.includes("status") || q.includes("civ-")) {
      onNavigate("track");
    } else if (q.includes("map") || q.includes("gis") || q.includes("ward")) {
      onNavigate("map");
    } else if (q.includes("cert") || q.includes("licence") || q.includes("doc")) {
      onNavigate("certificates");
    } else if (q.includes("badge") || q.includes("reward") || q.includes("point") || q.includes("lead")) {
      onNavigate("gamification");
    } else if (q.includes("feed") || q.includes("vote") || q.includes("communit")) {
      onNavigate("community");
    } else if (q.includes("admin")) {
      onNavigate("admin-login");
    } else {
      onNavigate("report");
    }
  };

  return (
    <div className="page-enter bg-[#F0FDF4]/30">
      {/* 1. SWACHH BHARAT (GANDHI THEMED) GREEN HERO SECTION */}
      <section
        className="relative bg-cover bg-center min-h-[600px] sm:min-h-[660px] flex items-center justify-center text-white px-4 py-16 sm:py-24"
        style={{
          backgroundImage: `url('/images/swachh_bharat_bg.jpg')`,
        }}
      >
        {/* Dark Emerald & Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-emerald-950/60 to-emerald-950/90 backdrop-blur-[0.5px]" />

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl w-full mx-auto text-center flex flex-col items-center">
          {/* Swachh Bharat & Gandhi Spectacles Motif */}
          <div className="mb-3 flex items-center justify-center gap-3">
            {/* Gandhi Spectacles Vector Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-emerald-400/40 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-lg hover:scale-105 transition-transform">
              <svg viewBox="0 0 120 40" className="w-16 h-7 text-white fill-none stroke-current stroke-2">
                {/* Left Spectacle */}
                <circle cx="30" cy="20" r="14" stroke="#fff" strokeWidth="3" />
                {/* Right Spectacle */}
                <circle cx="90" cy="20" r="14" stroke="#fff" strokeWidth="3" />
                {/* Bridge */}
                <path d="M44 18 Q60 12 76 18" stroke="#fff" strokeWidth="3" />
                {/* Left temple */}
                <line x1="16" y1="18" x2="4" y2="10" stroke="#fff" strokeWidth="2.5" />
                {/* Right temple */}
                <line x1="104" y1="18" x2="116" y2="10" stroke="#fff" strokeWidth="2.5" />
                {/* Text inside glasses */}
                <text x="30" y="24" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">स्वच्छ</text>
                <text x="90" y="24" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">भारत</text>
              </svg>
              <div className="text-left border-l border-white/20 pl-3">
                <div className="text-[10px] font-bold tracking-wider uppercase text-emerald-300">
                  Swachh Bharat Abhiyan
                </div>
                <div className="text-xs font-semibold text-white/90">
                  Clean India • Green India
                </div>
              </div>
            </div>

            {/* Ashoka Emblem */}
            <div className="hidden sm:block">
              <Emblem className="w-12 h-14 text-white" />
            </div>
          </div>

          {/* National Swachh Portal Title */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-1">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-sans text-white drop-shadow-lg">
              india<span className="text-emerald-400">.gov.in</span>
            </h1>
            <span className="bg-emerald-500 text-slate-950 font-extrabold text-xs sm:text-sm px-2.5 py-1 rounded shadow uppercase tracking-wider">
              SWACHH CIVIC
            </span>
          </div>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-normal text-emerald-100 font-sans mb-1 drop-shadow">
            {isHi ? "स्वच्छ एवं पारदर्शी राष्ट्रीय नागरिक शिकायत पोर्टल" : "National Swachh Grievance & Civic Services Portal"}
          </h2>

          {/* Tagline */}
          <p className="text-base sm:text-lg font-serif italic text-emerald-200/90 max-w-2xl mb-8 drop-shadow">
            {isHi
              ? "गांधीजी का सपना — स्वच्छ, हरित और जवाबदेह भारत"
              : "Mahatma Gandhi's Vision — Empowering Clean, Green & Accountable Communities"}
          </p>

          {/* Unified Search Bar Container */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl p-1.5 sm:p-2 hero-search-shadow flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 text-slate-800"
          >
            {/* Search Input */}
            <div className="flex-1 flex items-center px-4 py-2 sm:py-3 gap-3">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHi ? "सर्च करें: समस्या दर्ज करें, शिकायत ट्रैक करें, वार्ड नक्शा, ई-प्रमाण पत्र..." : "Search in-app features: report grievance, track status, ward map, certificates..."}
                className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
            </div>

            {/* Category Dropdown Separator */}
            <div className="border-t sm:border-t-0 sm:border-l border-emerald-100 px-3 py-1.5 sm:py-2 flex items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto bg-transparent text-xs sm:text-sm font-bold text-emerald-950 cursor-pointer focus:outline-none pr-6"
                aria-label="Filter Civic Category"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-slate-900 bg-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Vibrant Green Search Button */}
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base px-8 py-3 rounded-lg sm:rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{isHi ? "खोजें" : "Search"}</span>
            </button>
          </form>

          {/* IN-APP ONLY FEATURE TAGS (NO AADHAAR / EXTERNAL) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-white">
            <span className="font-bold text-emerald-200 mr-1 flex items-center gap-1">
              <span>App Features :</span>
            </span>
            {inAppFeatureTags.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(item.page)}
                className="bg-white/15 hover:bg-emerald-600/80 backdrop-blur-md text-white border border-emerald-300/30 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 shadow-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SWACHH BHARAT LIVE BULLETIN MARQUEE */}
      <section className="bg-emerald-950 border-y border-emerald-800/80 py-3 px-4 sm:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-600 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-md tracking-wider flex-shrink-0 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>Swachh Bulletin</span>
          </div>

          <div className="flex-1 overflow-hidden text-xs text-emerald-100 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-amber-300 font-bold">🌱 Swachh Ward Ranking:</span>
              <span>Ward 12 (Harmu) leads with 98.4% timely grievance resolution and zero open garbage points.</span>
            </div>
            <span className="text-emerald-700 hidden lg:inline">|</span>
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-emerald-300 font-bold">📞 24x7 Helpline:</span>
              <span>Call 1800-11-2026 for urgent waterlogging or open drain clearance.</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate("community")}
            className="text-xs font-bold text-emerald-300 hover:text-white underline underline-offset-4 flex-shrink-0"
          >
            View Ward Rankings →
          </button>
        </div>
      </section>

      {/* 3. FOUR FAST-TRACK IN-APP ACTION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: File Grievance */}
          <div
            onClick={() => onNavigate("report")}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl border-t-4 border-emerald-600 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📝
              </span>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded uppercase">
                AI Auto-Tag
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">
              File a Civic Grievance
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Report potholes, garbage, streetlights, or drainage with camera photo, GPS & audio notes.
            </p>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              File Report Now →
            </span>
          </div>

          {/* Card 2: Track Grievance */}
          <div
            onClick={() => onNavigate("track")}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl border-t-4 border-teal-600 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🔍
              </span>
              <span className="text-[10px] font-extrabold bg-teal-100 text-teal-900 px-2 py-0.5 rounded uppercase">
                Live SLA Target
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-teal-700 transition-colors">
              Track Complaint Status
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Check assigned municipal officer, repair crew progress, and before/after verification.
            </p>
            <span className="text-xs font-bold text-teal-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              Track by Complaint ID →
            </span>
          </div>

          {/* Card 3: Live Ward GIS Map */}
          <div
            onClick={() => onNavigate("map")}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl border-t-4 border-green-600 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🗺️
              </span>
              <span className="text-[10px] font-extrabold bg-green-100 text-green-900 px-2 py-0.5 rounded uppercase">
                GIS Heatmap
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-green-700 transition-colors">
              Interactive Ward Map
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Explore city-wide resolution heatmaps, active maintenance zones, and ward statistics.
            </p>
            <span className="text-xs font-bold text-green-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              Open Live Map →
            </span>
          </div>

          {/* Card 4: Swachh Rewards & Badges */}
          <div
            onClick={() => onNavigate("gamification")}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl border-t-4 border-amber-500 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                ⭐
              </span>
              <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded uppercase">
                Swachh Points
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-amber-700 transition-colors">
              Citizen Rewards & Badges
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Earn civic credits for verified reports and climb the Swachhta Champion Leaderboard.
            </p>
            <span className="text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              View Leaderboard →
            </span>
          </div>
        </div>
      </section>

      {/* 4. IDEAL TRANSFORMATION & RESOLUTION GALLERY (Before & After with Side Buttons) */}
      <IdealGallery onNavigate={onNavigate} />

      {/* 5. SWACHH SERVICES BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-emerald-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1.5">
              <span>🏛️ Swachh Municipal Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-sans">
              Civic Grievance Categories & Services
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              File issues across dedicated municipal departments with AI automated department routing.
            </p>
          </div>
          <button
            onClick={() => onNavigate("community")}
            className="mt-4 md:mt-0 text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Topics</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.action)}
              className={`p-6 rounded-2xl bg-gradient-to-br ${cat.color} bg-white border shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 bg-white rounded-full text-emerald-900 shadow-sm border border-emerald-200">
                  {cat.count}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-emerald-700 transition-colors">
                {isHi ? cat.titleHi : cat.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{cat.desc}</p>
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 pt-3 border-t border-emerald-200/60">
                <span>Access Service Portal</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SWACHH BHARAT DIGITAL SHOWCASE BANNER */}
      <section className="bg-gradient-to-r from-emerald-950 via-[#063B2F] to-emerald-950 text-white py-14 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-emerald-800/60 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30">
              <span>🌱 Clean India • Digital Empowerment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Swachh Bharat & Smart Municipal Transformation
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Every civic complaint filed triggers an automated AI pipeline: duplicate detection, geo-tagging, priority escalation, and instant assignment to field engineers with strict time-bound SLAs.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/10 border border-white/15 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-300 font-mono">98.4%</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">SLA Compliance</div>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-emerald-300 font-mono">&lt; 3.8 d</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">Avg. Resolution</div>
              </div>
              <div className="bg-white/10 border border-white/15 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold text-teal-300 font-mono">100%</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">Public Transparency</div>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img
              src="/images/digital_india_banner.jpg"
              alt="Digital Swachh Governance"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 7. LIVE CIVIC RESOLUTION FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Live Public Grievance Feed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
              Trending Ward Issues & Resolutions
            </h2>
          </div>
          <button
            onClick={() => onNavigate("community")}
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/70 hover:bg-emerald-200 border border-emerald-300 px-4 py-2 rounded-xl transition-colors"
          >
            Explore All 24,860+ Grievances →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {issue.id}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base mt-1.5 leading-snug">
                    {issue.title}
                  </h4>
                </div>
                <span
                  className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${
                    statusStyles[issue.status] || "bg-slate-100 text-slate-700 border-slate-300"
                  }`}
                >
                  {issue.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-3 mt-3 border-t border-slate-100">
                <span className="flex items-center gap-1 font-medium">
                  <span>📍</span> {issue.ward}
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <span>👥</span> {issue.citizens} citizens endorsed
                </span>
                <span className="flex items-center gap-1 text-slate-500 ml-auto font-mono text-[11px]">
                  <span>⏱️</span> {issue.sla}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. COMMUNITY CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-emerald-600">
          <div className="max-w-xl space-y-3 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Join the Swachh Bharat Mission in Your Ward
            </h3>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Take a photo of any road damage, garbage pile, or water leakage. Together, we can make every neighborhood clean, safe, and beautiful.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto">
            <button
              onClick={() => onNavigate("report")}
              className="bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 text-center"
            >
              Report a Civic Issue
            </button>
            <button
              onClick={() => onNavigate("login")}
              className="border-2 border-white text-white hover:bg-white/15 font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all text-center"
            >
              Citizen Login / Register
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
