type Page = string;

interface LandingPageProps {
  onNavigate: (page: Page) => void;
  lang: "en" | "hi" | "mr";
}

const stats = [
  { value: "24,860", label: "Issues Reported", sublabel: "Total complaints filed" },
  { value: "18,430", label: "Issues Resolved", sublabel: "Successfully resolved" },
  { value: "4,120", label: "Active Issues", sublabel: "Currently in progress" },
  { value: "12,650", label: "Active Citizens", sublabel: "Participating citizens" },
  { value: "3.8 Days", label: "Avg. Resolution", sublabel: "Average time to resolve" },
];

const howItWorks = [
  {
    step: "01",
    title: "Report",
    desc: "Citizen reports a civic issue using text, image, location or voice in their preferred language.",
    icon: "📋",
    color: "#1B3A6B",
  },
  {
    step: "02",
    title: "Verify",
    desc: "AI checks the complaint and identifies duplicate or similar reports from other citizens.",
    icon: "🤖",
    color: "#2A5298",
  },
  {
    step: "03",
    title: "Resolve",
    desc: "The responsible government department receives and processes the issue with full accountability.",
    icon: "🏛️",
    color: "#FF9933",
  },
  {
    step: "04",
    title: "Track",
    desc: "Citizen tracks the complaint status in real time until complete resolution is confirmed.",
    icon: "📍",
    color: "#138808",
  },
];

const recentIssues = [
  { id: "CIV-2026-00274", title: "Traffic signal malfunction at Harmu Crossing", ward: "Ward 14", citizens: 42, status: "In Progress", category: "Traffic" },
  { id: "CIV-2026-00344", title: "Water pipe burst near Shantinagar Colony", ward: "Ward 5", citizens: 31, status: "Under Verification", category: "Water Leakage" },
  { id: "CIV-2026-00421", title: "Large pothole near Govt. School entrance", ward: "Ward 12", citizens: 23, status: "In Progress", category: "Road Damage" },
  { id: "CIV-2026-00251", title: "Power outage in Kokar Colony Block B", ward: "Ward 21", citizens: 67, status: "Resolved", category: "Electricity" },
];

const statusColors: Record<string, string> = {
  "In Progress": "text-orange-600 bg-orange-50",
  "Under Verification": "text-yellow-600 bg-yellow-50",
  "Resolved": "text-emerald-600 bg-emerald-50",
  "Assigned": "text-purple-600 bg-purple-50",
  "Submitted": "text-blue-600 bg-blue-50",
};

