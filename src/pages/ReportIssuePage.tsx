import { useState } from "react";
import { categoryIcons, type IssueCategory } from "../data/mockData";

type Page = string;

interface ReportIssuePageProps {
  onNavigate: (page: Page) => void;
  onSuccess: (id: string) => void;
  lang: "en" | "hi" | "mr";
}

const categories: IssueCategory[] = [
  "Road Damage", "Garbage", "Streetlight", "Water Leakage",
  "Drainage", "Public Toilet", "Traffic", "Electricity",
  "Illegal Dumping", "Other",
];

const aiAnalysisSteps = [
  "Analyzing complaint text...",
  "Checking nearby reports...",
  "Finding similar complaints...",
  "Classification complete.",
];

const similarComplaints = [
  { id: "CIV-2026-00421", desc: "Large pothole outside the school.", similarity: 92, citizens: 23 },
  { id: "CIV-2026-00388", desc: "Road damaged near school entrance.", similarity: 88, citizens: 15 },
  { id: "CIV-2026-00347", desc: "Pothole near the school gate, risky.", similarity: 81, citizens: 9 },
];

export default function ReportIssuePage({ onNavigate, onSuccess, lang }: ReportIssuePageProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<IssueCategory | "">("");
  const [description, setDescription] = useState("");
  const [listening, setListening] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [location, setLocation] = useState({ lat: "23.3441°N", lng: "85.3096°E", address: "Near Govt. School, Main Road, Ward 12, Ranchi" });
  const [locDetecting, setLocDetecting] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [aiDone, setAiDone] = useState(false);
  const [duplicateDecision, setDuplicateDecision] = useState<"" | "view" | "anyway" | "notSame">("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complaintId] = useState("CIV-2026-" + Math.floor(10000 + Math.random() * 90000));
  const isHi = lang === "hi";

  const totalSteps = 5;

  const runAI = () => {
    setShowAI(true);
    setAiStep(0);
    setAiDone(false);
    const interval = setInterval(() => {
      setAiStep((s) => {
        if (s >= aiAnalysisSteps.length - 1) {
          clearInterval(interval);
          setAiDone(true);
          return s;
        }
        return s + 1;
      });
    }, 600);
  };

  const handleDetectLocation = () => {
    setLocDetecting(true);
    setTimeout(() => setLocDetecting(false), 1500);
  };

  const handleNext = () => {
    if (step === 2 && !showAI) {
      runAI();
      return;
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); onSuccess(complaintId); }, 1800);
  };

  if (submitted) {
    return (
      <div className="page-enter min-h-screen bg-[#F4F6FA] flex items-center justify-center px-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 max-w-lg w-full text-center shadow-sm">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">✅</div>
          <h2 className="text-2xl font-bold font-serif text-[#0F172A] mb-2">Complaint Submitted Successfully</h2>
          <p className="text-[#64748B] mb-6">Your civic issue has been registered and assigned for review.</p>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 mb-6">
            <div className="text-xs text-[#94A3B8] mb-1 font-mono">Complaint ID</div>
            <div className="text-2xl font-bold font-mono text-[#1B3A6B]">{complaintId}</div>
            <div className="text-xs text-[#64748B] mt-1">Save this ID to track your complaint</div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { onNavigate("track"); }}
              className="flex-1 bg-[#1B3A6B] hover:bg-[#122952] text-white font-semibold py-3 rounded transition-colors"
            >
              Track Complaint
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setCategory(""); setDescription(""); setShowAI(false); setAiDone(false); setDuplicateDecision(""); }}
              className="flex-1 border border-[#CBD5E1] text-[#374151] font-medium py-3 rounded hover:bg-[#F8FAFC] transition-colors"
            >
              Report Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-serif text-[#0F172A]">{isHi ? "नागरिक समस्या दर्ज करें" : "Report a Civic Issue"}</h1>
        <p className="text-[#64748B] text-sm mt-1">Multi-step guided complaint form — takes about 3 minutes</p>
      </div>

      {/* Progress */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#1B3A6B]">Step {step} of {totalSteps}</span>
          <span className="text-xs text-[#64748B]">{Math.round((step / totalSteps) * 100)}% complete</span>
        </div>
        <div className="w-full bg-[#F1F5F9] rounded-full h-2">
          <div
            className="bg-[#1B3A6B] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {["Category", "Describe", "Evidence", "Location", "Review"].map((label, i) => (
            <span key={label} className={`text-xs ${i + 1 <= step ? "text-[#1B3A6B] font-medium" : "text-[#CBD5E1]"}`}>{label}</span>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 min-h-64">
        {/* Step 1: Category */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">What is the problem?</h2>
            <p className="text-sm text-[#64748B] mb-5">Select the type of civic issue you want to report.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    category === cat
                      ? "border-[#1B3A6B] bg-[#EFF6FF]"
                      : "border-[#E2E8F0] hover:border-[#1B3A6B]/40 hover:bg-[#F8FAFC]"
                  }`}
                >
                  <span className="text-2xl">{categoryIcons[cat]}</span>
                  <span className="text-xs font-medium text-[#374151] text-center leading-tight">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Description + AI */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">Tell us what happened</h2>
            <p className="text-sm text-[#64748B] mb-4">Describe the problem in your own words. Be as specific as possible.</p>

            {/* Language selector */}
            <div className="flex gap-2 mb-3">
              {["English", "हिन्दी", "मराठी"].map((l) => (
                <button key={l} className={`text-xs px-3 py-1 rounded border ${l === "English" ? "border-[#1B3A6B] text-[#1B3A6B] bg-[#EFF6FF]" : "border-[#CBD5E1] text-[#64748B] hover:border-[#1B3A6B]/40"}`}>
                  {l}
                </button>
              ))}
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-[#CBD5E1] rounded-lg px-4 py-3 text-sm min-h-28 focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/20 outline-none transition-colors resize-none"
              placeholder="Describe the problem in your own words..."
            />

            {/* Voice input */}
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => { setListening(true); setTimeout(() => { setListening(false); setDescription("There is a huge pothole near the school gate causing accidents for vehicles and pedestrians."); }, 2000); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                  listening
                    ? "bg-red-50 border-red-300 text-red-600 ai-pulse"
                    : "border-[#1B3A6B] text-[#1B3A6B] hover:bg-[#EFF6FF]"
                }`}
              >
                <span className="text-lg">{listening ? "🔴" : "🎤"}</span>
                <span className="text-sm font-medium">{listening ? "Listening..." : "Speak your Problem"}</span>
              </button>
              {listening && <span className="text-xs text-[#64748B] ai-pulse">Voice Input → Speech-to-Text → Complaint Description</span>}
            </div>

            {/* AI Analysis result */}
            {showAI && (
              <div className="mt-5 bg-[#F0F7FF] border border-[#BFDBFE] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🤖</span>
                  <span className="font-semibold text-[#1B3A6B] text-sm">AI Analysis</span>
                  {!aiDone && <span className="text-xs text-[#64748B] ai-pulse">Processing...</span>}
                  {aiDone && <span className="text-xs text-emerald-600 font-medium">✓ Classification complete</span>}
                </div>

                {!aiDone ? (
                  <div className="space-y-1.5">
                    {aiAnalysisSteps.slice(0, aiStep + 1).map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#475569]">
                        <span className="text-emerald-500">✓</span> {s}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-[#E2E8F0]">
                      <div className="text-xs text-[#64748B] mb-0.5">Category</div>
                      <div className="font-semibold text-[#0F172A] text-sm">Road Infrastructure</div>
                      <div className="text-xs text-emerald-600 mt-0.5">Confidence: 96%</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-[#E2E8F0]">
                      <div className="text-xs text-[#64748B] mb-0.5">Suggested Department</div>
                      <div className="font-semibold text-[#0F172A] text-sm">Public Works Department</div>
                      <div className="text-xs text-orange-600 mt-0.5">Priority: High</div>
                    </div>
                  </div>
                )}

                {/* Duplicate detection */}
                {aiDone && duplicateDecision === "" && (
                  <div className="mt-4 border-t border-[#BFDBFE] pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-amber-500">⚠</span>
                      <span className="text-sm font-semibold text-[#374151]">This complaint may already have been reported.</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {similarComplaints.map((sc) => (
                        <div key={sc.id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-[#E2E8F0]">
                          <div>
                            <span className="text-xs font-mono text-[#94A3B8] mr-2">{sc.id}</span>
                            <span className="text-xs text-[#374151]">{sc.desc}</span>
                            <div className="text-xs text-[#64748B] mt-0.5">👥 {sc.citizens} citizens reported</div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-3">
                            <div className="text-sm font-bold text-orange-600">{sc.similarity}%</div>
                            <div className="text-xs text-[#94A3B8]">Similar</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setDuplicateDecision("view")} className="text-xs bg-[#1B3A6B] text-white px-3 py-2 rounded hover:bg-[#122952] transition-colors">View Existing Issue</button>
                      <button onClick={() => setDuplicateDecision("anyway")} className="text-xs bg-white border border-[#1B3A6B] text-[#1B3A6B] px-3 py-2 rounded hover:bg-[#F8FAFC] transition-colors">Report Anyway</button>
                      <button onClick={() => setDuplicateDecision("notSame")} className="text-xs bg-white border border-[#CBD5E1] text-[#64748B] px-3 py-2 rounded hover:bg-[#F8FAFC] transition-colors">Not the Same Issue</button>
                    </div>
                  </div>
                )}

                {duplicateDecision === "view" && (
                  <div className="mt-4 border-t border-[#BFDBFE] pt-4 bg-blue-50 rounded-lg p-3">
                    <div className="text-sm font-semibold text-[#1B3A6B] mb-1">Master Issue: CIV-2026-00421</div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#374151]">
                      <div>👥 Reports: <strong>23 Citizens</strong></div>
                      <div>⚠ Priority: <strong>High</strong></div>
                      <div>🏘 Community Impact: <strong>High</strong></div>
                      <div>📍 Status: <strong>In Progress</strong></div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button onClick={() => setStep(step + 1)} className="text-xs bg-[#1B3A6B] text-white px-3 py-1.5 rounded hover:bg-[#122952] transition-colors">Confirm &amp; Add Support</button>
                    </div>
                  </div>
                )}

                {(duplicateDecision === "anyway" || duplicateDecision === "notSame") && (
                  <div className="mt-3 text-xs text-emerald-600 font-medium">✓ Proceeding with new complaint submission.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Evidence */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">Upload Evidence</h2>
            <p className="text-sm text-[#64748B] mb-5">Photos or videos help authorities verify and prioritize your complaint faster.</p>
            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              {["Take Photo", "Upload Photo", "Upload Video"].map((action) => (
                <button
                  key={action}
                  onClick={() => setUploadedFiles((f) => [...f, action === "Take Photo" ? "photo_camera.jpg" : action === "Upload Photo" ? "evidence_photo.jpg" : "evidence_video.mp4"])}
                  className="flex flex-col items-center gap-2 p-5 rounded-xl border-2 border-dashed border-[#CBD5E1] hover:border-[#1B3A6B] hover:bg-[#F8FAFC] transition-colors"
                >
                  <span className="text-3xl">{action === "Take Photo" ? "📸" : action === "Upload Photo" ? "🖼️" : "🎬"}</span>
                  <span className="text-sm font-medium text-[#374151]">{action}</span>
                </button>
              ))}
            </div>
            {uploadedFiles.length > 0 && (
              <div>
                <div className="text-sm font-medium text-[#374151] mb-2">Uploaded Files</div>
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded px-3 py-2 text-xs text-emerald-700">
                      <span>{f.endsWith(".mp4") ? "🎬" : "🖼️"}</span>
                      <span>{f}</span>
                      <button onClick={() => setUploadedFiles((files) => files.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 ml-1">×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="text-xs text-[#94A3B8] mt-4">
              Evidence is optional but strongly recommended. Only upload photos/videos of the civic issue.
            </p>
          </div>
        )}

        {/* Step 4: Location */}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">Where is the problem?</h2>
            <p className="text-sm text-[#64748B] mb-4">Share the exact location so authorities can dispatch the right team.</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={handleDetectLocation}
                className={`flex items-center gap-2 px-4 py-2 rounded border transition-colors text-sm ${locDetecting ? "border-[#1B3A6B] bg-[#EFF6FF] text-[#1B3A6B] ai-pulse" : "border-[#1B3A6B] text-[#1B3A6B] hover:bg-[#EFF6FF]"}`}
              >
                📍 {locDetecting ? "Detecting..." : "Detect My Location"}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded border border-[#CBD5E1] text-[#374151] hover:bg-[#F8FAFC] text-sm transition-colors">
                🔍 Search Location
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded border border-[#CBD5E1] text-[#374151] hover:bg-[#F8FAFC] text-sm transition-colors">
                📌 Drop Pin on Map
              </button>
            </div>

            {/* Map placeholder */}
            <div className="bg-[#E8F0E9] rounded-xl border border-[#CBD5E1] h-48 flex items-center justify-center mb-4 relative overflow-hidden">
              <svg viewBox="0 0 480 200" className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
                <rect x="0" y="80" width="480" height="8" fill="#94A3B8" />
                <rect x="120" y="0" width="8" height="200" fill="#94A3B8" />
                <rect x="300" y="0" width="8" height="200" fill="#94A3B8" />
              </svg>
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-1">📍</div>
                <div className="text-sm font-medium text-[#374151]">Interactive Map</div>
                <div className="text-xs text-[#64748B]">Location detected</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-3">
                <div className="text-xs text-[#94A3B8] mb-0.5 font-mono">Latitude</div>
                <div className="text-sm font-semibold text-[#0F172A] font-mono">{location.lat}</div>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-3">
                <div className="text-xs text-[#94A3B8] mb-0.5 font-mono">Longitude</div>
                <div className="text-sm font-semibold text-[#0F172A] font-mono">{location.lng}</div>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-3 sm:col-span-1">
                <div className="text-xs text-[#94A3B8] mb-0.5">Address</div>
                <div className="text-xs font-semibold text-[#0F172A] leading-snug">{location.address}</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div>
            <h2 className="text-lg font-bold text-[#0F172A] mb-1">Review Your Complaint</h2>
            <p className="text-sm text-[#64748B] mb-5">Please verify all details before submitting.</p>
            <div className="space-y-3">
              {[
                { label: "Issue Type", value: category || "Road Damage", icon: "🛣️" },
                { label: "Description", value: description || "Large pothole near the school gate causing accidents.", icon: "📝" },
                { label: "Location", value: location.address, icon: "📍" },
                { label: "Evidence", value: uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s) uploaded` : "No evidence uploaded", icon: "📷" },
                { label: "Date Reported", value: "August 19, 2026", icon: "📅" },
                { label: "Reporter", value: "Citizen #1042 (Ward 12, Ranchi)", icon: "👤" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex gap-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-3">
                  <span className="text-lg flex-shrink-0">{icon}</span>
                  <div>
                    <div className="text-xs text-[#94A3B8] font-medium mb-0.5">{label}</div>
                    <div className="text-sm text-[#0F172A]">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-[#1B3A6B]">
              By submitting this complaint, you confirm that the information provided is accurate and relates to a genuine civic issue.
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-5">
        <button
          onClick={() => step > 1 && setStep(step - 1)}
          disabled={step === 1}
          className="px-5 py-2.5 border border-[#CBD5E1] text-[#374151] rounded font-medium text-sm hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>

        {step < totalSteps ? (
          <button
            onClick={handleNext}
            disabled={step === 1 && !category}
            className="px-6 py-2.5 bg-[#1B3A6B] hover:bg-[#122952] text-white rounded font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {step === 2 && !showAI ? "Analyze with AI →" : "Continue →"}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2.5 bg-[#138808] hover:bg-[#106b06] text-white rounded font-semibold text-sm transition-colors flex items-center gap-2"
          >
            {submitting ? <><span className="ai-pulse">⏳</span> Submitting...</> : "✓ Submit Complaint"}
          </button>
        )}
      </div>
    </div>
  );
}
