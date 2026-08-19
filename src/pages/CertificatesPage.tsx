import { useState } from "react";

const certificates = [
  {
    id: "CERT-2026-001842",
    title: "Civic Participation Certificate",
    achievement: "Active Civic Reporter",
    description: "Awarded for submitting 10+ verified civic reports that helped improve public infrastructure.",
    points: 780,
    contributions: 12,
    date: "August 2026",
    color: "#1B3A6B",
    icon: "🏛️",
  },
  {
    id: "CERT-2026-001103",
    title: "Community Champion Certificate",
    achievement: "Infrastructure Contributor",
    description: "Awarded for contributing to the resolution of 8+ civic issues in the local community.",
    points: 560,
    contributions: 8,
    date: "June 2026",
    color: "#FF9933",
    icon: "🌟",
  },
];

interface CertPreviewProps {
  cert: typeof certificates[0];
  onClose: () => void;
}

function CertPreview({ cert, onClose }: CertPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Certificate */}
        <div className="relative p-8 text-center" style={{ background: `linear-gradient(135deg, ${cert.color}08 0%, white 50%, ${cert.color}06 100%)` }}>
          <div className="absolute inset-4 border-2 rounded-xl pointer-events-none" style={{ borderColor: cert.color + "30" }} />
          <div className="absolute inset-6 border rounded-xl pointer-events-none" style={{ borderColor: cert.color + "15" }} />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="govt-seal" />
              <div className="text-left">
                <div className="text-xs text-[#64748B]">Government of Jharkhand</div>
                <div className="text-lg font-bold font-serif text-[#1B3A6B]">CivicSetu</div>
              </div>
            </div>

            <div className="text-3xl mb-2">{cert.icon}</div>
            <div className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: cert.color }}>
              Platform Recognition Certificate
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#0F172A] mb-1">{cert.title}</h2>
            <p className="text-sm text-[#64748B] italic mb-4">This is presented to</p>
            <div className="text-xl font-bold font-serif text-[#1B3A6B] mb-4">Citizen #1042</div>

            <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed mb-5">
              {cert.description}
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-5">
              <div className="text-center">
                <div className="text-xl font-bold font-serif" style={{ color: cert.color }}>{cert.contributions}</div>
                <div className="text-xs text-[#94A3B8]">Contributions</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold font-serif" style={{ color: cert.color }}>{cert.points}</div>
                <div className="text-xs text-[#94A3B8]">Civic Points</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold font-serif" style={{ color: cert.color }}>{cert.date}</div>
                <div className="text-xs text-[#94A3B8]">Awarded</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 mb-4">
              <div className="text-center">
                <div className="h-0.5 w-32 bg-[#CBD5E1] mb-1" />
                <div className="text-xs text-[#94A3B8]">Authorized Signatory</div>
                <div className="text-xs text-[#64748B]">Chief Civic Officer</div>
              </div>
              <div className="text-center">
                <div className="h-0.5 w-32 bg-[#CBD5E1] mb-1" />
                <div className="text-xs text-[#94A3B8]">Date of Issue</div>
                <div className="text-xs text-[#64748B]">{cert.date}</div>
              </div>
            </div>

            <div className="text-xs font-mono text-[#CBD5E1] border-t border-[#F1F5F9] pt-3">
              Certificate ID: {cert.id} · Verify at civicsetu.jharkhand.gov.in
            </div>
          </div>
        </div>

        <div className="p-4 flex gap-3 border-t border-[#F1F5F9]">
          <button className="flex-1 bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold py-2.5 rounded transition-colors text-sm">
            ↓ Download Certificate
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-[#CBD5E1] text-[#64748B] rounded hover:bg-[#F8FAFC] text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const [preview, setPreview] = useState<typeof certificates[0] | null>(null);

  return (
    <div className="page-enter max-w-4xl mx-auto px-4 py-8">
      {preview && <CertPreview cert={preview} onClose={() => setPreview(null)} />}

      <div className="mb-6">
        <h1 className="text-2xl font-bold font-serif text-[#0F172A]">My Certificates</h1>
        <p className="text-[#64748B] text-sm mt-1">Platform recognition certificates earned through civic participation.</p>
        <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-[#1B3A6B]">
          These are CivicSetu platform recognition certificates and not official government documents.
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white border-2 rounded-xl overflow-hidden hover:shadow-md transition-all"
            style={{ borderColor: cert.color + "30" }}
          >
            {/* Card header */}
            <div className="p-5 relative" style={{ background: `linear-gradient(135deg, ${cert.color}12 0%, ${cert.color}04 100%)` }}>
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: cert.color + "15", border: `2px solid ${cert.color}30` }}
                >
                  {cert.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: cert.color }}>
                    Recognition Certificate
                  </div>
                  <h3 className="font-bold text-[#0F172A] leading-tight">{cert.title}</h3>
                  <div className="text-xs text-[#64748B] mt-0.5">{cert.achievement}</div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm text-[#475569] mb-4 leading-relaxed">{cert.description}</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Contributions", value: cert.contributions.toString() },
                  { label: "Civic Points", value: cert.points.toString() },
                  { label: "Awarded", value: cert.date },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F8FAFC] rounded p-2 text-center border border-[#F1F5F9]">
                    <div className="text-sm font-bold" style={{ color: cert.color }}>{value}</div>
                    <div className="text-xs text-[#94A3B8]">{label}</div>
                  </div>
                ))}
              </div>

              <div className="text-xs font-mono text-[#CBD5E1] mb-3">{cert.id}</div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPreview(cert)}
                  className="flex-1 border-2 font-semibold py-2 rounded text-sm transition-colors hover:bg-opacity-10"
                  style={{ borderColor: cert.color, color: cert.color }}
                >
                  View Certificate
                </button>
                <button
                  className="flex-1 text-white font-semibold py-2 rounded text-sm transition-colors hover:opacity-90"
                  style={{ backgroundColor: cert.color }}
                >
                  ↓ Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming certificates */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
        <h3 className="font-bold text-[#0F172A] mb-4">Upcoming Achievements</h3>
        <div className="space-y-3">
          {[
            { title: "Community Champion Certificate", desc: "Reach Community Champion level (1,000 pts)", progress: 78, current: 780, target: 1000 },
            { title: "Clean Community Contributor", desc: "Report 5+ garbage/sanitation issues resolved", progress: 60, current: 3, target: 5 },
            { title: "Public Infrastructure Contributor", desc: "Report 10+ road/infrastructure issues verified", progress: 70, current: 7, target: 10 },
          ].map(({ title, desc, progress, current, target }) => (
            <div key={title} className="flex items-start gap-4 p-3 bg-[#F8FAFC] rounded-lg border border-[#F1F5F9]">
              <div className="w-10 h-10 bg-[#F1F5F9] rounded-full flex items-center justify-center text-lg flex-shrink-0">🔒</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#374151]">{title}</div>
                <div className="text-xs text-[#64748B] mb-2">{desc}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#E2E8F0] rounded-full h-1.5">
                    <div className="bg-[#1B3A6B] h-1.5 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs text-[#94A3B8] font-mono">{current}/{target}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
