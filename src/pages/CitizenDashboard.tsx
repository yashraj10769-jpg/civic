import { useState } from "react";
import { complaints, levelThresholds } from "../data/mockData";
import { StatusBadge, PriorityBadge } from "../components/StatusBadge";

type Page = string;

interface CitizenDashboardProps {
  onNavigate: (page: Page) => void;
}

const myComplaints = complaints.slice(0, 5);

export default function CitizenDashboard({ onNavigate }: CitizenDashboardProps) {
  const [tab, setTab] = useState<"all" | "active" | "resolved">("all");
  const citizenPoints = 780;
  const nextLevel = 1000;
  const level = levelThresholds.find((l) => citizenPoints >= l.min && citizenPoints <= l.max);
  const progress = Math.round((citizenPoints / nextLevel) * 100);

  const filtered = myComplaints.filter((c) => {
    if (tab === "active") return c.status !== "Resolved" && c.status !== "Rejected";
    if (tab === "resolved") return c.status === "Resolved";
    return true;
  });

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1B3A6B] text-white rounded-full flex items-center justify-center text-xl font-bold font-serif flex-shrink-0">
              C
            </div>
            <div>
              <div className="text-xs text-[#64748B] mb-0.5">Citizen #1042 · Ward 12, Ranchi</div>
              <h1 className="text-xl font-bold font-serif text-[#0F172A]">Welcome back, Citizen</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: level?.color || "#1B3A6B" }}>
                  {level?.level}
                </span>
                <span className="text-xs text-[#64748B]">{citizenPoints} Civic Points</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate("report")}
            className="bg-[#FF9933] hover:bg-[#e8881e] text-white font-bold px-6 py-3 rounded text-sm transition-colors self-start sm:self-auto"
          >
            + Report an Issue
          </button>
        </div>

        {/* Points progress */}
        <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
          <div className="flex justify-between text-xs text-[#64748B] mb-1.5">
            <span>Civic Points: <strong className="text-[#1B3A6B]">{citizenPoints}</strong></span>
            <span>Next Level at {nextLevel} points</span>
          </div>
          <div className="w-full bg-[#F1F5F9] rounded-full h-2">
            <div className="h-2 rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: level?.color || "#1B3A6B" }} />
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: "My Reports", value: "12", icon: "📋", color: "#1B3A6B" },
          { label: "Resolved", value: "9", icon: "✅", color: "#138808" },
          { label: "Under Review", value: "2", icon: "🔍", color: "#F59E0B" },
          { label: "Civic Points", value: "780", icon: "⭐", color: "#FF9933" },
          { label: "Certificates", value: "2", icon: "🏆", color: "#8B5CF6" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-center hover:shadow-sm transition-shadow">
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-2xl font-bold font-serif" style={{ color }}>{value}</div>
            <div className="text-xs text-[#64748B] mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Complaints */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl">
        <div className="p-5 border-b border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="font-bold text-[#0F172A] text-lg">Recent Complaints</h2>
          <div className="flex bg-[#F1F5F9] rounded-lg p-1 gap-1">
            {([["all", "All"], ["active", "Active"], ["resolved", "Resolved"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${tab === key ? "bg-white text-[#1B3A6B] shadow-sm" : "text-[#64748B] hover:text-[#374151]"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#F1F5F9]">
          {filtered.map((c) => (
            <div key={c.id} className="p-5 hover:bg-[#FAFBFC] transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono text-[#94A3B8]">{c.id}</span>
                    <span className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded">{c.category}</span>
                    <PriorityBadge priority={c.priority} />
                  </div>
                  <p className="text-sm text-[#374151] mb-1.5 line-clamp-2">{c.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-[#94A3B8]">
                    <span>📍 {c.location}</span>
                    <span>📅 {c.date}</span>
                    <span>🏛 {c.department}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <StatusBadge status={c.status} />
                </div>
              </div>

              {/* Mini timeline */}
              <div className="mt-3 flex items-center gap-1 overflow-x-auto pb-1">
                {c.timeline.map((t, i) => (
                  <div key={t.label} className="flex items-center gap-1 flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full ${t.done ? "bg-[#1B3A6B]" : "bg-[#E2E8F0]"}`} />
                    <span className={`text-xs ${t.done ? "text-[#374151]" : "text-[#CBD5E1]"}`}>{t.label}</span>
                    {i < c.timeline.length - 1 && (
                      <div className={`w-6 h-px ${t.done && c.timeline[i + 1]?.done ? "bg-[#1B3A6B]" : "bg-[#E2E8F0]"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-10 text-center text-[#94A3B8] text-sm">No complaints in this category.</div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {[
          { label: "My Civic Points", desc: "View points, achievements & leaderboard", icon: "⭐", page: "gamification" },
          { label: "My Certificates", desc: "Download your civic participation certificates", icon: "🏆", page: "certificates" },
          { label: "Community Issues", desc: "See what others are reporting in your area", icon: "🏘", page: "community" },
        ].map(({ label, desc, icon, page }) => (
          <button
            key={label}
            onClick={() => onNavigate(page)}
            className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-left hover:shadow-md hover:border-[#1B3A6B]/30 transition-all"
          >
            <span className="text-2xl block mb-2">{icon}</span>
            <div className="font-semibold text-[#0F172A] text-sm">{label}</div>
            <div className="text-xs text-[#64748B] mt-0.5">{desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
