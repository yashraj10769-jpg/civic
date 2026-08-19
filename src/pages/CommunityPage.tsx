import { complaints } from "../data/mockData";
import { StatusBadge, PriorityBadge } from "../components/StatusBadge";

type Page = string;

interface CommunityPageProps {
  onNavigate: (page: Page) => void;
}

const recentlyResolved = complaints.filter((c) => c.status === "Resolved");
const trending = [...complaints].sort((a, b) => b.citizenCount - a.citizenCount);

export default function CommunityPage({ onNavigate }: CommunityPageProps) {
  return (
    <div className="page-enter max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-serif text-[#0F172A]">Community Hub</h1>
        <p className="text-[#64748B] text-sm mt-1">Public civic activity across Jharkhand — transparent &amp; accountable.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Trending */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl">
            <div className="p-5 border-b border-[#F1F5F9]">
              <h2 className="font-bold text-[#0F172A]">Trending Civic Issues</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Most reported issues this week</p>
            </div>
            <div className="divide-y divide-[#F8FAFC]">
              {trending.map((c, i) => (
                <div key={c.id} className="p-5 hover:bg-[#FAFBFC] transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-[#1B3A6B] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                        <div>
                          <span className="text-xs font-mono text-[#94A3B8] mr-2">{c.id}</span>
                          <span className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded">{c.category}</span>
                        </div>
                        <StatusBadge status={c.status} />
                      </div>
                      <p className="text-sm font-medium text-[#0F172A] mb-1.5">{c.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-[#94A3B8] mb-2">
                        <span>📍 {c.ward}, {c.district}</span>
                        <span>🏛 {c.department}</span>
                        <span>📅 {c.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-[#64748B]">
                          <span className="text-base">👥</span>
                          <span><strong>{c.citizenCount}</strong> citizens reported</span>
                        </div>
                        <PriorityBadge priority={c.priority} />
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 ml-10">
                    <div className="flex justify-between text-xs text-[#94A3B8] mb-1">
                      <span>Resolution progress</span>
                      <span>{Math.round((c.timeline.filter((t) => t.done).length / c.timeline.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-[#F1F5F9] rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-[#1B3A6B] transition-all"
                        style={{ width: `${(c.timeline.filter((t) => t.done).length / c.timeline.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Resolved */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl">
            <div className="p-5 border-b border-[#F1F5F9] flex items-center gap-2">
              <span className="text-emerald-500">✅</span>
              <h2 className="font-bold text-[#0F172A]">Recently Resolved</h2>
            </div>
            <div className="divide-y divide-[#F8FAFC]">
              {recentlyResolved.map((c) => (
                <div key={c.id} className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">✓</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-xs font-mono text-[#94A3B8]">{c.id}</span>
                        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-medium">Resolved</span>
                      </div>
                      <p className="text-sm font-medium text-[#0F172A] mb-1">{c.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-[#94A3B8]">
                        <span>📍 {c.ward}</span>
                        <span>🏛 {c.department}</span>
                        {c.resolutionDate && <span>✅ {c.resolutionDate}</span>}
                        <span>👥 {c.citizenCount} citizens</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* High priority */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <h3 className="font-bold text-[#0F172A] mb-3 flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              High Priority Areas
            </h3>
            <div className="space-y-2">
              {complaints.filter((c) => c.priority === "Critical" || c.priority === "High").slice(0, 4).map((c) => (
                <div key={c.id} className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <div className="text-xs font-bold text-red-700 mb-0.5">{c.ward}</div>
                  <div className="text-xs text-[#374151] line-clamp-2">{c.category}: {c.description.slice(0, 60)}...</div>
                  <div className="text-xs text-red-600 mt-1 font-medium">👥 {c.citizenCount} reports · {c.priority}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Community contributors */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <h3 className="font-bold text-[#0F172A] mb-3">Top Civic Contributors</h3>
            <div className="space-y-3">
              {[
                { rank: 1, id: "CIT-5123", points: 3200, reports: 54, level: "Civic Leader", levelColor: "#138808" },
                { rank: 2, id: "CIT-0354", points: 2100, reports: 38, level: "Civic Leader", levelColor: "#138808" },
                { rank: 3, id: "CIT-4502", points: 1680, reports: 29, level: "Community Champion", levelColor: "#FF9933" },
                { rank: 4, id: "CIT-2891", points: 1240, reports: 21, level: "Community Champion", levelColor: "#FF9933" },
                { rank: 5, id: "CIT-3201", points: 960, reports: 16, level: "Civic Contributor", levelColor: "#1B3A6B" },
              ].map(({ rank, id, points, reports, level, levelColor }) => (
                <div key={id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${rank <= 3 ? "bg-[#FF9933] text-white" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                    {rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#0F172A] font-mono">{id}</div>
                    <div className="text-xs font-medium" style={{ color: levelColor }}>{level}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-[#1B3A6B]">{points.toLocaleString()}</div>
                    <div className="text-xs text-[#94A3B8]">{reports} reports</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report CTA */}
          <div className="bg-[#1B3A6B] rounded-xl p-5 text-white text-center">
            <div className="text-2xl mb-2">🏙️</div>
            <div className="font-bold mb-1">See a civic problem?</div>
            <div className="text-xs opacity-80 mb-3">Report it and help your community.</div>
            <button
              onClick={() => onNavigate("report")}
              className="w-full bg-[#FF9933] hover:bg-[#e8881e] text-white font-semibold py-2.5 rounded text-sm transition-colors"
            >
              Report Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
