import { useState } from "react";

interface QuickToolsProps {
  onNavigate: (page: string) => void;
  onOpenAccessibility?: () => void;
}

export default function QuickTools({ onNavigate }: QuickToolsProps) {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const helplines = [
    { title: "National Civic Helpline (Toll-Free)", number: "1800-11-2026", icon: "📞" },
    { title: "National Emergency Number", number: "112", icon: "🚨" },
    { title: "Swachh Bharat Control Room", number: "1969", icon: "🧹" },
    { title: "Municipal Corporation Support", number: "1913", icon: "🏙️" },
    { title: "Central Public Grievance (CPGRAMS)", number: "1800-11-4000", icon: "🏛️" },
    { title: "Women Helpline (All India)", number: "1091", icon: "👩" },
    { title: "Cyber Crime Helpline", number: "1930", icon: "💻" },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "National Swachh Grievance Portal — India.gov.in",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <aside
      aria-label="Quick Access Utilities"
      className="fixed right-0 top-1/3 z-40 flex flex-col items-end gap-1.5 pointer-events-auto"
    >
      {/* 1. Citizen AI Assistant / Chat */}
      <div className="relative group">
        <button
          onClick={() => setActivePanel(activePanel === "chat" ? null : "chat")}
          className="flex items-center justify-center w-11 h-11 bg-white/95 hover:bg-white text-emerald-900 rounded-l-xl shadow-lg border-y border-l border-emerald-200 hover:text-emerald-700 transition-all hover:w-12"
          title="Swachh AI Helpdesk"
          aria-label="Swachh AI Helpdesk"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>

        {activePanel === "chat" && (
          <div className="absolute right-14 top-0 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-emerald-200 p-4 text-slate-800 animate-in fade-in slide-in-from-right-4 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                  AI
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Seva Setu AI Assistant</h4>
                  <p className="text-[10px] text-emerald-600 font-medium">● 24x7 Bilingual Voice & Text Support</p>
                </div>
              </div>
              <button onClick={() => setActivePanel(null)} className="text-slate-400 hover:text-slate-700 text-sm">
                ✕
              </button>
            </div>

            <div className="py-3 text-xs space-y-2">
              <div className="p-2.5 bg-emerald-50/70 rounded-lg text-slate-800 leading-relaxed border border-emerald-100">
                Namaste! 🙏 I can help you report civic issues (potholes, garbage, streetlights, water), track complaint status, or find ward statistics.
              </div>
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    onNavigate("report");
                    setActivePanel(null);
                  }}
                  className="w-full text-left p-2 rounded bg-emerald-100 hover:bg-emerald-200/80 text-emerald-900 font-bold text-xs transition-colors flex items-center justify-between"
                >
                  <span>📝 File a Civic Grievance</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate("track");
                    setActivePanel(null);
                  }}
                  className="w-full text-left p-2 rounded bg-slate-50 hover:bg-emerald-50 text-slate-700 font-medium text-xs transition-colors flex items-center justify-between"
                >
                  <span>🔍 Track Status by Complaint ID</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate("map");
                    setActivePanel(null);
                  }}
                  className="w-full text-left p-2 rounded bg-slate-50 hover:bg-emerald-50 text-slate-700 font-medium text-xs transition-colors flex items-center justify-between"
                >
                  <span>🗺️ View Ward GIS Heatmap</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Helplines & Telecom Contacts */}
      <div className="relative">
        <button
          onClick={() => setActivePanel(activePanel === "helplines" ? null : "helplines")}
          className="flex items-center justify-center w-11 h-11 bg-white/95 hover:bg-white text-emerald-900 rounded-l-xl shadow-lg border-y border-l border-emerald-200 hover:text-emerald-700 transition-all hover:w-12"
          title="Government Helplines"
          aria-label="Government Helplines"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>

        {activePanel === "helplines" && (
          <div className="absolute right-14 top-0 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-emerald-200 p-4 text-slate-800 animate-in fade-in slide-in-from-right-4 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span>📞</span> Official Telecom & Helplines
              </h4>
              <button onClick={() => setActivePanel(null)} className="text-slate-400 hover:text-slate-700 text-sm">
                ✕
              </button>
            </div>

            <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
              {helplines.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-emerald-50/40 hover:bg-emerald-100/60 rounded-lg border border-emerald-100 flex items-center justify-between transition-colors text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.icon}</span>
                    <span className="font-medium text-slate-800">{item.title}</span>
                  </div>
                  <a
                    href={`tel:${item.number}`}
                    className="font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded border border-emerald-300 hover:bg-emerald-200 transition-colors font-mono"
                  >
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Share */}
      <div className="relative">
        <button
          onClick={handleShare}
          className="flex items-center justify-center w-11 h-11 bg-white/95 hover:bg-white text-emerald-900 rounded-l-xl shadow-lg border-y border-l border-emerald-200 hover:text-emerald-700 transition-all hover:w-12"
          title="Share Portal"
          aria-label="Share Portal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>

        {copied && (
          <div className="absolute right-14 top-2 bg-emerald-950 text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-lg whitespace-nowrap">
            Link copied to clipboard! ✓
          </div>
        )}
      </div>

      {/* 4. Feedback */}
      <div className="relative">
        <button
          onClick={() => onNavigate("community")}
          className="flex items-center justify-center w-11 h-11 bg-white/95 hover:bg-white text-emerald-900 rounded-l-xl shadow-lg border-y border-l border-emerald-200 hover:text-emerald-700 transition-all hover:w-12"
          title="Citizen Feedback & Polls"
          aria-label="Citizen Feedback"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
