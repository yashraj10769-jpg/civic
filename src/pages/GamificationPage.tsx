import { citizens, levelThresholds } from "../data/mockData";

type Page = string;

interface GamificationPageProps {
  onNavigate: (page: Page) => void;
}

const pointsActivities = [
  { action: "Submit verified issue", points: "+20", icon: "📋" },
  { action: "Provide useful evidence", points: "+10", icon: "📷" },
  { action: "Issue successfully resolved", points: "+30", icon: "✅" },
  { action: "Confirm duplicate report", points: "+5", icon: "🔗" },
  { action: "Community verification", points: "+10", icon: "👥" },
];

const myActivity = [
  { action: "Issue CIV-2026-00356 Resolved", points: "+30", date: "Aug 2, 2026", icon: "✅" },
  { action: "Provided evidence for CIV-2026-00421", points: "+10", date: "Aug 1, 2026", icon: "📷" },
  { action: "Submitted CIV-2026-00421 (verified)", points: "+20", date: "Aug 1, 2026", icon: "📋" },
  { action: "Confirmed duplicate report", points: "+5", date: "Jul 28, 2026", icon: "🔗" },
  { action: "Issue CIV-2026-00312 Resolved", points: "+30", date: "Aug 1, 2026", icon: "✅" },
];

export default function GamificationPage({ onNavigate }: GamificationPageProps) {
  const citizenPoints = 780;
  const nextLevel = 1000;
  const currentLevel = levelThresholds.find((l) => citizenPoints >= l.min && citizenPoints <= l.max);
  const progress = Math.round((citizenPoints / nextLevel) * 100);

  return (
    <div className="page-enter max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-serif text-[#0F172A]">Your Civic Impact</h1>
        <p className="text-[#64748B] text-sm mt-1">Earn points for meaningful civic participation and make your community better.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Profile card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <div className="text-center mb-5">
              <div className="w-16 h-16 bg-[#1B3A6B] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">C</div>
              <div className="text-xs text-[#94A3B8] font-mono mb-1">Citizen #1042</div>
              <div className="text-sm text-[#64748B]">Ward 12, Ranchi</div>
            </div>

            {/* Level badge */}
            <div className="text-center mb-4">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-white font-bold text-sm"
                style={{ backgroundColor: currentLevel?.color || "#1B3A6B" }}
              >
                {currentLevel?.level}
              </div>
            </div>

            {/* Points progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-[#1B3A6B] text-xl">{citizenPoints}</span>
                <span className="text-[#64748B] text-sm self-end">/ {nextLevel} pts</span>
              </div>
              <div className="w-full bg-[#F1F5F9] rounded-full h-3 mb-1">
                <div
                  className="h-3 rounded-full transition-all"
                  style={{ width: `${progress}%`, backgroundColor: currentLevel?.color || "#1B3A6B" }}
                />
              </div>
              <div className="text-xs text-[#64748B] text-center">
                {nextLevel - citizenPoints} more points to <strong>Community Champion</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Reports Filed", value: "12" },
                { label: "Resolved", value: "9" },
                { label: "Points Earned", value: "780" },
                { label: "Certificates", value: "2" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#F8FAFC] rounded-lg border border-[#F1F5F9] p-2.5 text-center">
                  <div className="font-bold text-[#1B3A6B] text-lg">{value}</div>
                  <div className="text-xs text-[#64748B] leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Level progression */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
            <h3 className="font-bold text-[#0F172A] mb-3 text-sm">Level Progression</h3>
            <div className="space-y-2">
              {levelThresholds.map(({ level, min, max }) => (
                <div key={level} className={`flex items-center gap-3 p-2.5 rounded-lg ${citizenPoints >= min ? "bg-opacity-10" : "opacity-40"}`}
                  style={{ backgroundColor: citizenPoints >= min ? levelThresholds.find(l => l.level === level)?.color + "15" : undefined }}>
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: levelThresholds.find(l => l.level === level)?.color }}
                  />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#0F172A]">{level}</div>
                    <div className="text-xs text-[#94A3B8]">{min}–{max === Infinity ? "∞" : max} pts</div>
                  </div>
                  {citizenPoints >= min && citizenPoints <= max && (
                    <span className="text-xs text-emerald-600 font-bold">← You</span>
                  )}
                  {citizenPoints > max && (
                    <span className="text-emerald-500 text-sm">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="lg:col-span-2 space-y-5">
          {/* How to earn */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <h3 className="font-bold text-[#0F172A] mb-4">How to Earn Civic Points</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {pointsActivities.map(({ action, points, icon }) => (
                <div key={action} className="flex items-center gap-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg p-3">
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#374151]">{action}</div>
                  </div>
                  <div className="text-sm font-bold text-[#138808] flex-shrink-0">{points}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#94A3B8] mt-3">
              Points are only awarded for verified, meaningful civic participation. Repeated or invalid submissions do not earn points.
            </p>
          </div>

          {/* Activity log */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <h3 className="font-bold text-[#0F172A] mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {myActivity.map(({ action, points, date, icon }, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#F1F5F9]">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#374151] truncate">{action}</div>
                    <div className="text-xs text-[#94A3B8]">{date}</div>
                  </div>
                  <div className="text-sm font-bold text-emerald-600 flex-shrink-0 points-anim">{points}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <h3 className="font-bold text-[#0F172A] mb-4">Top Civic Contributors — Leaderboard</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-[#64748B] font-semibold border-b border-[#F1F5F9]">
                  <tr>
                    <th className="text-left py-2 pr-4">Rank</th>
                    <th className="text-left py-2 pr-4">Citizen ID</th>
                    <th className="text-left py-2 pr-4">Level</th>
                    <th className="text-right py-2 pr-4">Points</th>
                    <th className="text-right py-2 pr-4">Reports</th>
                    <th className="text-right py-2">Resolved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8FAFC]">
                  {citizens.sort((a, b) => b.points - a.points).map((c, i) => {
                    const lvl = levelThresholds.find((l) => c.points >= l.min && c.points <= l.max);
                    const isMe = c.id === "CIT-1042";
                    return (
                      <tr key={c.id} className={`${isMe ? "bg-[#EFF6FF]" : "hover:bg-[#FAFBFC]"} transition-colors`}>
                        <td className="py-3 pr-4">
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${i < 3 ? "bg-[#FF9933] text-white" : "bg-[#F1F5F9] text-[#64748B]"}`}>
                            {i + 1}
                          </div>
                        </td>
                        <td className="py-3 pr-4 font-mono text-xs text-[#374151]">
                          {c.displayName}
                          {isMe && <span className="ml-2 text-xs text-[#1B3A6B] font-semibold">(You)</span>}
                        </td>
                        <td className="py-3 pr-4">
                          <span className="text-xs font-semibold" style={{ color: lvl?.color }}>{lvl?.level}</span>
                        </td>
                        <td className="py-3 pr-4 text-right font-bold text-[#1B3A6B]">{c.points.toLocaleString()}</td>
                        <td className="py-3 pr-4 text-right text-[#64748B]">{c.reportsSubmitted}</td>
                        <td className="py-3 text-right text-emerald-600 font-medium">{c.reportsResolved}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => onNavigate("certificates")}
          className="bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold px-6 py-3 rounded transition-colors"
        >
          🏆 View My Certificates
        </button>
      </div>
    </div>
  );
}
