import { useState } from "react";
import { complaints, departments, issuesByCategory, resolutionTrend, highAlertAreas } from "../data/mockData";
import { StatusBadge, PriorityBadge } from "../components/StatusBadge";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "complaints" | "departments" | "ai" | "map">("overview");

  const stats = [
    { label: "Total Complaints", value: "24,860", trend: "+8%", icon: "📋", color: "#1B3A6B" },
    { label: "Pending Verification", value: "342", trend: "+12", icon: "🔍", color: "#F59E0B" },
    { label: "Active Issues", value: "4,120", trend: "-3%", icon: "⚡", color: "#EF4444" },
    { label: "Resolved Issues", value: "18,430", trend: "+156", icon: "✅", color: "#138808" },
    { label: "High Priority", value: "89", trend: "+8", icon: "⚠", color: "#EF4444" },
    { label: "Avg. Resolution", value: "3.8d", trend: "-0.2d", icon: "⏱", color: "#8B5CF6" },
  ];

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#0F172A]">Administration Dashboard</h1>
          <p className="text-sm text-[#64748B] mt-0.5">CivicSetu · Government of Jharkhand</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs text-[#64748B]">Live · Last updated 2 min ago</span>
        </div>
      </div>

      {/* Urgent Alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <span className="text-xl">🚨</span>
        <div>
          <div className="font-semibold text-red-700 text-sm mb-1">Urgent Action Required</div>
          <div className="flex flex-wrap gap-4 text-xs text-red-600">
            <span>⚠ 8 High Priority Issues unresolved &gt;48h</span>
            <span>⏱ 12 complaints exceeding SLA deadline</span>
            <span>🔗 24 unresolved duplicate clusters</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {stats.map(({ label, value, trend, icon, color }) => (
          <div key={label} className="bg-white border border-[#E2E8F0] rounded-xl p-4">
            <div className="text-xl mb-2">{icon}</div>
            <div className="text-2xl font-bold font-serif" style={{ color }}>{value}</div>
            <div className="text-xs text-[#64748B] mt-0.5">{label}</div>
            <div className={`text-xs font-medium mt-1 ${trend.startsWith("+") && label !== "High Priority" && label !== "Pending Verification" ? "text-emerald-600" : trend.startsWith("-") && (label === "Active Issues" || label === "Avg. Resolution") ? "text-emerald-600" : "text-orange-600"}`}>
              {trend}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {([
          ["overview", "Overview"],
          ["complaints", "New Complaints"],
          ["departments", "Departments"],
          ["ai", "AI Moderation"],
          ["map", "Alert Map"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeTab === key ? "bg-[#1B3A6B] text-white" : "bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#1B3A6B]/40"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Category chart */}
          <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-5">
            <h3 className="font-bold text-[#0F172A] mb-4">Issues by Category</h3>
            <div className="space-y-3">
              {issuesByCategory.map(({ category, count, color }) => {
                const max = issuesByCategory[0].count;
                return (
                  <div key={category} className="flex items-center gap-3">
                    <div className="text-sm text-[#374151] w-36 flex-shrink-0">{category}</div>
                    <div className="flex-1 bg-[#F1F5F9] rounded-full h-2.5">
                      <div className="h-2.5 rounded-full transition-all" style={{ width: `${(count / max) * 100}%`, backgroundColor: color }} />
                    </div>
                    <div className="text-sm font-semibold text-[#374151] w-16 text-right font-mono">{count.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resolution trend */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <h3 className="font-bold text-[#0F172A] mb-4">Resolution Trend</h3>
            <div className="space-y-3">
              {resolutionTrend.map(({ month, reported, resolved }) => (
                <div key={month}>
                  <div className="flex justify-between text-xs text-[#64748B] mb-1">
                    <span>{month}</span>
                    <span className="text-emerald-600">{Math.round((resolved / reported) * 100)}% resolved</span>
                  </div>
                  <div className="relative h-4 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-[#1B3A6B]/30 rounded-full" style={{ width: "100%" }} />
                    <div className="absolute inset-y-0 left-0 bg-[#138808] rounded-full transition-all" style={{ width: `${(resolved / reported) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High alert areas */}
          <div className="lg:col-span-3 bg-white border border-[#E2E8F0] rounded-xl p-5">
            <h3 className="font-bold text-[#0F172A] mb-4">High Alert Areas</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {highAlertAreas.map(({ ward, active, total, topIssue, avgResolution }) => (
                <div key={ward} className="bg-red-50 border border-red-100 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-red-700">High Alert</span>
                  </div>
                  <div className="font-bold text-[#0F172A]">{ward}</div>
                  <div className="text-2xl font-bold text-red-600">{active}</div>
                  <div className="text-xs text-[#64748B]">active complaints</div>
                  <div className="text-xs text-[#64748B] mt-1">Top: {topIssue}</div>
                  <div className="text-xs text-[#64748B]">Avg: {avgResolution} days</div>
                  <button className="mt-2 text-xs text-[#1B3A6B] font-medium hover:underline">View on Map →</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Complaints Tab */}
      {activeTab === "complaints" && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#F1F5F9] flex items-center justify-between">
            <h3 className="font-bold text-[#0F172A]">New Complaints Queue</h3>
            <span className="text-xs text-[#64748B] bg-[#F1F5F9] px-2 py-1 rounded">{complaints.length} complaints</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8FAFC] text-xs text-[#64748B] font-semibold">
                <tr>
                  {["Complaint ID", "Category", "Location", "Citizens", "AI Conf.", "Dup. Prob.", "Priority", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8FAFC]">
                {complaints.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAFBFC] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#94A3B8]">{c.id}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#374151] whitespace-nowrap">{c.category}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B] max-w-32 truncate">{c.location}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-center">{c.citizenCount}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold ${c.aiConfidence >= 90 ? "text-emerald-600" : "text-amber-600"}`}>{c.aiConfidence}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold ${c.duplicateProbability >= 70 ? "text-red-600" : "text-[#64748B]"}`}>{c.duplicateProbability}%</span>
                    </td>
                    <td className="px-4 py-3"><PriorityBadge priority={c.priority} /></td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded hover:bg-emerald-100 transition-colors">Approve</button>
                        <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors">Assign</button>
                        <button className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100 transition-colors">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Departments Tab */}
      {activeTab === "departments" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept) => (
            <div key={dept.name} className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="font-bold text-[#0F172A] mb-3">{dept.name}</div>
              <div className="space-y-2 mb-4">
                {[
                  { label: "Active Issues", value: dept.active, color: "text-orange-600" },
                  { label: "Resolved", value: dept.resolved, color: "text-emerald-600" },
                  { label: "Pending", value: dept.pending, color: "text-[#64748B]" },
                  { label: "SLA Violations", value: dept.slaViolations, color: dept.slaViolations > 4 ? "text-red-600" : "text-[#64748B]" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-[#64748B]">{label}</span>
                    <span className={`font-semibold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-[#64748B] mb-3">Avg Resolution: <strong>{dept.avgResolutionDays} days</strong></div>
              <div className="w-full bg-[#F1F5F9] rounded-full h-1.5 mb-3">
                <div
                  className="h-1.5 rounded-full bg-[#138808]"
                  style={{ width: `${(dept.resolved / (dept.resolved + dept.active + dept.pending)) * 100}%` }}
                />
              </div>
              <button className="w-full text-xs bg-[#EFF6FF] text-[#1B3A6B] px-3 py-2 rounded hover:bg-[#DBEAFE] transition-colors font-medium">
                Assign Complaint
              </button>
            </div>
          ))}
        </div>
      )}

      {/* AI Moderation Tab */}
      {activeTab === "ai" && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-4 mb-2">
            {[
              { label: "New Reports", value: 42, icon: "📋", color: "#1B3A6B" },
              { label: "Potential Duplicates", value: 24, icon: "🔗", color: "#F59E0B" },
              { label: "Suspicious Reports", value: 7, icon: "⚠", color: "#EF4444" },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-4">
                <span className="text-3xl">{icon}</span>
                <div>
                  <div className="text-2xl font-bold font-serif" style={{ color }}>{value}</div>
                  <div className="text-xs text-[#64748B]">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {complaints.slice(0, 4).map((c) => (
            <div key={c.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono text-[#94A3B8]">{c.id}</span>
                    <PriorityBadge priority={c.priority} />
                    {c.duplicateProbability >= 70 && (
                      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-200 font-medium">
                        High Duplicate Risk
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#374151]">{c.description}</p>
                  <div className="text-xs text-[#94A3B8] mt-1">📍 {c.location} · 👥 {c.citizenCount} citizens</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {[
                  { label: "AI Category", value: c.category, sub: `${c.aiConfidence}% confidence` },
                  { label: "Duplicate Probability", value: `${c.duplicateProbability}%`, sub: c.duplicateProbability >= 70 ? "Requires merge review" : "Likely unique" },
                  { label: "Recommended Dept", value: c.department, sub: "AI suggested" },
                  { label: "Evidence Quality", value: c.citizenCount > 15 ? "Strong" : c.citizenCount > 8 ? "Moderate" : "Weak", sub: `${c.citizenCount} reports` },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="bg-[#F8FAFC] rounded-lg p-2 border border-[#F1F5F9]">
                    <div className="text-xs text-[#94A3B8]">{label}</div>
                    <div className="text-sm font-semibold text-[#0F172A]">{value}</div>
                    <div className="text-xs text-[#64748B]">{sub}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="text-xs bg-emerald-50 text-emerald-700 px-3 py-2 rounded border border-emerald-200 hover:bg-emerald-100 transition-colors font-medium">✓ Approve</button>
                <button className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded border border-blue-200 hover:bg-blue-100 transition-colors font-medium">🔗 Merge</button>
                <button className="text-xs bg-red-50 text-red-700 px-3 py-2 rounded border border-red-200 hover:bg-red-100 transition-colors font-medium">✕ Reject</button>
                <button className="text-xs bg-orange-50 text-orange-700 px-3 py-2 rounded border border-orange-200 hover:bg-orange-100 transition-colors font-medium">↑ Escalate</button>
                <button className="text-xs bg-[#EFF6FF] text-[#1B3A6B] px-3 py-2 rounded border border-[#BFDBFE] hover:bg-[#DBEAFE] transition-colors font-medium">🏛 Assign Dept</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alert Map Tab */}
      {activeTab === "map" && (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-xl p-4">
            <h3 className="font-bold text-[#0F172A] mb-4">Civic Intelligence Map — Ranchi</h3>
            <div className="bg-[#E8F5E9] rounded-xl h-96 flex items-center justify-center relative overflow-hidden border border-[#D1FAE5]">
              <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" aria-hidden="true">
                {/* Grid roads */}
                {[80, 160, 240, 320].map((y) => <rect key={y} x="0" y={y} width="600" height="6" fill="#94A3B8" opacity="0.4" />)}
                {[100, 200, 300, 400, 500].map((x) => <rect key={x} x={x} y="0" width="6" height="400" fill="#94A3B8" opacity="0.4" />)}
                {/* Buildings */}
                {[[20,20],[50,30],[130,20],[150,40],[20,100],[60,110],[130,95],[160,105],[220,20],[260,30],[220,100],[270,95],[350,20],[380,30],[350,100],[410,95],[20,180],[60,185],[130,175],[160,190],[220,180],[270,185],[350,180],[390,175]].map(([x,y],i)=>(
                  <rect key={i} x={x} y={y} width="26" height="20" rx="2" fill="#D1FAE5" stroke="#6EE7B7" strokeWidth="0.5" />
                ))}
                {/* Heatmap zones */}
                <circle cx="150" cy="155" r="60" fill="#EF4444" opacity="0.15" />
                <circle cx="150" cy="155" r="35" fill="#EF4444" opacity="0.25" />
                <circle cx="380" cy="250" r="50" fill="#F59E0B" opacity="0.15" />
                <circle cx="380" cy="250" r="28" fill="#F59E0B" opacity="0.2" />
                <circle cx="260" cy="360" r="40" fill="#F59E0B" opacity="0.12" />
                <circle cx="500" cy="180" r="35" fill="#10B981" opacity="0.2" />
                {/* Issue markers */}
                <circle cx="150" cy="155" r="10" fill="#EF4444" opacity="0.95" /><text x="150" y="159" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">68</text>
                <circle cx="380" cy="250" r="9" fill="#F59E0B" opacity="0.95" /><text x="380" y="254" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">52</text>
                <circle cx="260" cy="360" r="8" fill="#F59E0B" opacity="0.95" /><text x="260" y="364" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">41</text>
                <circle cx="500" cy="180" r="8" fill="#10B981" opacity="0.95" /><text x="500" y="184" textAnchor="middle" fill="white" fontSize="8">✓</text>
                <circle cx="90" cy="300" r="7" fill="#3B82F6" opacity="0.95" /><text x="90" y="304" textAnchor="middle" fill="white" fontSize="8">12</text>
                {/* Legend */}
                {[["#EF4444","Critical"],["#F59E0B","High Density"],["#10B981","Resolved"],["#3B82F6","Submitted"]].map(([color,label],i)=>(
                  <g key={label} transform={`translate(${20+i*130},380)`}>
                    <circle cx="6" cy="6" r="5" fill={color} />
                    <text x="14" y="10" fill="#374151" fontSize="9">{label}</text>
                  </g>
                ))}
              </svg>
            </div>
            {/* Filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Issue Type", "Severity", "Status", "District", "Department", "Time Period"].map((f) => (
                <select key={f} className="text-xs border border-[#CBD5E1] rounded px-2 py-1.5 text-[#374151] focus:border-[#1B3A6B] outline-none">
                  <option>{f}</option>
                </select>
              ))}
            </div>
          </div>

          {/* Intelligence panel */}
          <div className="space-y-4">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
              <h4 className="font-bold text-[#0F172A] mb-3">Area Intelligence</h4>
              <div className="text-sm font-semibold text-[#1B3A6B] mb-3">Ward 12 — Selected</div>
              <div className="space-y-2">
                {[
                  { label: "Total Reports", value: "124" },
                  { label: "Active Issues", value: "68", color: "text-red-600" },
                  { label: "Resolved", value: "56", color: "text-emerald-600" },
                  { label: "High Priority", value: "8", color: "text-red-600" },
                  { label: "Avg Resolution", value: "3.2 Days" },
                  { label: "Top Issue", value: "Garbage" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-[#64748B]">{label}</span>
                    <span className={`font-semibold ${color || "text-[#0F172A]"}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
              <h4 className="font-bold text-[#0F172A] mb-3">High Alert Zones</h4>
              <div className="space-y-2">
                {highAlertAreas.map(({ ward, active }) => (
                  <div key={ward} className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-100 cursor-pointer hover:bg-red-100 transition-colors">
                    <div>
                      <div className="text-xs font-bold text-red-700">{ward}</div>
                      <div className="text-xs text-red-600">{active} active</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="text-xs bg-[#1B3A6B] text-white px-2 py-1 rounded">Assign</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
