import { useState } from "react";
import { complaints } from "../data/mockData";
import { StatusBadge, PriorityBadge } from "../components/StatusBadge";

export default function TrackComplaintPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof complaints[0] | null | "notfound">(null);

  const handleSearch = () => {
    const found = complaints.find((c) => c.id.toLowerCase() === query.trim().toLowerCase());
    setResult(found || "notfound");
  };

  return (
    <div className="page-enter max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-serif text-[#0F172A]">Track Your Complaint</h1>
        <p className="text-[#64748B] text-sm mt-1">Enter your Complaint ID to see real-time status and progress.</p>
      </div>

      {/* Search */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-6">
        <label className="block text-sm font-medium text-[#374151] mb-2">Complaint ID</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 border border-[#CBD5E1] rounded px-4 py-2.5 text-sm font-mono focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/20 outline-none transition-colors"
            placeholder="e.g. CIV-2026-00421"
          />
          <button
            onClick={handleSearch}
            className="bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold px-5 py-2.5 rounded transition-colors text-sm"
          >
            Track Complaint
          </button>
        </div>
        <div className="mt-2 text-xs text-[#94A3B8]">
          Try: CIV-2026-00421 · CIV-2026-00356 · CIV-2026-00344 · CIV-2026-00274
        </div>
      </div>

      {/* Result */}
      {result === "notfound" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-3xl mb-2">🔍</div>
          <p className="font-semibold text-red-700">Complaint not found</p>
          <p className="text-sm text-red-600 mt-1">Please check the ID and try again.</p>
        </div>
      )}

      {result && result !== "notfound" && (
        <div className="space-y-5">
          {/* Main card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-mono text-[#94A3B8] mb-1">{result.id}</div>
                <h2 className="text-xl font-bold font-serif text-[#0F172A]">{result.category}</h2>
                <p className="text-sm text-[#475569] mt-1">{result.description}</p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0 text-right">
                <StatusBadge status={result.status} />
                <PriorityBadge priority={result.priority} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { label: "Location", value: result.location },
                { label: "District / Ward", value: `${result.district}, ${result.ward}` },
                { label: "Date Reported", value: result.date },
                { label: "Assigned Department", value: result.department },
                { label: "Citizens Reporting", value: `${result.citizenCount} citizens` },
                ...(result.resolutionDate ? [{ label: "Resolution Date", value: result.resolutionDate }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#F8FAFC] rounded-lg p-3 border border-[#F1F5F9]">
                  <div className="text-xs text-[#94A3B8] mb-0.5">{label}</div>
                  <div className="text-sm font-medium text-[#0F172A]">{value}</div>
                </div>
              ))}
            </div>

            {/* AI info */}
            <div className="bg-[#F0F7FF] border border-[#BFDBFE] rounded-lg p-3 flex gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-[#1B3A6B] text-lg">{result.aiConfidence}%</div>
                <div className="text-xs text-[#64748B]">AI Confidence</div>
              </div>
              <div className="w-px bg-[#BFDBFE]" />
              <div className="text-center">
                <div className="font-bold text-orange-600 text-lg">{result.citizenCount}</div>
                <div className="text-xs text-[#64748B]">Citizen Reports</div>
              </div>
              <div className="w-px bg-[#BFDBFE]" />
              <div className="flex-1">
                <div className="text-xs text-[#64748B] mb-0.5">Assigned To</div>
                <div className="font-semibold text-[#1B3A6B] text-sm">{result.department}</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <h3 className="font-bold text-[#0F172A] mb-5">Resolution Timeline</h3>
            <div className="space-y-0">
              {result.timeline.map((item, i) => (
                <div key={item.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.done
                          ? "bg-[#1B3A6B] text-white"
                          : "bg-[#F1F5F9] border-2 border-[#CBD5E1] text-[#94A3B8]"
                      }`}
                    >
                      {item.done ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                      )}
                    </div>
                    {i < result.timeline.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[24px] my-1 ${item.done ? "bg-[#1B3A6B]" : "bg-[#E2E8F0]"}`} />
                    )}
                  </div>
                  <div className="pb-5">
                    <div className={`text-sm font-semibold ${item.done ? "text-[#0F172A]" : "text-[#94A3B8]"}`}>
                      {item.label}
                    </div>
                    {item.date && (
                      <div className="text-xs text-[#64748B] mt-0.5 font-mono">{item.date}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
