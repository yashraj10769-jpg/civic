import { useState } from "react";
import { highAlertAreas } from "../data/mockData";

export default function MapPage() {
  const [selectedWard, setSelectedWard] = useState<string | null>("Ward 12");
  const [filters, setFilters] = useState({ type: "All", severity: "All", status: "All" });

  const wardData = highAlertAreas.find((a) => a.ward === selectedWard);

  return (
    <div className="page-enter max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-serif text-[#0F172A]">Civic Intelligence Map</h1>
        <p className="text-[#64748B] text-sm mt-1">Real-time civic issue heatmap for Jharkhand</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mb-5 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-[#374151]">Filter:</span>
        {[
          { key: "type", label: "Issue Type", opts: ["All", "Road Damage", "Garbage", "Streetlight", "Water Leakage", "Drainage", "Traffic", "Electricity"] },
          { key: "severity", label: "Severity", opts: ["All", "Critical", "High", "Medium", "Low"] },
          { key: "status", label: "Status", opts: ["All", "Submitted", "In Progress", "Resolved"] },
        ].map(({ key, label, opts }) => (
          <select
            key={key}
            value={filters[key as keyof typeof filters]}
            onChange={(e) => setFilters((f) => ({ ...f, [key]: e.target.value }))}
            className="text-sm border border-[#CBD5E1] rounded px-3 py-1.5 focus:border-[#1B3A6B] outline-none"
          >
            {opts.map((o) => <option key={o} value={o}>{o === "All" ? `${label}: All` : o}</option>)}
          </select>
        ))}
        <button className="ml-auto text-xs text-[#64748B] hover:text-[#1B3A6B] transition-colors">Reset Filters</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="bg-[#E8F5E9] h-[480px] relative overflow-hidden">
              <svg viewBox="0 0 700 480" className="absolute inset-0 w-full h-full" aria-hidden="true">
                {/* Background */}
                <rect width="700" height="480" fill="#F0FDF4" />

                {/* Roads grid */}
                {[80, 160, 240, 320, 400].map((y) => <rect key={y} x="0" y={y} width="700" height="7" fill="#CBD5E1" opacity="0.5" />)}
                {[100, 200, 300, 400, 500, 600].map((x) => <rect key={x} x={x} y="0" width="7" height="480" fill="#CBD5E1" opacity="0.5" />)}

                {/* Buildings */}
                {[
                  [20,20],[60,25],[20,95],[65,100],[130,20],[160,30],[130,95],[165,100],
                  [220,20],[260,25],[220,95],[265,100],[330,20],[360,30],[330,95],[365,100],
                  [440,20],[470,25],[440,95],[475,100],[540,20],[570,25],[540,95],[570,100],
                  [20,175],[60,180],[130,175],[160,185],[220,175],[265,180],[330,175],[365,180],
                  [440,175],[475,180],[540,175],[575,180],
                  [20,255],[60,260],[130,255],[160,265],[220,255],[265,260],[330,255],[365,260],
                  [20,335],[60,340],[130,335],[165,345],[220,335],[265,340],[330,335],[370,340],
                  [440,335],[475,340],[540,335],[575,345],
                ].map(([x, y], i) => (
                  <rect key={i} x={x} y={y} width="30" height="22" rx="2" fill="#D1FAE5" stroke="#A7F3D0" strokeWidth="0.5" />
                ))}

                {/* Heatmap zones */}
                <ellipse cx="155" cy="200" rx="70" ry="55" fill="#EF4444" opacity="0.12" />
                <ellipse cx="155" cy="200" rx="40" ry="32" fill="#EF4444" opacity="0.2" />
                <ellipse cx="380" cy="300" rx="65" ry="50" fill="#F59E0B" opacity="0.14" />
                <ellipse cx="380" cy="300" rx="35" ry="28" fill="#F59E0B" opacity="0.2" />
                <ellipse cx="520" cy="120" rx="50" ry="40" fill="#F59E0B" opacity="0.1" />
                <ellipse cx="270" cy="400" rx="45" ry="35" fill="#F59E0B" opacity="0.12" />
                <ellipse cx="600" cy="360" rx="45" ry="35" fill="#10B981" opacity="0.2" />

                {/* Issue markers — clickable wards */}
                {[
                  { cx: 155, cy: 200, fill: "#EF4444", label: "W12", count: 68, ward: "Ward 12" },
                  { cx: 380, cy: 300, fill: "#F59E0B", label: "W7", count: 52, ward: "Ward 7" },
                  { cx: 520, cy: 120, fill: "#F59E0B", label: "W18", count: 41, ward: "Ward 18" },
                  { cx: 270, cy: 400, fill: "#F59E0B", label: "W14", count: 38, ward: "Ward 14" },
                  { cx: 600, cy: 360, fill: "#10B981", label: "W3", count: 12, ward: "Ward 3" },
                  { cx: 80, cy: 360, fill: "#3B82F6", label: "W9", count: 29, ward: "Ward 9" },
                  { cx: 460, cy: 400, fill: "#3B82F6", label: "W21", count: 17, ward: "Ward 21" },
                ].map(({ cx, cy, fill, label, count, ward }) => (
                  <g key={ward} className="cursor-pointer" onClick={() => setSelectedWard(ward)}>
                    <circle cx={cx} cy={cy} r={selectedWard === ward ? 18 : 14} fill={fill} opacity="0.9" stroke={selectedWard === ward ? "white" : "transparent"} strokeWidth="2" />
                    <text x={cx} y={cy - 2} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">{label}</text>
                    <text x={cx} y={cy + 8} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">{count}</text>
                  </g>
                ))}

                {/* Government building */}
                <rect x="320" y="210" width="60" height="50" rx="3" fill="#1B3A6B" />
                <text x="350" y="242" textAnchor="middle" fill="white" fontSize="20">🏛</text>
                <text x="350" y="260" textAnchor="middle" fill="white" fontSize="7">Municipal HQ</text>

                {/* Legend */}
                <rect x="10" y="440" width="680" height="30" fill="white" opacity="0.8" rx="4" />
                {[
                  ["#EF4444", "Critical/High Alert"],
                  ["#F59E0B", "High Density"],
                  ["#3B82F6", "Active"],
                  ["#10B981", "Resolved"],
                ].map(([color, label], i) => (
                  <g key={label} transform={`translate(${20 + i * 165}, 450)`}>
                    <circle cx="6" cy="6" r="5" fill={color} />
                    <text x="15" y="10" fill="#374151" fontSize="9">{label}</text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Map controls */}
            <div className="p-3 border-t border-[#F1F5F9] flex items-center gap-3 text-xs text-[#64748B]">
              <button className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded hover:bg-[#F1F5F9] transition-colors">+ Zoom In</button>
              <button className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded hover:bg-[#F1F5F9] transition-colors">− Zoom Out</button>
              <button className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded hover:bg-[#F1F5F9] transition-colors">📍 My Location</button>
              <span className="ml-auto">Click a zone to view area intelligence</span>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Area Intelligence */}
          {selectedWard && wardData && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <h3 className="font-bold text-[#0F172A]">Area Intelligence</h3>
              </div>
              <div className="text-lg font-bold text-[#1B3A6B] mb-3">{selectedWard}</div>
              <div className="space-y-2 mb-4">
                {[
                  { label: "Total Reports", value: wardData.total.toString() },
                  { label: "Active Issues", value: wardData.active.toString(), color: "text-red-600" },
                  { label: "Resolved", value: (wardData.total - wardData.active).toString(), color: "text-emerald-600" },
                  { label: "Top Issue", value: wardData.topIssue },
                  { label: "Avg Resolution", value: `${wardData.avgResolution} Days` },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-sm text-[#64748B]">{label}</span>
                    <span className={`text-sm font-semibold ${color || "text-[#0F172A]"}`}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-[#64748B] mb-1">
                  <span>Resolution Rate</span>
                  <span>{Math.round(((wardData.total - wardData.active) / wardData.total) * 100)}%</span>
                </div>
                <div className="w-full bg-[#F1F5F9] rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${((wardData.total - wardData.active) / wardData.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* High Alert Areas */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
            <h3 className="font-bold text-[#0F172A] mb-3">High Alert Areas</h3>
            <div className="space-y-2">
              {highAlertAreas.map(({ ward, active, topIssue }) => (
                <button
                  key={ward}
                  onClick={() => setSelectedWard(ward)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    selectedWard === ward
                      ? "border-red-300 bg-red-50"
                      : "border-[#F1F5F9] bg-[#F8FAFC] hover:border-red-200 hover:bg-red-50"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      <span className="text-xs font-bold text-red-700">High Alert Zone</span>
                    </div>
                    <div className="text-sm font-semibold text-[#0F172A]">{ward}</div>
                    <div className="text-xs text-[#64748B]">{topIssue}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">{active}</div>
                    <div className="text-xs text-[#94A3B8]">active</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