export default function LandingPage({ onNavigate, lang }: LandingPageProps) {
  const isHi = lang === "hi";

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#EFF6FF] text-[#1B3A6B] text-xs font-semibold px-3 py-1.5 rounded mb-6 border border-[#BFDBFE]">
                <span className="w-1.5 h-1.5 bg-[#138808] rounded-full animate-pulse" />
                Government of Jharkhand — Official Civic Platform
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-serif text-[#0F172A] leading-tight mb-5">
                {isHi ? "आपकी आवाज़। आपका समुदाय।" : "Your Voice."}
                <span className="text-[#1B3A6B] block">{isHi ? "आपकी सरकार।" : "Your Community. Your Government."}</span>
              </h1>
              <p className="text-lg text-[#475569] leading-relaxed mb-8">
                {isHi
                  ? "अपने क्षेत्र की नागरिक समस्याओं की रिपोर्ट करें और अधिकारियों को सुरक्षित, स्वच्छ और बेहतर समुदाय बनाने में मदद करें।"
                  : "Report civic issues in your area and help authorities build safer, cleaner and better communities."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={() => onNavigate("report")}
                  className="bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold px-6 py-3 rounded transition-colors text-base"
                >
                  {isHi ? "नागरिक समस्या दर्ज करें" : "Report a Civic Issue"}
                </button>
                <button
                  onClick={() => onNavigate("track")}
                  className="bg-white hover:bg-[#F8FAFC] text-[#1B3A6B] font-semibold px-6 py-3 rounded border-2 border-[#1B3A6B] transition-colors text-base"
                >
                  {isHi ? "शिकायत ट्रैक करें" : "Track My Complaint"}
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <span className="w-2 h-2 bg-[#FF9933] rounded-full" />
                <span>Transparent</span>
                <span className="w-2 h-2 bg-[#1B3A6B] rounded-full ml-2" />
                <span>Accountable</span>
                <span className="w-2 h-2 bg-[#138808] rounded-full ml-2" />
                <span>Community Powered</span>
              </div>
            </div>

            {/* Civic Illustration */}
            <div className="hidden lg:block">
              <div className="bg-[#F4F6FA] rounded-xl border border-[#E2E8F0] p-6 relative overflow-hidden">
                {/* Map-like illustration */}
                <svg viewBox="0 0 480 320" className="w-full h-64" aria-hidden="true">
                  {/* Roads */}
                  <rect x="0" y="140" width="480" height="14" fill="#CBD5E1" opacity="0.6" />
                  <rect x="220" y="0" width="14" height="320" fill="#CBD5E1" opacity="0.6" />
                  <rect x="0" y="240" width="480" height="10" fill="#CBD5E1" opacity="0.4" />
                  <rect x="120" y="0" width="10" height="320" fill="#CBD5E1" opacity="0.4" />
                  <rect x="340" y="0" width="10" height="320" fill="#CBD5E1" opacity="0.4" />

                  {/* Houses/buildings */}
                  {[
                    [30, 40], [80, 30], [50, 80], [160, 40], [170, 80],
                    [270, 30], [310, 50], [280, 90], [360, 40], [400, 60],
                    [30, 170], [70, 180], [30, 260], [90, 270],
                    [270, 170], [320, 180], [360, 160], [400, 180],
                    [270, 260], [320, 270], [400, 260],
                  ].map(([x, y], i) => (
                    <rect key={i} x={x} y={y} width="28" height="22" rx="2" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
                  ))}

                  {/* Issue markers */}
                  <g>
                    {/* Red - critical */}
                    <circle cx="147" cy="135" r="10" fill="#EF4444" opacity="0.9" />
                    <text x="147" y="139" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">!</text>

                    {/* Orange - high */}
                    <circle cx="290" cy="240" r="9" fill="#F59E0B" opacity="0.9" />
                    <text x="290" y="244" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">!</text>

                    {/* Green - resolved */}
                    <circle cx="380" cy="140" r="8" fill="#10B981" opacity="0.9" />
                    <text x="380" y="144" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">✓</text>

                    {/* Blue - submitted */}
                    <circle cx="60" cy="240" r="8" fill="#3B82F6" opacity="0.9" />
                    <text x="60" y="244" textAnchor="middle" fill="white" fontSize="9">●</text>

                    {/* Orange medium */}
                    <circle cx="340" cy="90" r="7" fill="#FF9933" opacity="0.9" />
                    <text x="340" y="94" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">!</text>
                  </g>

                  {/* Government building */}
                  <rect x="206" y="40" width="52" height="80" rx="2" fill="#1B3A6B" />
                  <rect x="214" y="30" width="36" height="12" rx="1" fill="#1B3A6B" />
                  {[214, 226, 238].map((x, i) => (
                    <rect key={i} x={x} y="60" width="8" height="40" rx="1" fill="white" opacity="0.3" />
                  ))}
                  <text x="232" y="100" textAnchor="middle" fill="white" fontSize="14">🏛</text>

                  {/* Legend */}
                  <g transform="translate(10, 285)">
                    {[
                      { color: "#EF4444", label: "Critical" },
                      { color: "#F59E0B", label: "High" },
                      { color: "#10B981", label: "Resolved" },
                      { color: "#3B82F6", label: "Submitted" },
                    ].map(({ color, label }, i) => (
                      <g key={label} transform={`translate(${i * 110}, 0)`}>
                        <circle cx="6" cy="6" r="5" fill={color} />
                        <text x="14" y="10" fill="#64748B" fontSize="9">{label}</text>
                      </g>
                    ))}
                  </g>
                </svg>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white rounded-lg border border-[#E2E8F0] p-3">
                    <div className="text-xl font-bold text-[#EF4444]">8</div>
                    <div className="text-xs text-[#64748B]">Critical Issues</div>
                  </div>
                  <div className="bg-white rounded-lg border border-[#E2E8F0] p-3">
                    <div className="text-xl font-bold text-[#F59E0B]">146</div>
                    <div className="text-xs text-[#64748B]">Active Today</div>
                  </div>
                  <div className="bg-white rounded-lg border border-[#E2E8F0] p-3">
                    <div className="text-xl font-bold text-[#138808]">97%</div>
                    <div className="text-xs text-[#64748B]">AI Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1B3A6B] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-white font-serif text-2xl font-bold mb-8 opacity-90">
            Platform at a Glance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map(({ value, label, sublabel }) => (
              <div key={label} className="text-center bg-white/10 rounded-lg p-4 border border-white/10">
                <div className="text-3xl font-bold text-[#FF9933] font-serif mb-1">{value}</div>
                <div className="text-sm font-semibold text-white mb-0.5">{label}</div>
                <div className="text-xs text-white/60">{sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-[#0F172A] mb-3">How CivicSetu Works</h2>
            <p className="text-[#64748B] max-w-xl mx-auto">
              A simple 4-step process from reporting to resolution — designed for every citizen.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map(({ step, title, desc, icon, color }, i) => (
              <div key={step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-[#E2E8F0] z-0" style={{ width: "calc(100% - 2rem)", left: "calc(50% + 2rem)" }} />
                )}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 text-center relative z-10 hover:shadow-md transition-shadow">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm"
                    style={{ backgroundColor: color + "15", border: `2px solid ${color}40` }}
                  >
                    {icon}
                  </div>
                  <div className="text-xs font-mono font-bold mb-1" style={{ color }}>
                    STEP {step}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2" style={{ color }}>
                    {title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="bg-[#F4F6FA] py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[#0F172A]">Trending Civic Issues</h2>
              <p className="text-sm text-[#64748B] mt-1">Most reported issues across Jharkhand today</p>
            </div>
            <button onClick={() => onNavigate("community")} className="text-sm text-[#1B3A6B] font-medium hover:underline hidden sm:block">
              View All →
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="text-xs font-mono text-[#94A3B8] mb-1">{issue.id}</div>
                    <h3 className="font-semibold text-[#0F172A] text-sm leading-snug">{issue.title}</h3>
                  </div>
                  <span className={`flex-shrink-0 text-xs font-semibold px-2 py-1 rounded ${statusColors[issue.status] || "text-gray-600 bg-gray-50"}`}>
                    {issue.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#64748B]">
                  <span>📍 {issue.ward}</span>
                  <span>👥 {issue.citizens} citizens</span>
                  <span className="bg-[#F1F5F9] px-2 py-0.5 rounded">{issue.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#FF9933] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-serif text-white mb-3">
            See a civic problem? Report it now.
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            Your report reaches the right government department within minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate("report")}
              className="bg-white text-[#FF9933] font-bold px-8 py-3 rounded hover:bg-gray-50 transition-colors text-base"
            >
              Report a Civic Issue
            </button>
            <button
              onClick={() => onNavigate("login")}
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded hover:bg-white/10 transition-colors text-base"
            >
              Create Citizen Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
